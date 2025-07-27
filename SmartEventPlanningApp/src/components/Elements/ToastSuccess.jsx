import React, { useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";
import {
  SetLoginMistakeAlert,
  SetRegisterSuccessAlert,
} from "../../redux/slices/authSlice";

function ToastMistake({ detail, visible, closer }) {
  const dispatch = useDispatch();
  const toast = useRef(null);

  useEffect(() => {
    if (visible) {
      toast.current.show({
        severity: "success",
        summary: "Başarılı",
        detail,
        life: 5000,
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
