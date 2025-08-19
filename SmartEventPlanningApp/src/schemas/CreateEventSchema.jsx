import * as yup from "yup";

<<<<<<< HEAD
export const schema = yup.object().shape({
  eventName: yup
    .string()
    .required("Etkinliğe isim Veriniz.")
    .max(30, "Etkinlik İsmi En Fazla 30 Karakter Olabilir"),

  description: yup.string().required("Açıklama Zorunludur."),

  selectedCity: yup.string().required("Şehir Seçimi Zorunludur."),

  latitude: yup.number().required("Etkinlik Konumu Seçiniz."),

  image: yup
    .mixed()
    .required("Etkinlik Resmi Yükleyin.")
    .test("fileSize", "Dosya boyutu en fazla 10MB olabilir.", (value) => {
=======
export const createEventSchema = (t) => yup.object().shape({
  eventName: yup
    .string()
    .required(t("validation:event.nameRequired"))
    .max(30, (t("validation:event.nameMax"))),

  description: yup.string().required(t("validation:event.descriptionRequired")),

  selectedCity: yup.string().required(t("validation:event.cityRequired")),

  latitude: yup.number().required(t("validation:event.locationRequired")),

  image: yup
    .mixed()
    .required(t("validation:event.imageRequired"))
    .test("fileSize", (t("validation:event.imageTest")), (value) => {
>>>>>>> 0f5e1de (The error messages in the yup diagram have been translated. An automatic registration and registration deletion service has been prepared according to the change in the status of the event, and some deficiencies in the project have been completed.)
      if (!value) return false;
      return value && value.size <= 10 * 1024 * 1024;
    }),

<<<<<<< HEAD
  startDate: yup.mixed().required("Başlangıç Tarihi Seçmediniz"),
  endDate: yup
    .mixed()
    .required("Bitiş Tarihi Seçmediniz")
    .test(
      "is-after-start",
      "Bitiş tarihi, başlangıç tarihinden önce olamaz.",
=======
  startDate: yup.mixed().required(t("validation:event.startDateRequired")),
  endDate: yup
    .mixed()
    .required(t("validation:event.endDateRequired"))
    .test(
      "is-after-start",
      (t("validation:event.endDateTest")),
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
    .min(1, "İlgi Alanı Seçmedin.")
    .max(5, "En Fazla 5 Tane Kategori Seçebilirsin!"),
=======
    .min(1, t("validation:event.categoriesMin"))
    .max(5, t("validation:event.categoriesMax")),
>>>>>>> 0f5e1de (The error messages in the yup diagram have been translated. An automatic registration and registration deletion service has been prepared according to the change in the status of the event, and some deficiencies in the project have been completed.)
});
