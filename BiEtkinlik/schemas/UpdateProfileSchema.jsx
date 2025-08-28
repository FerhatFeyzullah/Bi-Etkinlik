import * as yup from "yup";

export const updateProfileSchema = (t) => yup.object().shape({
  firstName: yup.string().required(t("validation:userInfo.firstNameRequired")),

  lastName: yup.string().required(t("validation:userInfo.lastNameRequired")),

  city: yup.string().required(t("validation:userInfo.cityRequired")),

  birthDate: yup.mixed().required(t("validation:userInfo.birthDateRequired")),
  gender: yup.string().required(t("validation:userInfo.genderRequired")),

  areas: yup
    .array()
    .of(yup.string())
    .min(1, t("validation:userInfo.areasMin"))
    .max(7, t("validation:userInfo.areasMax")),
});
