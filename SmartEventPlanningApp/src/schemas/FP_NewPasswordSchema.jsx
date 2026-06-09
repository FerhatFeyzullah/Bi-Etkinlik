import * as yup from "yup";
export const schema = yup.object().shape({
  password: yup
    .string()
    .required("Şifre alanı zorunlu")
    .min(6, "En az 6 karakter ve bir rakam içermelidir")
    .matches(/\d/, "En az 6 karakter ve bir rakam içermelidir"),

  confirmPass: yup
    .string()
    .required("Şifre tekrarı zorunlu")
    .oneOf([yup.ref("password", yup.password)], "Şifreler eşleşmiyor"),
});
