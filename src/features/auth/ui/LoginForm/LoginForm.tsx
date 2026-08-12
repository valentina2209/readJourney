import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../shared/model/hooks"
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../../model/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginThunk } from "../../model/authThunk";
import { ROUTES } from "../../../../shared/routing/routes";
import { Input } from "../../../../shared/ui/input/Input";
import { Button } from "../../../../shared/ui/button/Button";
import { useState } from "react";
import styles from '../styles/AuthForm.module.css';

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

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
                type={showPassword ? 'text' : 'password'}
                placeholder="*******"
                autoComplete="current-password"
                {...register('password')}
                error={errors.password?.message}
                rightElement={
                   <button
                        type="button"
                        className={styles.eyeBtn}
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label="Toggle password visibility"
                    >
                        <svg className={styles.eyeIcon}>
                            <use href={`/icons.svg#icon-eye${showPassword ? '' : '-off'}`} />
                        </svg>
                    </button> 
                }
            />

            <div className={styles.controls}>
                <Button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                    Log In
                </Button>
                <Link to={ROUTES.REGISTER} className={styles.switchLink}>
                    Don’t have an account?
                </Link>
            </div>
        </form>
    )
}