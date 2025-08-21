import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import "../../css/Skeletons/ReviewEventCardSkeleton.css";

function ReviewEventCardSkeleton() {
  var skeletonArray = [1, 2];
  return (
    <>
      {skeletonArray.map((s) => (
        <div className="review-e-c-skeleton" key={s}>
          <div className="flex-row-justify-start">
            <Skeleton variant="circular" width={60} height={60} />
            <Skeleton
              variant="text"
              width={120}
              height={30}
              sx={{ marginLeft: "10px" }}
            />
          </div>
          <div>
            <Skeleton
              variant="rounded"
              width={550}
              height={350}
              sx={{ marginTop: "10px" }}
            />
          </div>
          <div className="flex-row-justify-start" style={{ marginTop: "15px" }}>
            <Skeleton variant="rounded" width={80} height={40} />
            <Skeleton
              variant="rounded"
              width={120}
              height={40}
              sx={{ marginLeft: "10px" }}
            />
          </div>
          <div className="flex-row-justify-start" style={{ marginTop: "20px" }}>
            <Skeleton variant="text" width={120} height={30} />
            <Skeleton
              variant="text"
              width={60}
              height={30}
              sx={{ marginLeft: "10px" }}
            />
            <Skeleton
              variant="text"
              width={60}
              height={30}
              sx={{ marginLeft: "10px" }}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default ReviewEventCardSkeleton;
