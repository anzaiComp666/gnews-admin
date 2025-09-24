import { createContext } from "react";
import { IProTableColumn } from "./column";

export type ProTableContextType = {
    // 表格列
    columns: IProTableColumn<any>[];

    // 页码
    page: number;
    setPage: (page: number) => void;

    // 每页条数
    pageSize: number;
    setPageSize: (pageSize: number) => void;

    // 总条数
    total: number;

    // 是否正在请求数据
    isRequesting: boolean;

    // 刷新回调函数
    refresh: () => void;

    // 过滤参数
    filters: Record<string, any>;
    setFilters: (filters: Record<string, any>) => void;
}

export const ProTableContext = createContext<ProTableContextType | undefined>(undefined);
