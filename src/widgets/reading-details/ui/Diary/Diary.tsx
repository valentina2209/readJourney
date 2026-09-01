import { ProgressEntry } from "@/entities/book";


interface DairyProps {
    progress: ProgressEntry[];
    totalPages: number;
    onDeleteEntry: (readingId: string) => void;
}

export const Diary = ({ progress, totalPages, onDeleteEntry }: DairyProps) => {
    return (
        <div>
            {progress.map((entry) => {
                const pagesRead = entry.finishPage
                    ? entry.finishPage - entry.startPage + 1
                    : 0;
                const percentage = entry.finishPage
                    ? ((pagesRead / totalPages) * 100).toFixed(1)
                    : "0";
                
                return (
                    <div key={entry._id}>
                        <div>
                            <span>
                                {new Date(entry.startReading).toLocaleDateString()}
                            </span>  
                            <span>{pagesRead}</span>
                        </div>

                        <div>
                            <span>{percentage}% of book</span>
                            {entry.speed && <span>{entry.speed} pages/hour</span>}

                            <button
                                type="button"
                                onClick={() => onDeleteEntry(entry._id)}
                                aria-label="Delete reading session"
                            >
                                <svg>
                                    <use href="/icons.svg#icon-trash" />
                                </svg>
                            </button>
                        </div>
                       
                    </div>
                )
            })}
        </div>
    )
} 