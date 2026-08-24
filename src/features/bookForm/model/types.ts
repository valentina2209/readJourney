export interface BookFormValues {
  title: string;
  author: string;
  totalPages?: number | string;
}

export interface BookFormProps {
  mode: 'add' | 'filter';
  onFilterSubmit?: (data: BookFormValues) => void;
  onAddSuccess?: () => void;
}