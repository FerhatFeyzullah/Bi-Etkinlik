import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SetApprovedEventDialog, SetEvaluatedEventId, SetEvaluateEventDialog, SetEventStatusTrue } from '../../../redux/slices/eventSlice';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
function ApproveEventDialog() {
    const { t: tButton } = useTranslation("button");
    const { t: tText } = useTranslation("text");
    const dispatch = useDispatch();

    const { approvedEventDialog, evaluatedEventId } = useSelector(
        (store) => store.event
    );

    const ApprovedEvent = () => {
        dispatch(SetEventStatusTrue(evaluatedEventId))
        dispatch(SetApprovedEventDialog(false))
        dispatch(SetEvaluatedEventId(null))
    };

    const CloseDialog = () => {
        dispatch(SetApprovedEventDialog(false))
        dispatch(SetEvaluatedEventId(null))
    };
    return (
        <div>
            <Dialog
                open={approvedEventDialog}
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
                    {tText("approveEvent")}
                </DialogTitle>
                <DialogContent sx={{ width: "500px" }} className="flex-row">
                    <>
                        <div>{tText("approveEventInfo")}</div>
                    </>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ textTransform: "none" }} onClick={CloseDialog}>
                        {tButton("cancel")}
                    </Button>
                    <Button sx={{ textTransform: "none" }} onClick={ApprovedEvent}>
                        {tButton("approve")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ApproveEventDialog