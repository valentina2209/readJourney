import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/model/hooks"
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../../model/registerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerThunk } from "../../model/authThunk";
import { Input } from "@/shared/ui/input/Input";
import { Button } from "@/shared/ui/button/Button";
import { ROUTES } from "@/shared/routing/routes";
import { useState } from "react";
import styles from '../styles/AuthForm.module.css';

export const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data: RegisterFormData) => {
        const result = await dispatch(registerThunk(data));
        if (registerThunk.fulfilled.match(result)) {
            navigate('/recommended');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
                label="Name:"
                placeholder="Anna"
                {...register('name')}
                error={errors.name?.message}
            />

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
                <Button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                >
                    Registration  
                </Button>
                <Link to={ROUTES.LOGIN} className={styles.switchLink}>
                    Already have an account?
                </Link>  
            </div>
          
        </form>
    )
}