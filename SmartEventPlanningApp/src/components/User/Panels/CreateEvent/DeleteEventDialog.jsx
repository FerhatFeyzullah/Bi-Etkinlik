import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RemoveEvent, SetDeletedEvent, SetEventDeleteDialog } from '../../../../redux/slices/eventSlice';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteEventDialog() {
    const { t: tButton } = useTranslation("button");
    const { t: tText } = useTranslation("text");

    const dispatch = useDispatch();
    const { isEventDeleteDialog, deletedEvent } = useSelector(
        (store) => store.event
    );

    const CloseDialog = () => {
        dispatch(SetDeletedEvent(null));
        dispatch(SetEventDeleteDialog(false));
    };

    const DeleteEvent = () => {
        dispatch(RemoveEvent(deletedEvent));
        dispatch(SetDeletedEvent(null));
        dispatch(SetEventDeleteDialog(false));
    };

    return (
        <div>
            <Dialog
                open={isEventDeleteDialog}
                slots={{
                    transition: Transition,
                }}
                PaperProps={{
                    sx: {
                        borderRadius: "20px", // istediğin değeri verebilirsin
                    },
                }}
                keepMounted
                onClose={CloseDialog}
            >
                <DialogTitle sx={{ textAlign: "center" }}>
                    {tText("deleteEvent")}
                </DialogTitle>
                <DialogContent sx={{ width: "500px" }} className="flex-row">
                    <>
                        <div>{tText("deleteEventInfo")}</div>
                    </>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ textTransform: "none" }} variant='outlined' color='error' onClick={CloseDialog}>
                        {tButton("no")}
                    </Button>
                    <Button sx={{ textTransform: "none", margin: "5px 10px" }} variant='outlined' color='success' onClick={DeleteEvent}>
                        {tButton("yes")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteEventDialog