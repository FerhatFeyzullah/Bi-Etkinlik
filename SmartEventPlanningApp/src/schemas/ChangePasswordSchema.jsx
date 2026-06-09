import * as yup from "yup";
export const changePasswordSchema = (t) => yup.object().shape({
  oldPassword: yup
    .string()
    .required(t("validation:changePassword.oldPasswordRequired"))
    .min(6, t("validation:changePassword.oldPasswordMin")),
  newPassword: yup
    .string()
    .required(t("validation:changePassword.newPasswordRequired"))
    .min(6, t("validation:changePassword.newPasswordMin"))
    .matches(/\d/, t("validation:changePassword.newPasswordMatchesDigit")),

  confirmPass: yup
    .string()
    .required(t("validation:changePassword.confirmNewPasswordRequired"))
    .oneOf([yup.ref("newPassword", yup.newPassword)], t("validation:changePassword.confirmNewPasswordOneOf")),
});
