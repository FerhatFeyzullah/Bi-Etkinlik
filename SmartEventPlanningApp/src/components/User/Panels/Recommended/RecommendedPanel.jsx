import React, { useEffect } from "react";
import "../../../../css/User/Panels/Recommended/RecommendedPanel.css";
import RecommendedEventCard from "./RecommendedEventCard";
import { useDispatch, useSelector } from "react-redux";
import { GetEventsRecommendedToMe } from "../../../../redux/slices/recommendedSlice";
import ReviewEventCardSkeleton from "../../../Skeletons/ReviewEventCardSkeleton";
import noResult from "../../../../assets/eventImage/noResult.png";
import ReviewMapDialog from "../ReviewMapDialog";
import { useTranslation } from "react-i18next";
import RegisterEventDialog from "../../../Dialogs/RegisterEventDialog";


function RecommendedPanel() {
  const { t: tText } = useTranslation("text");

  const dispatch = useDispatch();
  const { recommendedSkeletonLoading, recommendedEvents } = useSelector(
    (store) => store.recommended
  );
  const UserId = localStorage.getItem("UserId");

  useEffect(() => {
    dispatch(GetEventsRecommendedToMe(UserId));
  }, [UserId]);

  return (
    <div>
      {
        recommendedSkeletonLoading ? (
          <div className="recommended-container flex-column-justify-start">
            <ReviewEventCardSkeleton />
          </div>
        ) : recommendedEvents?.events?.length > 0 ? (
          <div className="recommended-container flex-column-justify-start">
            {recommendedEvents.events.map((e) => (
              <RecommendedEventCard event={e} key={e.eventId} />
            ))}
          </div>
        ) : (
          <div className="recommended-container-empty-text flex-column">
            <img src={noResult} alt="Sonuç Yok" width={300} height={300} />
            <div>
              {tText("recommendedEmptyPanelInfo")}
            </div>
          </div>
        )
      }

      <ReviewMapDialog />
      <RegisterEventDialog />
    </div>
  )
}

export default RecommendedPanel;
