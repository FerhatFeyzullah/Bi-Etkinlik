import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RegisterEvent, SetEventRegisterDialog } from '../../redux/slices/eventRegisterSlice';
import { MarkEventAsRegistered } from '../../redux/slices/discoverySlice';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

function RegisterEventDialog() {
    const { t: tButton } = useTranslation("button");
    const { t: tText } = useTranslation("text");
    const dispatch = useDispatch();
    const UserId = localStorage.getItem("UserId");

    const { eventRegisterDialog, registeredEvent } = useSelector(store => store.eventRegister);


    const RegisterThisAccount = async () => {
        const data = {
            AppUserId: Number(UserId),
            EventId: registeredEvent.eventId,
        };
        var result = await dispatch(RegisterEvent(data)).unwrap();
        if (result) {
            dispatch(MarkEventAsRegistered(registeredEvent.eventId));
        }
        dispatch(SetEventRegisterDialog(false))
    };

    const CloseDialog = () => {
        dispatch(SetEventRegisterDialog(false))
    };
    return (
        <>

            <div>
                <Dialog
                    open={eventRegisterDialog}
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
                        {tText("registerEventTitle")}
                    </DialogTitle>
                    <DialogContent sx={{ width: "500px" }} className="flex-row">
                        <>
                            <div>"{registeredEvent?.name}" {tText("registerEventInfo")}</div>
                        </>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ textTransform: "none" }} variant='outlined' color='success' onClick={RegisterThisAccount}>
                            {tButton("yes")}
                        </Button>
                        <Button sx={{ textTransform: "none", margin: "5px 10px" }} variant='outlined' color='error' onClick={CloseDialog}>
                            {tButton("no")}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default RegisterEventDialog