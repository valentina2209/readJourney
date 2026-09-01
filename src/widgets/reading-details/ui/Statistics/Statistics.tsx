
interface StatisticsProps {
    currentProgressPage: number;
    totalPages: number;
}

export const Statistics = ({ currentProgressPage, totalPages }: StatisticsProps) => {
    const percentage = Math.round((currentProgressPage / totalPages) * 100) || 0;

    return (
        <div>
            <div>
                <span>{percentage}%</span>
            </div>

            <p>
                {currentProgressPage} of {totalPages} pages read
            </p>
        </div>
    )
}