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
    .min(8, "En Az 8 Karakter")
    .matches(/[a-z]/, "Küçük Harf İçermeli")
    .matches(/[A-Z]/, "Büyük Harf İçermeli")
    .matches(/[0-9]/, "Rakam İçermeli")
    .matches(/[@$!%*?&]/, "Özel Karakter İçermeli"),

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
    .min(1, "En Az Bir Tane İlgi Alanı Seçmelisin!"),
});
