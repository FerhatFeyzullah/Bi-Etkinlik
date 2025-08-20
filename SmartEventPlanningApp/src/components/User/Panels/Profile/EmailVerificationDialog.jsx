import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { InputOtp } from 'primereact/inputotp';
import { emailVerificationSchema } from "../../../../schemas/EmailVerificationCodeSchema";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ConfirmEmail, SendResetCodeAgain, SetConfirmEmailResponse, SetConfrimEmailDialog, SetConfrimEmailMistake, SetConfrimEmailSuccess, VerifyCode } from '../../../../redux/slices/userSettingSlice';
import CountdownTimer from "../../../../hooks/CountDownTimer";
import { GetMyProfile } from '../../../../redux/slices/accountSlice';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function EmailVerificationDialog() {
    const dispatch = useDispatch();
    const { t: tButton } = useTranslation("button");
    const { t: tText } = useTranslation("text");
    const { t: tValidation } = useTranslation("validation");

    const schema = emailVerificationSchema(tValidation)

    const UserId = localStorage.getItem("UserId");

    const { confirmEmailDialog } = useSelector(
        (store) => store.userSetting
    );
    const { myProfile } = useSelector(
        (store) => store.account
    );

    const [code, setCode] = useState();
    const email = myProfile?.myProfile?.email;
    const [errors, setErrors] = useState({});
    const [confirmError, setConfirmError] = useState("");
    const [isExpired, setIsExpired] = useState(false);
    const [resetKey, setResetKey] = useState(0);

    const Post = async () => {
        try {
            await schema.validate({ code }, { abortEarly: false });
            setErrors({});
            const data = {
                Email: email,
                VerifyCode: code,
            };
            setConfirmError("")
            var codeResult = await dispatch(VerifyCode(data)).unwrap();
            if (codeResult) {
                var confirmData = {
                    Email: email
                }
                var confirmResult = await dispatch(ConfirmEmail(confirmData)).unwrap();
                if (confirmResult) {
                    dispatch(GetMyProfile(UserId));
                    dispatch(SetConfirmEmailResponse("E-Posta Hesabı Başarıyla Doğrulandı"))
                    dispatch(SetConfrimEmailDialog(false));
                    dispatch(SetConfrimEmailSuccess(true));
                }
                else {
                    dispatch(SetConfrimEmailDialog(false));
                    dispatch(SetConfirmEmailResponse("Sunucu Tarafında Bir Hata Oluştu. Lütfen Daha Sonra Tekrar Deneyiniz."))
                    dispatch(SetConfrimEmailMistake(true));
                }

            }
            else {
                setConfirmError(tValidation("emailVerification.codeNotVerified"))

            }
            setCode();
        } catch (error) {
            const errObj = {};
            error.inner.forEach((e) => {
                errObj[e.path] = e.message;
            });
            setErrors(errObj);
            setConfirmError("");

        }
    };

    const SendAgain = (a) => {
        const data = {
            Email: a,
        };
        dispatch(SendResetCodeAgain(data));
        setResetKey((prev) => prev + 1);
        setIsExpired(false);
    };

    const CloseDialog = () => {
        dispatch(SetConfrimEmailDialog(false));
    };
    return (
        <div>
            <Dialog
                open={confirmEmailDialog}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={CloseDialog}
            >
                <DialogTitle sx={{ textAlign: "center" }}>
                    {tText("emailVerification")}
                </DialogTitle>
                <DialogContent sx={{ width: "500px" }} className="flex-row">
                    <div className="flex-column">
                        <div>
                            <p className="fp-code-description">
                                {tText("emailVerificationInfo")}
                            </p>
                        </div>

                        <div className="fp-input-text flex-column">
                            <InputOtp
                                value={code}
                                onChange={(e) => setCode(e.value)}
                                integerOnly
                                length={6}
                            />
                            {errors.code && (
                                <div style={{ color: "red", fontSize: "15px", margin: "10px" }}>{errors.code}</div>
                            )}
                            {confirmError && (
                                <div style={{ color: "red", fontSize: "15px", margin: "10px" }}>{confirmError}</div>
                            )}

                        </div>
                        <div
                            className="fp-timer flex-row"
                            style={{
                                backgroundColor: !isExpired
                                    ? "rgb(144, 197, 58)"
                                    : "rgb(197, 58, 58)",
                            }}
                        >
                            <CountdownTimer
                                durationInSeconds={120}
                                onFinish={() => setIsExpired(true)}
                                key={resetKey}
                            />
                        </div>
                        <div className="fp-input-text">
                            <Button
                                variant="contained"
                                fullWidth
                                disabled={isExpired}
                                onClick={Post}
                            >
                                {tButton("send")}
                            </Button>
                        </div>
                        <div className="fp-input-link">
                            <Button
                                onClick={() => SendAgain(email)}
                                variant="contained"
                                color="inherit"
                                size="small"
                                disabled={!isExpired}
                            >
                                {tButton("getCodeAgain")}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='outlined'
                        sx={{ textTransform: "none" }} onClick={CloseDialog}>
                        {tButton("cancel")}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EmailVerificationDialog