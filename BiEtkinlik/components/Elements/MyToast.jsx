import React, { useEffect } from "react";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

const MyToast = ({ type, visible, detail, closer }) => {
    const { t: tText } = useTranslation("text")


    useEffect(() => {
        if (visible) {
            Toast.show({
                type: type,
                text1: tText("toastMistake"),
                text1Style: { fontSize: 18, fontWeight: 'bold' },
                text2: detail,
                text2Style: { fontSize: 13 },
                position: "top",
                visibilityTime: 3000,
                autoHide: true,
                onHide: closer
            });
        }
    }, [visible]);

    return null; // UI render etmiyor, sadece toast basıyor
};

export default MyToast;
