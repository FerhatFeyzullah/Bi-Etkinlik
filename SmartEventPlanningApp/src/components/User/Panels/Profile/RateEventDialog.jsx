import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import {
  MarkEventIsRated,
  RateEvent,
  SetIsEventRateDialog,
} from "../../../../redux/slices/eventRegisterSlice";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RateEventDialog() {
  const { t: tButton } = useTranslation("button");
  const { t: tText } = useTranslation("text");

  const dispatch = useDispatch();
  const { isEventScoreRatedDialog, ratedEvent } = useSelector(
    (store) => store.eventRegister
  );

  const [score, setScore] = useState(0.5);
  const [hoverScore, setHoverScore] = useState(-1);

  const CloseDialog = () => {
    dispatch(SetIsEventRateDialog(false));
  };

  const Rate = async () => {
    const data = {
      EventRegisterId: ratedEvent,
      Score: Number(score),
    };
    var result = await dispatch(RateEvent(data)).unwrap();
    if (result) dispatch(MarkEventIsRated(ratedEvent));
    dispatch(SetIsEventRateDialog(false));
  };

  return (
    <div>
      <Dialog
        open={isEventScoreRatedDialog}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={CloseDialog}
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          {tText("rateYourExperience")}
        </DialogTitle>
        <DialogContent sx={{ width: "500px" }} className="flex-row">
          <>
            <Rating
              sx={{ marginRight: "10px" }}
              size="large"
              precision={0.1}
              max={10}
              value={score}
              onChange={(event, newValue) => setScore(newValue)}
              onChangeActive={(event, newHover) => setHoverScore(newHover)}
            />
            <strong
              style={{
                display: "inline-block",
                width: "3ch",
                textAlign: "center",
                fontSize: "17px",
              }}
            >
              {hoverScore !== -1 ? hoverScore : score}
            </strong>{" "}
          </>
        </DialogContent>
        <DialogActions>
          <Button sx={{ textTransform: "none" }} onClick={CloseDialog}>
            {tButton("cancel")}
          </Button>
          <Button sx={{ textTransform: "none" }} onClick={Rate}>
            {tButton("rate")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RateEventDialog;
