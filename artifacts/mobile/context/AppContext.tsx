import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ALL_TEAMS,
  MATCHES,
  NEWS,
  PLAYERS,
  type Match,
  type NewsItem,
  type Player,
  type Team,
  type Discipline,
} from "@/constants/data";

export type VolleyballRole = "fan" | "player" | "coach" | "referee" | "media";
export type ExperienceLevel = "recreational" | "club" | "collegiate" | "professional";
export type ContentInterest = "live_scores" | "match_results" | "player_stats" | "team_news" | "training_tips" | "olympics";

export type UserPreferences = {
  role: VolleyballRole | null;
  experienceLevel: ExperienceLevel | null;
  favoriteTeams: string[];
  contentInterests: ContentInterest[];
  disciplines: Discipline[];
};

type AppContextType = {
  teams: Team[];
  allTeams: Team[];
  matches: Match[];
  players: Player[];
  news: NewsItem[];
  favorites: string[];
  toggleFavorite: (teamId: string) => void;
  isFavorite: (teamId: string) => boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  preferences: UserPreferences;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  isOnboarded: boolean;
  completeOnboarding: (prefs: UserPreferences) => Promise<void>;
  resetOnboarding: () => Promise<void>;
};

const DEFAULT_PREFERENCES: UserPreferences = {
  role: null,
  experienceLevel: null,
  favoriteTeams: [],
  contentInterests: [],
  disciplines: ["mens"],
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(["m1"]);
  const [activeTab, setActiveTab] = useState("home");
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("favorites").then((data) => {
      if (data) setFavorites(JSON.parse(data));
    });
    AsyncStorage.getItem("onboarding_complete").then((data) => {
      if (data === "true") setIsOnboarded(true);
    });
    AsyncStorage.getItem("user_preferences").then((data) => {
      if (data) setPreferences(JSON.parse(data));
    });
  }, []);

  const toggleFavorite = useCallback(
    (teamId: string) => {
      setFavorites((prev) => {
        const next = prev.includes(teamId)
          ? prev.filter((id) => id !== teamId)
          : [...prev, teamId];
        AsyncStorage.setItem("favorites", JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const isFavorite = useCallback(
    (teamId: string) => favorites.includes(teamId),
    [favorites]
  );

  const updatePreferences = useCallback((prefs: Partial<UserPreferences>) => {
    setPreferences((prev) => {
      const next = { ...prev, ...prefs };
      AsyncStorage.setItem("user_preferences", JSON.stringify(next));
      return next;
    });
  }, []);

  const completeOnboarding = useCallback(async (prefs: UserPreferences) => {
    setPreferences(prefs);
    setIsOnboarded(true);
    if (prefs.favoriteTeams.length > 0) {
      setFavorites(prefs.favoriteTeams);
      await AsyncStorage.setItem("favorites", JSON.stringify(prefs.favoriteTeams));
    }
    await AsyncStorage.setItem("user_preferences", JSON.stringify(prefs));
    await AsyncStorage.setItem("onboarding_complete", "true");
  }, []);

  const resetOnboarding = useCallback(async () => {
    setIsOnboarded(false);
    setPreferences(DEFAULT_PREFERENCES);
    await AsyncStorage.removeItem("onboarding_complete");
    await AsyncStorage.removeItem("user_preferences");
  }, []);

  const filteredMatches = preferences.disciplines.length > 0
    ? MATCHES.filter((m) => preferences.disciplines.includes(m.discipline))
    : MATCHES;

  const filteredPlayers = preferences.disciplines.length > 0
    ? PLAYERS.filter((p) => preferences.disciplines.includes(p.discipline))
    : PLAYERS;

  const filteredNews = preferences.disciplines.length > 0
    ? NEWS.filter((n) => !n.discipline || preferences.disciplines.includes(n.discipline))
    : NEWS;

  return (
    <AppContext.Provider
      value={{
        teams: ALL_TEAMS.filter((t) =>
          preferences.disciplines.length > 0
            ? preferences.disciplines.includes(t.discipline)
            : true
        ),
        allTeams: ALL_TEAMS,
        matches: filteredMatches,
        players: filteredPlayers,
        news: filteredNews,
        favorites,
        toggleFavorite,
        isFavorite,
        activeTab,
        setActiveTab,
        preferences,
        updatePreferences,
        isOnboarded,
        completeOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
