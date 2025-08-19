import * as yup from "yup";

export const schema = yup.object().shape({
  code: yup
    .string()
    .required("Herhangi bir kod girmediniz.")
    .matches(/^\d{6}$/, "Lütfen 6 haneyi de giriniz."),
});
