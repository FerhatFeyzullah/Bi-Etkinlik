import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SetEvaluatedEventId, SetEvaluateEventDialog, SetEventStatusFalse, SetEventStatusTrue } from '../../../redux/slices/eventSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


function EvaluateEventDialog() {
    const { t: tButton } = useTranslation("button");
    const { t: tText } = useTranslation("text");
    const dispatch = useDispatch();

    const { evaluateEventDialog, evaluatedEventId } = useSelector(
        (store) => store.event
    );

    const ApprovedEvent = () => {
        dispatch(SetEventStatusTrue(evaluatedEventId))
        dispatch(SetEvaluateEventDialog(false))
        dispatch(SetEvaluatedEventId(null))
    };

    const RejecetedEvent = () => {
        dispatch(SetEventStatusFalse(evaluatedEventId))
        dispatch(SetEvaluateEventDialog(false))
        dispatch(SetEvaluatedEventId(null))

    };

    const CloseDialog = () => {
        dispatch(SetEvaluateEventDialog(false))
        dispatch(SetEvaluatedEventId(null))
    };
    return (
        <div>
            <Dialog
                open={evaluateEventDialog}
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
                    {tText("evaluateEvent")}
                </DialogTitle>
                <DialogContent sx={{ width: "500px" }} className="flex-row">
                    <>
                        <div>{tText("evaluateEventInfo")}</div>
                    </>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ textTransform: "none" }} onClick={RejecetedEvent}>
                        {tButton("reject")}
                    </Button>
                    <Button sx={{ textTransform: "none" }} onClick={ApprovedEvent}>
                        {tButton("approve")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EvaluateEventDialog