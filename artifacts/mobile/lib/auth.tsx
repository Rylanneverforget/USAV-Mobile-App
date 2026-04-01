import React, { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";

WebBrowser.maybeCompleteAuthSession();

const AUTH_TOKEN_KEY = "auth_session_token";
const ISSUER_URL = process.env.EXPO_PUBLIC_ISSUER_URL ?? "https://replit.com/oidc";

interface User {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
}

type LoginStatus = "idle" | "opening" | "exchanging" | "error";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isSigningIn: boolean;
  loginStatus: LoginStatus;
  loginError: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  clearLoginError: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  isSigningIn: false,
  loginStatus: "idle",
  loginError: null,
  login: async () => {},
  logout: async () => {},
  clearLoginError: () => {},
});

function getApiBaseUrl(): string {
  if (process.env.EXPO_PUBLIC_DOMAIN) {
    return `https://${process.env.EXPO_PUBLIC_DOMAIN}`;
  }
  return "";
}

function getClientId(): string {
  return process.env.EXPO_PUBLIC_REPL_ID || "";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginStatus, setLoginStatus] = useState<LoginStatus>("idle");
  const [loginError, setLoginError] = useState<string | null>(null);

  // Track how many sign-in attempts we've made so we can detect
  // a fresh attempt vs a stale response from a previous session
  const loginAttemptRef = useRef(0);

  const discovery = AuthSession.useAutoDiscovery(ISSUER_URL);
  const redirectUri = AuthSession.makeRedirectUri();

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: getClientId(),
      scopes: ["openid", "email", "profile", "offline_access"],
      redirectUri,
      prompt: AuthSession.Prompt.Login,
    },
    discovery,
  );

  const fetchUser = useCallback(async () => {
    try {
      const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const apiBase = getApiBaseUrl();
      const res = await fetch(`${apiBase}/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.user) {
        setUser(data.user);
      } else {
        await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Handle OAuth response — only process if we actually kicked off a login
  useEffect(() => {
    if (!response || loginAttemptRef.current === 0) return;
    if (response.type === "dismiss" || response.type === "cancel") {
      setLoginStatus("idle");
      return;
    }
    if (response.type === "error") {
      setLoginStatus("error");
      setLoginError("Authentication was cancelled or failed. Please try again.");
      return;
    }
    if (response.type !== "success" || !request?.codeVerifier) {
      setLoginStatus("idle");
      return;
    }

    const { code, state } = response.params;

    (async () => {
      try {
        setLoginStatus("exchanging");
        const apiBase = getApiBaseUrl();
        if (!apiBase) {
          setLoginStatus("error");
          setLoginError("App is not configured correctly. Please contact support.");
          return;
        }

        const body: Record<string, string> = {
          code,
          code_verifier: request.codeVerifier!,
          redirect_uri: redirectUri,
          state,
        };

        const exchangeRes = await fetch(`${apiBase}/api/mobile-auth/token-exchange`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!exchangeRes.ok) {
          const errData = await exchangeRes.json().catch(() => ({}));
          setLoginStatus("error");
          setLoginError(errData?.error ?? "Sign-in failed. Please try again.");
          return;
        }

        const data = await exchangeRes.json();
        if (data.token) {
          await SecureStore.setItemAsync(AUTH_TOKEN_KEY, data.token);
          setLoginStatus("idle");
          setLoginError(null);
          loginAttemptRef.current = 0;
          setIsLoading(true);
          await fetchUser();
        } else {
          setLoginStatus("error");
          setLoginError("Could not complete sign-in. Please try again.");
        }
      } catch {
        setLoginStatus("error");
        setLoginError("A network error occurred. Check your connection and try again.");
      }
    })();
  }, [response, request, redirectUri, fetchUser]);

  const login = useCallback(async () => {
    if (!request) return;
    try {
      setLoginError(null);
      setLoginStatus("opening");
      loginAttemptRef.current += 1;
      const result = await promptAsync();
      // If the user dismissed the popup without completing it
      if (result?.type === "dismiss" || result?.type === "cancel") {
        setLoginStatus("idle");
      }
      // Otherwise the useEffect above handles the response
    } catch (err) {
      console.error("Login error:", err);
      setLoginStatus("error");
      setLoginError("Something went wrong. Please try again.");
    }
  }, [promptAsync, request]);

  const logout = useCallback(async () => {
    try {
      const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
      if (token) {
        const apiBase = getApiBaseUrl();
        await fetch(`${apiBase}/api/mobile-auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {
      // ignore network errors on logout
    } finally {
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      loginAttemptRef.current = 0;
      setLoginStatus("idle");
      setLoginError(null);
      setUser(null);
    }
  }, []);

  const clearLoginError = useCallback(() => {
    setLoginStatus("idle");
    setLoginError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isSigningIn: loginStatus === "opening" || loginStatus === "exchanging",
        loginStatus,
        loginError,
        login,
        logout,
        clearLoginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
