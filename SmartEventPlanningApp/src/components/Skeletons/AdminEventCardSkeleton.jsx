import React from 'react'
import '../../css/Skeletons/AdminEventCardSkeleton.css'
import Skeleton from "@mui/material/Skeleton";


function AdminEventCardSkeleton() {
    var skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <>
            {skeletonArray.map((s) => (
                <div className="admin-e-c-skeleton" key={s}>
                    <div className="flex-column">
                        <div>
                            <Skeleton variant="rounded" width={350} height={200} />
                        </div>
                        <div className="admin-flex-row-justify-start" >
                            <div >
                                <Skeleton
                                    variant="circular"
                                    width={35}
                                    height={35}
                                    sx={{ marginLeft: "10px" }}
                                />
                            </div>
                            <div style={{ marginLeft: "30px" }}>
                                <Skeleton variant="rounded" width={120} height={35} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AdminEventCardSkeleton