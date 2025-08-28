"use client";

import { getSongsByGenre, getSongsByNameOrLyrics } from "@/lib/api";
import { Song } from "@/types/contentStack/generated";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface HomePageContextProps {
  songs: Song[] | null;
  selectedGenre: string | null;
  setSelectedGenre: (genre: string | null) => void;
  searchInput: string | null;
  setSearchInput: (input: string) => void;
}

const HomePageContext = createContext<HomePageContextProps | undefined>(
  undefined
);

export const HomePageProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState<Song[] | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<
    HomePageContextProps["selectedGenre"] | null
  >(null);
  const [searchInput, setSearchInput] = useState<string | null>("");

  const handleSetSelectedGenre = async (genre: string | null) => {
    setSelectedGenre(genre);
    setSongs((await getSongsByGenre(genre) ?? null));
  };

  const handleSetSearchInput = async (input: string) => {
    setSongs((await getSongsByNameOrLyrics(input)) ?? null);
    setSearchInput(input);
  }

  return (
    <HomePageContext.Provider
      value={{ selectedGenre, setSelectedGenre: handleSetSelectedGenre, songs, searchInput, setSearchInput: handleSetSearchInput }}
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
