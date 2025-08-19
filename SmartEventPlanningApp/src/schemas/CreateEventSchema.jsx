import * as yup from "yup";

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
      if (!value) return false;
      return value && value.size <= 10 * 1024 * 1024;
    }),

  startDate: yup.mixed().required(t("validation:event.startDateRequired")),
  endDate: yup
    .mixed()
    .required(t("validation:event.endDateRequired"))
    .test(
      "is-after-start",
      (t("validation:event.endDateTest")),
      function (value) {
        const { startDate } = this.parent;
        if (!value || !startDate) return true; // biri boşsa required zaten hatayı verir
        return new Date(value) >= new Date(startDate);
      }
    ),

  selectedCategories: yup
    .array()
    .of(yup.string())
    .min(1, t("validation:event.categoriesMin"))
    .max(5, t("validation:event.categoriesMax")),
});
