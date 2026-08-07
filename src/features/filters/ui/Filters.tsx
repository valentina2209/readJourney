import { useForm } from 'react-hook-form'
import type { FiltersFormData, FiltersProps } from '../model/types'
import styles from './Filters.module.css'


export const Filters = ({ onApplyFilters }: FiltersProps) => {
    const { register, handleSubmit } = useForm<FiltersFormData>();

    return (
        <form onSubmit={handleSubmit(onApplyFilters)} className={styles.form}>
            <p className={styles.title}>Filters</p>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Book title</label>

                <input 
                    {...register('title')}
                    type='text'
                    placeholder='Enter text'
                    className={styles.input}
                />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>The author's name:</label>

                <input 
                    {...register('author')}
                    type='text'
                    placeholder='Enter text'
                    className={styles.input}
                />
            </div>

            <button type='submit' className={styles.submitBtn}>
                To apply
            </button>
        </form>
    )
}