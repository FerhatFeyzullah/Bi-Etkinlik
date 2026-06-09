import * as yup from "yup";

export const schema = yup.object().shape({
  firstName: yup.string().required("İsim Giriniz."),

  lastName: yup.string().required("Soyisim Giriniz."),

  userName: yup.string().required("Kullanıcı Adı Zorunlu"),

  email: yup
    .string()
    .email("Geçerli Email Adresi Giriniz")
    .required("Email Adresi Zorunlu")
    .max(50, "E-posta 50 Karakterden Uzun Olamaz."),

  password: yup
    .string()
    .required("Şifre Alanı Zorunlu")
    .min(6, "En az 6 karakter ve bir rakam içermelidir")
    .matches(/\d/, "En az 6 karakter ve bir rakam içermelidir"),

  confirmPassword: yup
    .string()
    .required("Şifre Tekrarı Zorunlu")
    .oneOf([yup.ref("password", yup.password)], "Şifreler Eşleşmiyor"),
  city: yup.string().required("Şehir Seçimi Zorunludur."),

  birthDate: yup.mixed().required("Doğum Tarihi Zorunlu"),
  gender: yup.string().required("Cinsiyet Seçimi Zorunludur"),

  areas: yup
    .array()
    .of(yup.string())
    .min(1, "En Az 1 İlgi Alanı Seçmelisin!")
    .max(7, "En Fazla 7 Tane İlgi Alanı Seçebilirsin!"),
});
