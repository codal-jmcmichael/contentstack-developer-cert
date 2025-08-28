"use client";

import { getSongsByTermsAndGenre } from "@/lib/api";
import { Song } from "@/types/contentStack/generated";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface HomePageContextProps {
  songs: Song[];
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  searchInput: string;
  setSearchInput: (input: string) => void;
}

const HomePageContext = createContext<HomePageContextProps | undefined>(
  undefined
);

export const HomePageProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const fetchSongs = async () => {
      if (searchInput) {
        const fetchedSongs = await getSongsByTermsAndGenre(
          searchInput,
          selectedGenre
        );
        setSongs(fetchedSongs);
      } else {
        setSongs([]);
      }
    };

    fetchSongs();
  }, [searchInput, selectedGenre]);

  return (
    <HomePageContext.Provider
      value={{
        selectedGenre,
        setSelectedGenre,
        songs,
        searchInput,
        setSearchInput,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};

export const useHomePageContext = (): HomePageContextProps => {
  const context = useContext(HomePageContext);

  if (!context) {
    throw new Error(
      "useHomePageContext must be used within a HomePageProvider"
    );
  }
  return context;
};
