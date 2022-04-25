const Yup = require("Yup");

exports.schema = Yup.object().shape({
  fullname: Yup.string()
    .min(4, "نام و نام خانوادگی نباید کمتر از 4 حرف باشد")
    .max(255, "نام و نام خانوادگی نباید بیشتر از 255 حرف باشد")
    .required("نام و نام خانوادگی الزامی می‌باشد"),
  email: Yup.string()
    .email("ایمیل معتبر نیست")
    .required("ایمیل الزامی می‌باشد"),
  password: Yup.string()
    .min(4, "کلمه عبور نباید کمتر از 4 حرف باشد")
    .max(255, "کلمه عبور نباید بیشتر از 255 حرف باشد")
    .required("کلمه عبور الزامی است"),
  confirmPassword: Yup.string()
    .required("تکرار کلمه عبور الزامی است")
    .oneOf(
      [Yup.ref("password"), null],
      "کلمات عبور باید با یکدیگر یکسان باشند"
    ),
});
