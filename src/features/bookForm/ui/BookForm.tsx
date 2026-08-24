import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { createBook, fetchOwnBooks } from '@/entities/book/model/operations';
import { useAppDispatch } from '@/shared/model/hooks';
import { Button } from '@/shared/ui/button/Button';
import { Input } from '@/shared/ui/input/Input';

import type { BookFormProps, BookFormValues } from '../model/types';
import styles from './BookForm.module.css';

export const BookForm = ({
  mode,
  onFilterSubmit,
  onAddSuccess,
}: BookFormProps) => {
  const dispatch = useAppDispatch();
  const isAddMode = mode === 'add';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookFormValues>();

  const onSubmit = async (data: BookFormValues) => {
    if (!isAddMode) {
      if (onFilterSubmit) {
        onFilterSubmit({
          title: data.title ? data.title.trim() : '',
          author: data.author ? data.author.trim() : '',
        });
      }
      return;
    }

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
        onAddSuccess?.();
      } else {
        toast.error(
          (resultAction.payload as string) || 'Failed to add book'
        );
      }
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={styles.form}
    >
      <h3 className={styles.title}>
        {isAddMode ? 'Create your library:' : 'Filters:'}
      </h3>

      <div className={styles.inputsWrapper}>
        <Input
          label="Book title:"
          type="text"
          placeholder="Enter text"
          {...register('title', {
            required: isAddMode ? 'Title is required' : false,
          })}
          error={errors.title?.message}
        />

        <Input
          label="The author's name:"
          type="text"
          placeholder="Enter text"
          {...register('author', {
            required: isAddMode ? 'Author is required' : false,
          })}
          error={errors.author?.message}
        />

        {isAddMode && (
          <Input
            label="Number of pages:"
            type="number"
            placeholder="0"
            {...register('totalPages', {
              required: isAddMode ? 'Number of page is required' : false,
              min: { value: 1, message: 'Must be at least 1 page' },
            })}
            error={errors.totalPages?.message}
          />
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isAddMode ? 'Add book' : 'To apply'}
      </Button>
    </form>
  );
};