import { useForm } from 'react-hook-form'
import type { FiltersFormData, FiltersProps } from '../model/types'
import styles from './Filters.module.css'


export const Filters = ({ onApplyFilters }: FiltersProps) => {
    const { register, handleSubmit } = useForm<FiltersFormData>();

    return (
       
        <form onSubmit={handleSubmit(onApplyFilters)} className={styles.form}>
            
                <p className={styles.title}>Filters:</p>

            <div className={styles.inputsWrapper}>
                <div className={styles.inputField}>
                    <label className={styles.label} htmlFor='title'>
                        Book title:
                    </label>
                    <input 
                        {...register('title')}
                        id='title'
                        type='text'
                        placeholder='Enter text'
                        className={styles.input}
                        autoComplete='off'
                    />
                </div>
                <div className={styles.inputField}>
                    <label className={styles.label} htmlFor='author'>
                        The author:
                    </label>
                    <input 
                        {...register('author')}
                        id='author'
                        type='text'
                        placeholder='Enter text'
                        className={styles.input}
                        autoComplete='off'
                    />
                </div>
            </div>

            <button type='submit' className={styles.submitBtn}>
                To apply
            </button>
            
            
            </form>
       
    )
}