import * as yup from "yup";

export const emailVerificationSchema = (t) => yup.object().shape({
    code: yup
        .string()
        .required(t("validation:emailVerification.codeRequired"))
        .matches(/^\d{6}$/, t("validation:emailVerification.codeMatchesSixDigit")),
});
