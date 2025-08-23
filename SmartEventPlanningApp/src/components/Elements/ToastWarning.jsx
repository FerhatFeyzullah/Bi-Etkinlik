import React, { useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";
import { SetLoginMistakeAlert } from "../../redux/slices/authSlice";
import { useTranslation } from "react-i18next";


function ToastMistake({ detail, visible, closer }) {
  const { t: tText } = useTranslation("text")

  const dispatch = useDispatch();
  const toast = useRef(null);

  useEffect(() => {
    if (visible) {
      toast.current.show({
        severity: "warn",
        summary: tText("toastWarning"),
        detail,
        life: 3000,
      });
    }
  }, [visible, detail]);

  return (
    <div>
      <Toast ref={toast} position="top-center" onHide={closer} />
    </div>
  );
}

export default ToastMistake;
