import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../shared/model/hooks"
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../../model/registerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerThunk } from "../../model/authThunk";
import styles from './RegisterForm.module.css';
import { Input } from "../../../../shared/ui/input/Input";
import { Button } from "../../../../shared/ui/button/Button";

export const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
                type="password"
                placeholder="......."
            autoComplete="new-password"
                {...register('password')}
                error={errors.password?.message}
            />

            <Button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
            >
              Registration  
            </Button>
        </form>
    )
}