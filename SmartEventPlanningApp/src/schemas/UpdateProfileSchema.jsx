import * as yup from "yup";

<<<<<<< HEAD
export const schema = yup.object().shape({
  firstName: yup.string().required("İsim Giriniz."),

  lastName: yup.string().required("Soyisim Giriniz."),

  city: yup.string().required("Şehir Seçimi Zorunludur."),

  birthDate: yup.mixed().required("Doğum Tarihi Zorunlu"),
  gender: yup.string().required("Cinsiyet Seçimi Zorunludur"),
=======
export const updateProfileSchema = (t) => yup.object().shape({
  firstName: yup.string().required(t("validation:userInfo.firstNameRequired")),

  lastName: yup.string().required(t("validation:userInfo.lastNameRequired")),

  city: yup.string().required(t("validation:userInfo.cityRequired")),

  birthDate: yup.mixed().required(t("validation:userInfo.birthDateRequired")),
  gender: yup.string().required(t("validation:userInfo.genderRequired")),
>>>>>>> 0f5e1de (The error messages in the yup diagram have been translated. An automatic registration and registration deletion service has been prepared according to the change in the status of the event, and some deficiencies in the project have been completed.)

  areas: yup
    .array()
    .of(yup.string())
<<<<<<< HEAD
    .min(1, "En Az Bir Tane İlgi Alanı Seçmelisin!")
    .max(5, "En Fazla 5 Tane İlgi Alanı Seçebilirsin!"),
=======
    .min(1, t("validation:userInfo.areasMin"))
    .max(5, t("validation:userInfo.areasMax")),
>>>>>>> 0f5e1de (The error messages in the yup diagram have been translated. An automatic registration and registration deletion service has been prepared according to the change in the status of the event, and some deficiencies in the project have been completed.)
});
