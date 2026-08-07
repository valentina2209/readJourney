import type { ReactNode } from "react"
import styles from "./Dashboard.module.css"

interface DashboardProps {
    children: ReactNode;
}

export const Dashboard = ({ children }: DashboardProps) => {
    return <aside className={styles.dashboard}>{children}</aside>
}