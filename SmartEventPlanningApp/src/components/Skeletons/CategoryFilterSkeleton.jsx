import React from "react";
import Skeleton from "@mui/material/Skeleton";

function CategoryFilterSkeleton() {
  return (
    <div>
      <Skeleton
        variant="rounded"
        width={230}
        height={55}
        sx={{ marginTop: "5px" }}
      />
    </div>
  );
}

export default CategoryFilterSkeleton;
