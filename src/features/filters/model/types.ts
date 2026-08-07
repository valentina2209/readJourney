export interface FiltersFormData {
    title: string;
    author: string;
}

export interface FiltersProps {
    onApplyFilters: (data: FiltersFormData) => void;
}