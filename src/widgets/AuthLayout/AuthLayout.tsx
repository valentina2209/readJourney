import { ReactNode } from "react";
import styles from "./AuthLayout.module.css";


interface AuthLayoutProps {
    title: ReactNode;
    children: ReactNode;
}

export const AuthLayout = ({ title, children }: AuthLayoutProps) => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.authCard}>
                <div className={styles.cardHeader}>
                    <div className={styles.logoWrapper}>
                        {/* Мобільна іконка */}
                        <svg className={styles.logoMobile}>
                            <use href="/logo.svg" />
                        </svg>
                        {/* Планшетний/Десктопний логотип з текстом */}
                        <svg className={styles.logoTablet}>
                            <use href="/logo-full.svg" />
                        </svg>
                    </div>
                </div>

                <h1 className={styles.title}>{title}</h1>

                <div className={styles.formContainer}>{children}</div>
            </div>

            <div className={styles.heroCard}>
                <picture>
                    {/* Десктопне зображення (від 1280px) */}
                    <source
                        media="(min-width: 1280px)"
                        srcSet="/images/iphone-desktop@1x.png 1x, /images/iphone-desktop@2x.png 2x"
                    />
                    {/* Мобільне / Планшетне зображення */}
                    <source
                        srcSet="/images/iphone-mobile@1x.png 1x, /images/iphone-mobile@2x.png 2x"
                    />
                    <img
                        src="/images/iphone-mobile@1x.png"
                        alt="App preview"
                        className={styles.heroImage}
                    />
                </picture>
            </div>   
        </div>
    )
}