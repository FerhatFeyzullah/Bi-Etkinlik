import * as yup from "yup";

export const schema = yup.object().shape({
    userName: yup.string().required("Kullanıcı Adı Girmediniz"),

    password: yup
        .string()
        .required("Şifre alanı zorunlu")
        .min(8, "En az 8 karakter")
        .matches(/[a-z]/, "Küçük harf içermeli")
        .matches(/[A-Z]/, "Büyük harf içermeli")
        .matches(/[0-9]/, "Rakam içermeli")
        .matches(/[@$!%*?&]/, "Özel karakter içermeli"),
});
