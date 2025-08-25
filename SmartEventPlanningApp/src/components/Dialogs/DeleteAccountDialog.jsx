import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RemoveAccount, SetRemoveAccountDialog } from '../../redux/slices/accountSlice';
import { SetUserSettingDrawer } from '../../redux/slices/userSettingSlice';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

function DeleteAccountDialog() {

    const { t: tButton } = useTranslation("button");
    const { t: tText } = useTranslation("text");
    const dispatch = useDispatch();

    const { theRemovedAccount, removeAccountDialog, } = useSelector(store => store.account)


    const RemoveThisAccount = () => {
        dispatch(RemoveAccount(theRemovedAccount));
        dispatch(SetRemoveAccountDialog(false))
        dispatch(SetUserSettingDrawer(false))
    };

    const CloseDialog = () => {
        dispatch(SetRemoveAccountDialog(false));
    };
    return (
        <>

            <div>
                <Dialog
                    open={removeAccountDialog}
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
                        {tText("deleteAccountTitle")}
                    </DialogTitle>
                    <DialogContent sx={{ width: "500px" }} className="flex-row">
                        <>
                            <div>{tText("deleteAccountInfo")}</div>
                        </>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{ textTransform: "none" }} variant='outlined' color='success' onClick={RemoveThisAccount}>
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

export default DeleteAccountDialog