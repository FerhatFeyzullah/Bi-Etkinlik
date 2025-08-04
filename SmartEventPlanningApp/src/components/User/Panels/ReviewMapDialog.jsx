import React from "react";
import ReviewMapPanel from "./ReviewMapPanel";
import { Dialog, Button } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import {
  SetDiscoveryLatitude,
  SetDiscoveryLongitude,
  SetIsMapReviewed,
} from "../../../redux/slices/mapSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ReviewMapDialog() {
  const dispatch = useDispatch();
  const { isMapReviewed } = useSelector((store) => store.map);

  const CloseDialog = () => {
    dispatch(SetIsMapReviewed(false));
    dispatch(SetDiscoveryLatitude(""));
    dispatch(SetDiscoveryLongitude(""));
  };
  return (
    <div>
      <Dialog
        open={isMapReviewed}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={CloseDialog}
      >
        <DialogContent
          sx={{ width: "600px", height: "606px" }}
          className="flex-row"
        >
          <>
            <ReviewMapPanel />
          </>
        </DialogContent>
        <DialogActions>
          <Button sx={{ textTransform: "none" }} onClick={CloseDialog}>
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ReviewMapDialog;
