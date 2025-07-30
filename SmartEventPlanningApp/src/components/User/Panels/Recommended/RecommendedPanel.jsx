import React, { useEffect } from "react";
import "../../../../css/User/Panels/Recommended/RecommendedPanel.css";
import RecommendedEventCard from "./RecommendedEventCard";
import { useDispatch, useSelector } from "react-redux";
import { GetEventsRecommendedToMe } from "../../../../redux/slices/recommendedSlice";
import ReviewEventCardSkeleton from "../../../Skeletons/ReviewEventCardSkeleton";

function RecommendedPanel() {
  const dispatch = useDispatch();
  const { recommendedSkeletonLoading } = useSelector(
    (store) => store.recommended
  );
  const UserId = localStorage.getItem("UserId");

  useEffect(() => {
    dispatch(GetEventsRecommendedToMe(UserId));
  }, [UserId]);

  return (
    <div className="recommended-container flex-column-justify-start">
      {recommendedSkeletonLoading ? (
        <ReviewEventCardSkeleton />
      ) : (
        <RecommendedEventCard />
      )}
    </div>
  );
}

export default RecommendedPanel;
