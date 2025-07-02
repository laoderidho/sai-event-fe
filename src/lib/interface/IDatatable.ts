import { ColumnDef } from '@tanstack/react-table';

export interface Idatatable<TData, Tvalue> {
    columns: ColumnDef<TData, Tvalue>[];
    data: TData[];
    pageSize?: number; // Optional, default is 10
}