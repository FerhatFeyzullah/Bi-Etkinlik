import * as yup from "yup";
<<<<<<< HEAD
export const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Şifre alanı zorunlu")
    .min(8, "En az 8 karakter"),
  newPassword: yup
    .string()
    .required("Şifre alanı zorunlu")
    .min(8, "En az 8 karakter")
    .matches(/[a-z]/, "Küçük harf içermeli")
    .matches(/[A-Z]/, "Büyük harf içermeli")
    .matches(/[0-9]/, "Rakam içermeli")
    .matches(/[@$!%*?&]/, "Özel karakter içermeli"),

  confirmPass: yup
    .string()
    .required("Şifre tekrarı zorunlu")
    .oneOf([yup.ref("newPassword", yup.newPassword)], "Şifreler eşleşmiyor"),
=======
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
>>>>>>> 0f5e1de (The error messages in the yup diagram have been translated. An automatic registration and registration deletion service has been prepared according to the change in the status of the event, and some deficiencies in the project have been completed.)
});
