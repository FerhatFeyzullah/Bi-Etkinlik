import * as yup from "yup";

export const schema = yup.object().shape({
  firstName: yup.string().required("İsim Giriniz."),

  lastName: yup.string().required("Soyisim Giriniz."),

  city: yup.string().required("Şehir Seçimi Zorunludur."),

  birthDate: yup.mixed().required("Doğum Tarihi Zorunlu"),
  gender: yup.string().required("Cinsiyet Seçimi Zorunludur"),

  areas: yup
    .array()
    .of(yup.string())
    .min(1, "En Az Bir Tane İlgi Alanı Seçmelisin!")
    .max(5, "En Fazla 5 Tane İlgi Alanı Seçebilirsin!"),
});
