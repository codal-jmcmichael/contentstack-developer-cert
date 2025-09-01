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
  searchInput: string;
  selectedGenre: string;
  pagination: number;
  setSearchInput: (input: string) => void;
  setSelectedGenre: (genre: string) => void;
  setPagination: (page: number) => void;
}

const HomePageContext = createContext<HomePageContextProps | undefined>(
  undefined
);

export const HomePageProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [pagination, setPagination] = useState<number>(1);

  useEffect(() => {
    const fetchSongs = async () => {
      const fetchedSongs = await getSongsByTermsAndGenre(
        searchInput,
        selectedGenre,
        pagination
      );
      setSongs(fetchedSongs);
    };

    fetchSongs();
  }, [searchInput, selectedGenre, pagination]);

  return (
    <HomePageContext.Provider
      value={{
        selectedGenre,
        songs,
        searchInput,
        pagination,
        setSelectedGenre,
        setSearchInput,
        setPagination,
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
