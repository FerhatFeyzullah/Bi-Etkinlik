import React, { useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";

function ToastMistake({ detail, visible, closer }) {
  const { t: tText } = useTranslation("text")
  const toast = useRef(null);

  useEffect(() => {
    if (visible) {
      toast.current.show({
        severity: "error",
        summary: tText("toastMistake"),
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
