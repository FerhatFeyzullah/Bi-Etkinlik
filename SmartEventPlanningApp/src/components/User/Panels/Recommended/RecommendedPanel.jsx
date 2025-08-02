import React, { useEffect } from "react";
import "../../../../css/User/Panels/Recommended/RecommendedPanel.css";
import RecommendedEventCard from "./RecommendedEventCard";
import { useDispatch, useSelector } from "react-redux";
import { GetEventsRecommendedToMe } from "../../../../redux/slices/recommendedSlice";
import ReviewEventCardSkeleton from "../../../Skeletons/ReviewEventCardSkeleton";
import noResult from "../../../../assets/eventImage/noResult.png";

function RecommendedPanel() {
  const dispatch = useDispatch();
  const { recommendedSkeletonLoading, recommendedEvents } = useSelector(
    (store) => store.recommended
  );
  const UserId = localStorage.getItem("UserId");

  useEffect(() => {
    dispatch(GetEventsRecommendedToMe(UserId));
  }, [UserId]);

  return recommendedSkeletonLoading ? (
    <div className="recommended-container flex-column-justify-start">
      <ReviewEventCardSkeleton />
    </div>
  ) : recommendedEvents.length > 0 ? (
    <div className="recommended-container flex-column-justify-start">
      <RecommendedEventCard />
    </div>
  ) : (
    <div className="recommended-container-empty-text flex-column">
      <img src={noResult} alt="Sonuç Yok" width={300} height={300} />
      <div>
        Şu an için tam sana göre bir etkinlik yok gibi... Ama merak etme,
        yakında burada seni bekleyen etkinlikler olacak!
      </div>
    </div>
  );
}

export default RecommendedPanel;
