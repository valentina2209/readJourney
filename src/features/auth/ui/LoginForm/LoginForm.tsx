import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../shared/model/hooks"
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../../model/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginThunk } from "../../model/authThunk";
import { ROUTES } from "../../../../shared/routing/routes";
import styles from './LoginForm.module.css'
import { Input } from "../../../../shared/ui/input/Input";
import { Button } from "../../../../shared/ui/button/Button";

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data: LoginFormData) => {
        const result = await dispatch(loginThunk(data));
        if (loginThunk.fulfilled.match(result)) {
            navigate(ROUTES.RECOMMENDED)
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
                label="Email:"
                type="email"
                placeholder="your@email.com"
            autoComplete="email"
                {...register('email')}
                error={errors.email?.message}
            />

            <Input
                label="Password:"
                type="password"
                placeholder="*******"
            autoComplete="current-password"
                {...register('password')}
                error={errors.password?.message}
            />

            <Button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                Log In
            </Button>
        </form>
    )
}