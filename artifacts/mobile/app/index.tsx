import { Redirect } from "expo-router";
import { useAuth } from "@/lib/auth";
import { useApp } from "@/context/AppContext";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();
  const { isOnboarded } = useApp();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  if (!isOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}
