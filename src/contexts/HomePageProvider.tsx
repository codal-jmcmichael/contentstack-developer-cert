"use client";

import { getSongsByGenre } from "@/lib/api";
import { Song } from "@/types/contentStack/generated";
import React, { createContext, useContext, useState, ReactNode, SetStateAction } from "react";

interface HomePageContextProps {
  songs: Song[] | null;
  selectedGenre: string | null;
  setSelectedGenre: (genre: string | null) => void;
}

const HomePageContext = createContext<HomePageContextProps | undefined>(
  undefined
);

export const HomePageProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState<Song[] | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<
    HomePageContextProps["selectedGenre"] | null
  >(null);

  const handleSetSelectedGenre = async (genre: string | null) => {
    const g = genre || "genre";

    setSelectedGenre(g);
    setSongs(await getSongsByGenre(g) || []);
  };

  return (
    <HomePageContext.Provider
      value={{ selectedGenre, setSelectedGenre: handleSetSelectedGenre, songs }}
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
