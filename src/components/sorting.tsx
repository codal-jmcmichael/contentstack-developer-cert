"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SORT_OPTIONS } from "@/lib/api";
import { useHomePageContext } from "@/contexts/HomePageProvider";

export const Sorting = () => {
  const { setSorting } = useHomePageContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Sort by</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.values(SORT_OPTIONS).map((option) => (
          <DropdownMenuItem key={option} onClick={() => setSorting(option)}>
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Sorting;
