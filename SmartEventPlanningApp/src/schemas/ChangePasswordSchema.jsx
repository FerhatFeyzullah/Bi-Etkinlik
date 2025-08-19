import * as yup from "yup";
export const changePasswordSchema = (t) => yup.object().shape({
  oldPassword: yup
    .string()
    .required(t("validation:changePassword.oldPasswordRequired"))
    .min(8, t("validation:changePassword.oldPasswordMin")),
  newPassword: yup
    .string()
    .required(t("validation:changePassword.newPasswordRequired"))
    .min(8, t("validation:changePassword.newPasswordMin"))
    .matches(/[a-z]/, t("validation:changePassword.newPasswordMatchesLower"))
    .matches(/[A-Z]/, t("validation:changePassword.newPasswordMatchesUpper"))
    .matches(/[0-9]/, t("validation:changePassword.newPasswordMatchesDigit"))
    .matches(/[@$!%*?&]/, t("validation:changePassword.newPasswordMatchesSpecial")),

  confirmPass: yup
    .string()
    .required(t("validation:changePassword.confirmNewPasswordRequired"))
    .oneOf([yup.ref("newPassword", yup.newPassword)], t("validation:changePassword.confirmNewPasswordOneOf")),
});
