import React from "react";
import Skeleton from "@mui/material/Skeleton";

function CategoryFilterSkeleton() {
  return (
    <div>
      <Skeleton
        variant="rounded"
        width={250}
        height={55}
        sx={{ marginTop: "20px" }}
      />
    </div>
  );
}

export default CategoryFilterSkeleton;
