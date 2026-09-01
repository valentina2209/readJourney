import { useForm } from "react-hook-form";

interface FormInput {
    page: number;
}

interface AddReadingFormProps {
    isReadingActive: boolean;
    totalPages: number;
    onStart: (page: number) => void;
    onStop: (page: number) => void;
    isLoading?: boolean;
}

export const AddReadingForm = ({ isReadingActive, totalPages, onStart, onStop, isLoading }: AddReadingFormProps) => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormInput>();

    const onSubmit = (data: FormInput) => {
        const pageNum = Number(data.page);
        if (isReadingActive) {
            onStop(pageNum);
        } else {
            onStart(pageNum);
        }
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>
                {isReadingActive ? 'Stop page:' : 'Start page:'}
            </p>

            <div>
                <input
                    type="number"
                    placeholder="Page number"
                    {...register('page', {
                        required: "Page number is required",
                        min: { value: 1, message: "Minimum page is 1" },
                        max: {value: totalPages, message: `Maximum page is ${totalPages}`},
                    })}
                />
                {errors.page && (
                    <span>{errors.page.message}</span>
                )}
            </div>

            <button type="submit" disabled={isLoading}>
                {isReadingActive ? "To stop" : "To start"}
            </button>
        </form>
    )
}