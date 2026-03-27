import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { MATCHES, NEWS, PLAYERS, TEAMS, type Match, type NewsItem, type Player, type Team } from "@/constants/data";

type AppContextType = {
  teams: Team[];
  matches: Match[];
  players: Player[];
  news: NewsItem[];
  favorites: string[];
  toggleFavorite: (teamId: string) => void;
  isFavorite: (teamId: string) => boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    AsyncStorage.getItem("favorites").then((data) => {
      if (data) setFavorites(JSON.parse(data));
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

  return (
    <AppContext.Provider
      value={{
        teams: TEAMS,
        matches: MATCHES,
        players: PLAYERS,
        news: NEWS,
        favorites,
        toggleFavorite,
        isFavorite,
        activeTab,
        setActiveTab,
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
