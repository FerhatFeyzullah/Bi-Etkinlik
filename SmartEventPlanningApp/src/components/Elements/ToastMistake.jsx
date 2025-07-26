import React, { useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";
import { SetLoginMistakeAlert } from "../../redux/slices/authSlice";

function ToastMistake({ detail, visible }) {
  const dispatch = useDispatch();
  const toast = useRef(null);

  useEffect(() => {
    if (visible) {
      toast.current.show({
        severity: "error",
        summary: "Hata",
        detail,
        life: 5000,
      });
    }
  }, [visible, detail]);

  return (
    <div>
      <Toast
        ref={toast}
        position="top-center"
        onHide={() => dispatch(SetLoginMistakeAlert())}
      />
    </div>
  );
}

export default ToastMistake;
