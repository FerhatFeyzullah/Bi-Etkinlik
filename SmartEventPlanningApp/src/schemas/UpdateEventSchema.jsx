import * as yup from "yup";

<<<<<<< HEAD
export const updateSchema = yup.object().shape({
  eventName: yup
    .string()
    .required("Etkinliğe isim Veriniz.")
    .max(30, "Etkinlik İsmi En Fazla 30 Karakter Olabilir"),

  description: yup.string().required("Açıklama Zorunludur."),

  selectedCity: yup.string().required("Şehir Seçimi Zorunludur."),

  latitude: yup.number().required("Etkinlik Konumu Seçiniz."),

  startDate: yup.mixed().required("Başlangıç Tarihi Seçmediniz"),
  endDate: yup
    .mixed()
    .required("Bitiş Tarihi Seçmediniz")
    .test(
      "is-after-start",
      "Bitiş tarihi, başlangıç tarihinden önce olamaz.",
=======
export const updateEventSchema = (t) => yup.object().shape({
  eventName: yup
    .string()
    .required(t("validation:eventNameRequired"))
    .max(30, (t("validation:eventNameMax"))),

  description: yup.string().required(t("validation:eventDescription")),

  selectedCity: yup.string().required(t("validation:eventCity")),

  latitude: yup.number().required(t("validation:eventLocation")),

  startDate: yup.mixed().required(t("validation:eventStartDateRequired")),
  endDate: yup
    .mixed()
    .required(t("validation:eventEndDateRequired"))
    .test(
      "is-after-start",
      (t("validation:eventEndDateTest")),
>>>>>>> 0f5e1de (The error messages in the yup diagram have been translated. An automatic registration and registration deletion service has been prepared according to the change in the status of the event, and some deficiencies in the project have been completed.)
      function (value) {
        const { startDate } = this.parent;
        if (!value || !startDate) return true; // biri boşsa required zaten hatayı verir
        return new Date(value) >= new Date(startDate);
      }
    ),

  selectedCategories: yup
    .array()
    .of(yup.string())
<<<<<<< HEAD
    .min(1, "Kategori Seçmedin.")
    .max(5, "En Fazla 5 Tane Kategori Seçebilirsin!"),
=======
    .min(1, t("validation:eventCategoriesMin"))
    .max(5, t("validation:eventCategoriesMax")),
>>>>>>> 0f5e1de (The error messages in the yup diagram have been translated. An automatic registration and registration deletion service has been prepared according to the change in the status of the event, and some deficiencies in the project have been completed.)
});
