import React, { useEffect, useState } from 'react'
import '../../css/Admin/EventStatusPanel.css'
import { Tabs, Tab, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { GetEventsStatusFalse, GetEventsStatusNull, GetEventsStatusTrue, SetIsEventEvaluated, SetReviewEventMistake, SetReviewEventSuccess } from '../../redux/slices/eventSlice';
import ReviewEventCard from './ReviewEventCard';
import EventReviewDialog from '../User/Panels/EventReviewDialog'
import ToastMistake from '../Elements/ToastMistake'
import ToastSuccess from '../Elements/ToastSuccess'
import EvaluateEventDialog from '../Admin/Dialogs/EvaluateEventDialog'
import ApproveEventDialog from './Dialogs/ApproveEventDialog'
import RejectEventDialog from '../Admin/Dialogs/RejectEventDialog'
import AdminEventCardSkeleton from '../Skeletons/AdminEventCardSkeleton';


function EventStatusPanel() {
    const { t: tButton } = useTranslation("button");
    const { t: tAlert } = useTranslation("alert");
    const dispatch = useDispatch();

    const { reviewEvents, reviewEventResponse, reviewEventMistake, reviewEventSuccess, isEventEvaluated, reviewEventSkeleton } = useSelector(store => store.event);
    const { events } = reviewEvents;

    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    useEffect(() => {
        if (isEventEvaluated === true || selectedTab !== null) {
            if (selectedTab === 0) {
                dispatch(GetEventsStatusNull());
            } else if (selectedTab === 1) {
                dispatch(GetEventsStatusTrue());
            } else if (selectedTab === 2) {
                dispatch(GetEventsStatusFalse());
            }
        }
        dispatch(SetIsEventEvaluated(false));
    }, [selectedTab, isEventEvaluated]);

    const CloseReviewEventMistake = () => {
        dispatch(SetReviewEventMistake(false));
    };
    const CloseReviewEventSuccess = () => {
        dispatch(SetReviewEventSuccess(false));
    };

    return (
        <div className="event-status-container">

            <Box sx={{ width: "50%", margin: "0 auto" }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    textColor="inherit"
                    indicatorColor="primary"
                    orientation="horizontal"
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: "#365abbff",
                            height: "4px",
                            borderRadius: "2px",
                        },
                    }}
                    sx={{
                        display: "flex",
                    }}
                >
                    <Tab
                        label={tButton("pendingEvents")}
                        sx={{
                            flex: 1,
                            minWidth: 0,
                            textTransform: "none",
                            fontWeight: "bold",
                            fontSize: "16px",
                        }}
                    />
                    <Tab
                        label={tButton("approvedEvents")}
                        sx={{
                            flex: 1,
                            minWidth: 0,
                            textTransform: "none",
                            fontWeight: "bold",
                            fontSize: "16px",
                        }}
                    />
                    <Tab
                        label={tButton("rejectedEvents")}
                        sx={{
                            flex: 1,
                            minWidth: 0,
                            textTransform: "none",
                            fontWeight: "bold",
                            fontSize: "16px",
                        }}
                    />
                </Tabs>
            </Box>

            <div className="event-status-card-phase flex-row-align-justify-start">
                {reviewEventSkeleton || events?.length == 0 ?
                    <AdminEventCardSkeleton />
                    :
                    events && events.map((e) => (
                        <ReviewEventCard event={e} key={e.eventId} />
                    ))
                }
            </div>
            <EventReviewDialog />

            <EvaluateEventDialog />
            <ApproveEventDialog />
            <RejectEventDialog />


            <ToastMistake
                visible={reviewEventMistake}
                detail={tAlert(reviewEventResponse)}
                closer={CloseReviewEventMistake}
            />
            <ToastSuccess
                visible={reviewEventSuccess}
                detail={tAlert(reviewEventResponse)}
                closer={CloseReviewEventSuccess}
            />
        </div>
    )
}

export default EventStatusPanel