import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createBook, fetchOwnBooks } from "@/entities/book/model/operations";
import { useAppDispatch } from "@/shared/model/hooks";
import { Input } from "@/shared/ui/input/Input";
import { Button } from "@/shared/ui/button/Button";

interface AddBookInputs {
    title: string;
    author: string;
    totalPages: number;
}

interface AddBookFormProps {
    onSuccess: () => void;
}

export const AddBookForm = ({
    onSuccess,
}: AddBookFormProps) => {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AddBookInputs>();

    const onSubmit = async (data: AddBookInputs) => {
        try {
            const resultAction = await dispatch(
                createBook({
                    title: data.title.trim(),
                    author: data.author.trim(),
                    totalPages: Number(data.totalPages),
                })
            );

            if (createBook.fulfilled.match(resultAction)) {
                await dispatch(fetchOwnBooks(''));
                reset();
                onSuccess();
            } else {
                toast.error(resultAction.payload || 'Failed to add book');
            }
        } catch {
            toast.error('Something went wrong');
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h3>Filters/ Add Book</h3>

            <Input
                label="Book title:"
                type="text"
                placeholder="Enter text"
                {...register('title', { required: 'Title is required' })}
                error={errors.title?.message}
            />

            <Input
                label="The author's name:"
                type="text"
                placeholder="Enter text"
                {...register('author', { required: 'Author is required' })}
                error={errors.author?.message}
            />

            <Input
                label="Number of pages:"
                type="number"
                placeholder="0"
                {...register('totalPages', {
                    required: 'Number of page is required',
                    min: {value: 1, message: 'Must be at least 1 page'},
                })}
                error={errors.totalPages?.message}
            />

            <Button type="submit" disabled={isSubmitting}>
                Add book
            </Button>
        </form>
    )
}