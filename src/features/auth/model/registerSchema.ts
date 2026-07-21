import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    name: yup
        .string()
        .required("Ім'я є обов'язковим"),
    email: yup
        .string()
        .matches(
            /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            'Введіть коректний email (наприклад, user@mail.com)'
        )
        .required("Email є обов'язковим"),
    password: yup
        .string()
        .min(7, 'Пароль повинен містити мінімум 7 символів')
        .required("Пароль є обов'язковим"),
});

export type RegisterFormData = yup.InferType<typeof registerSchema>;