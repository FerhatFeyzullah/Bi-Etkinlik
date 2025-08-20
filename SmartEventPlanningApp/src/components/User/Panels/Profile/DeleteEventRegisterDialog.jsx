import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";

import {
  DeleteEventRegister,
  SetDeletedEventRegister,
  SetIsEventRegisterDeleteDialog,
} from "../../../../redux/slices/eventRegisterSlice";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteEventRegisterDialog() {
  const { t: tButton } = useTranslation("button");
  const { t: tText } = useTranslation("text");
  const dispatch = useDispatch();
  const { isEventRegisterDeleteDialog, deletedRegisterEvent } = useSelector(
    (store) => store.eventRegister
  );

  const CloseDialog = () => {
    dispatch(SetIsEventRegisterDeleteDialog(false));
    dispatch(SetDeletedEventRegister({}));
  };

  const DeleteRegister = () => {
    dispatch(DeleteEventRegister(deletedRegisterEvent));
    dispatch(SetDeletedEventRegister({}));
    dispatch(SetIsEventRegisterDeleteDialog(false));
  };
  return (
    <div>
      <Dialog
        open={isEventRegisterDeleteDialog}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={CloseDialog}
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          {tText("deleteMyRegistration")}
        </DialogTitle>
        <DialogContent sx={{ width: "500px" }} className="flex-row">
          <>
            <div>{tText("deleteMyRegistrationInfo")}</div>
          </>
        </DialogContent>
        <DialogActions>
          <Button sx={{ textTransform: "none" }} onClick={CloseDialog}>
            {tButton("no")}
          </Button>
          <Button sx={{ textTransform: "none" }} onClick={DeleteRegister}>
            {tButton("yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteEventRegisterDialog;
