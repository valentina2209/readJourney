import { toggleTheme } from "../../../features/theme/model/themeSlice";
import { useAppDispatch, useAppSelector } from "../../model/hooks"
import styles from './ThemeToggle.module.css';

export const ThemeToggle = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.theme);

    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => dispatch(toggleTheme())}
            type="button"
            className={styles.button}
            aria-label={`Увімкнути ${isDark ? 'світлу' : 'темну'} тему`}
            title={isDark ? 'Переключити на світлу тему' : 'Переключити на темну тему'}
        >
            <svg className={styles.icon}>
                <use href={`/icons.svg#${isDark ? 'moon' : 'sun'}`} />
            </svg>
        </button>
        
    )
}