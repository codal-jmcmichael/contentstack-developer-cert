"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface HomePageContextProps {
  filteredSongs?: any[];
  selectedGenre: string | null;
  setSelectedGenre: (genre: string | null) => void;
}

const HomePageContext = createContext<HomePageContextProps | undefined>(
  undefined
);

export const HomePageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedGenre, setSelectedGenre] = useState<
    HomePageContextProps["selectedGenre"] | null
  >("all");

  const handleSetSelectedGenre = (genre: string | null) => {
    setSelectedGenre(genre ? genre.toLowerCase() : null);
  };

  return (
    <HomePageContext.Provider
      value={{ selectedGenre, setSelectedGenre: handleSetSelectedGenre }}
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
