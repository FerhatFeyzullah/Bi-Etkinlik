import React from "react";
import Skeleton from "@mui/material/Skeleton";
import "../../css/Skeletons/EditableEventCardSkeleton.css";

function EditableEventCardSkeleton() {
  var skeletonArray = [1, 2, 3, 4];

  return (
    <>
      {skeletonArray.map((s) => (
        <div className="editable-e-c-skeleton" key={s}>
          <div className="flex-column">
            <div>
              <Skeleton variant="rounded" width={350} height={200} />
            </div>
            <div className="flex-row" style={{ marginTop: "10px" }}>
              <div className="flex-row">
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  sx={{ marginRight: "20px" }}
                />
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  sx={{ marginRight: "20px" }}
                />
                <Skeleton variant="circular" width={40} height={40} />
              </div>
              <div style={{ marginLeft: "50px" }}>
                <Skeleton variant="rounded" width={120} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default EditableEventCardSkeleton;
