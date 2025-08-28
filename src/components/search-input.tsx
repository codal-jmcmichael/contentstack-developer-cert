"use client";

import { useHomePageContext } from "@/contexts/HomePageProvider"
import { Input } from "./ui/input";

export const SearchInput = () => {
  const { setSearchInput } = useHomePageContext();

  return (
    <Input
      type="search"
      placeholder="Search by song or lyrics"
      onChange={(event) => setSearchInput(event?.target?.value)}
    />
  );
}

export default SearchInput;
