import React, { useEffect, useState } from 'react'
import '../../css/Admin/ReviewEventCard.css'
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton } from "@mui/material";
import BiEtkinlik from "../../assets/eventImage/BiEtkinlik.png";
import { useTranslation } from "react-i18next";
import { SetApprovedEventDialog, SetDeletedEvent, SetEvaluatedEventId, SetEvaluateEventDialog, SetEventDeleteDialog, SetIsEventPreview, SetPreviewedEvent, SetRejectedEventDialog } from '../../redux/slices/eventSlice';



function ReviewEventCard({ event }) {
    const dispatch = useDispatch();
    const { t: tTooltip } = useTranslation("tooltip");
    const { t: tButton } = useTranslation("button");

    const [imgError, setImgError] = useState(false);

    const PreviewEvent = (a) => {
        dispatch(SetIsEventPreview(true));
        dispatch(SetPreviewedEvent(a));
    };

    const DeleteEvent = (id) => {
        dispatch(SetDeletedEvent(id));
        dispatch(SetEventDeleteDialog(true));
    }

    const EvaluateDialog = () => {
        dispatch(SetEvaluateEventDialog(true))
        dispatch(SetEvaluatedEventId(event.eventId))
    }
    const ApproveDialog = () => {
        dispatch(SetApprovedEventDialog(true))
        dispatch(SetEvaluatedEventId(event.eventId))

    }
    const RejectDialog = () => {
        dispatch(SetRejectedEventDialog(true))
        dispatch(SetEvaluatedEventId(event.eventId))

    }
    return (
        <div className="review-event-card">
            <div style={{ height: "100%" }}>
                <img
                    src={
                        !imgError && event.eventImageId
                            ? `https://localhost:7126/api/Users/ProfileImage/${event.eventImageId}`
                            : BiEtkinlik
                    }
                    style={{
                        width: "350px",
                        height: "80%",
                        objectFit: "cover",
                        borderRadius: "12px",
                    }}
                    onError={() => setImgError(true)}
                    alt="Resim"
                />
                <div className="review-event-card-name">{event.name}</div>
                <div className="flex-row-justify-start">
                    <Tooltip title={tTooltip("previewEvent")}>
                        <IconButton
                            sx={{ margin: "0 20px" }}
                            onClick={() => PreviewEvent(event)}
                        >
                            <VisibilityIcon fontSize="medium" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={tTooltip("deleteEvent")}>
                        <IconButton
                            sx={{ marginRight: "20px" }}
                            onClick={() => DeleteEvent(event.eventId)}
                        >
                            <DeleteIcon fontSize="medium" />
                        </IconButton>
                    </Tooltip>

                    {
                        event.status == null ? (
                            <Button variant='outlined' color='primary'
                                sx={{
                                    textTransform: "none", width: "120px",
                                    borderWidth: 2,
                                    borderColor: "rgba(14, 77, 150, 1)",
                                    "&:hover": {
                                        backgroundColor: "rgba(14, 77, 150, 1)",
                                        color: "white"
                                    }
                                }}
                                onClick={EvaluateDialog}
                            >
                                {tButton("evaluate")}
                            </Button>
                        ) : event.status == true ? (
                            <Button variant='outlined' color='error'
                                sx={{
                                    textTransform: "none", width: "120px",
                                    borderWidth: 2,
                                    borderColor: "rgba(150, 14, 14, 1)",
                                    "&:hover": {
                                        backgroundColor: "rgba(150, 14, 14, 1)",
                                        color: "white"
                                    },
                                }}
                                onClick={RejectDialog}
                            >
                                {tButton("reject")}

                            </Button>
                        ) : (
                            <Button variant='outlined' color='success'
                                sx={{
                                    textTransform: "none", width: "120px",
                                    borderWidth: 2,
                                    borderColor: "rgba(14, 150, 59, 1)",
                                    "&:hover": {
                                        backgroundColor: "rgba(14, 150, 59, 1)",
                                        color: "white"
                                    },
                                }}
                                onClick={ApproveDialog}
                            >
                                {tButton("approve")}

                            </Button>
                        )

                    }


                </div>
            </div>
        </div>
    )
}

export default ReviewEventCard