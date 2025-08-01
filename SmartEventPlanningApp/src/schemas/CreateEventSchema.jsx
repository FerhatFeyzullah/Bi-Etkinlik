import * as yup from "yup";

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
      if (!value) return false;
      return value && value.size <= 10 * 1024 * 1024;
    }),

  startDate: yup.mixed().required("Başlangıç Tarihi Seçmediniz"),
  endDate: yup
    .mixed()
    .required("Bitiş Tarihi Seçmediniz")
    .test(
      "is-after-start",
      "Bitiş tarihi, başlangıç tarihinden önce olamaz.",
      function (value) {
        const { startDate } = this.parent;
        if (!value || !startDate) return true; // biri boşsa required zaten hatayı verir
        return new Date(value) >= new Date(startDate);
      }
    ),

  selectedCategories: yup
    .array()
    .of(yup.string())
    .min(1, "İlgi Alanı Seçmedin."),
});
