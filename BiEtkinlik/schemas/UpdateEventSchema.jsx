import * as yup from "yup";

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
      function (value) {
        const { startDate } = this.parent;
        if (!value || !startDate) return true; // biri boşsa required zaten hatayı verir
        return new Date(value) >= new Date(startDate);
      }
    ),

  selectedCategories: yup
    .array()
    .of(yup.string())
    .required(t("validation:event.categoriesRequired"))
    .max(1, t("validation:event.categoriesMax")),
});
