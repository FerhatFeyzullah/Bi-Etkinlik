import React, { useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";
import { SetLoginMistakeAlert } from "../../redux/slices/authSlice";

function ToastMistake({ detail, visible, closer }) {
  const dispatch = useDispatch();
  const toast = useRef(null);

  useEffect(() => {
    if (visible) {
      toast.current.show({
        severity: "warn",
        summary: "Uyarı",
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
