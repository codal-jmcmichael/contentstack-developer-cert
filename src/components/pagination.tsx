"use client";

import { Button } from "@/components/ui/button";
import { useHomePageContext } from "@/contexts/HomePageProvider";

export const Pagination = ({ limit = 3 }) => {
  const { pagination, setPagination } = useHomePageContext();

  const handlePagination = (newPage: number) => {
    if (newPage < 1 || newPage > limit) return;
    setPagination(newPage);
  };

  return (
    <div className="flex justify-center gap-4">
      <Button
        className="px-4 py-2 rounded"
        variant="secondary"
        onClick={() => handlePagination(pagination - 1)}
      >
        Previous
      </Button>

      {/* Create an array from the pagination limit */}
      {Array.from({ length: limit }, (_, i) => (
        <Button
          key={i}
          className="px-4 py-2 rounded"
          variant={i + 1 === pagination ? "default" : "secondary"}
          onClick={() => handlePagination(i + 1)}
        >
          {i + 1}
        </Button>
      ))}

      <Button
        className="px-4 py-2 rounded"
        variant="secondary"
        onClick={() => handlePagination(pagination + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
