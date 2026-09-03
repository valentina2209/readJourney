import styles from './Loader.module.css';

interface LoaderProps {
  text?: string;
}

export const Loader = ({ text = 'Loading...' }: LoaderProps) => {
  return (
    <div className={styles.loaderContainer}>
      <svg className={styles.bookSvg} viewBox="0 0 100 70">
        {/* Обкладинка */}
        <path d="M 5,60 Q 50,68 95,60 L 95,58 Q 50,66 5,58 Z" fill="#e0e0e0" />
        
        {/* Пачка сторінок ліворуч */}
        <path d="M 7,57 Q 50,64 50,57 L 50,55 Q 50,62 7,55 Z" fill="#f0f0f0" />
        <path d="M 9,54 Q 50,61 50,54 L 50,52 Q 50,59 9,52 Z" fill="#ffffff" />

        {/* Пачка сторінок праворуч */}
        <path d="M 93,57 Q 50,64 50,57 L 50,55 Q 50,62 93,55 Z" fill="#f0f0f0" />
        <path d="M 91,54 Q 50,61 50,54 L 50,52 Q 50,59 91,52 Z" fill="#ffffff" />

        {/* Рухомі сторінки, що перегортаються веєром */}
        <g className={styles.flipPages}>
          <path className={styles.p1} d="M 50,52 Q 75,30 88,48" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path className={styles.p2} d="M 50,52 Q 65,15 75,40" stroke="#f0f0f0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path className={styles.p3} d="M 50,52 Q 50,5 50,38" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path className={styles.p4} d="M 50,52 Q 35,15 25,40" stroke="#f0f0f0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path className={styles.p5} d="M 50,52 Q 25,30 12,48" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      </svg>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};