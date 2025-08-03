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
  SetIsEventDialog,
} from "../../../../redux/slices/eventRegisterSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteEventDialog() {
  const dispatch = useDispatch();
  const { isEventDeleteDialog, deletedEvent } = useSelector(
    (store) => store.eventRegister
  );

  const CloseDialog = () => {
    dispatch(SetIsEventDialog(false));
  };

  const DeleteEvent = () => {
    dispatch(DeleteEventRegister(deletedEvent));
    dispatch(SetIsEventDialog(false));
  };
  return (
    <div>
      <Dialog
        open={isEventDeleteDialog}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={CloseDialog}
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          {"Etkinlik Kaydı Silme"}
        </DialogTitle>
        <DialogContent sx={{ width: "600px" }} className="flex-row">
          <></>
        </DialogContent>
        <DialogActions>
          <Button sx={{ textTransform: "none" }} onClick={CloseDialog}>
            Vazgeç
          </Button>
          <Button sx={{ textTransform: "none" }} onClick={DeleteEvent}>
            Kaydımı Sil
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteEventDialog;
