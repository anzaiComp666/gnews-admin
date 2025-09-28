import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination"
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
    totalCount: number;

    pageSize: number;
    onPageSizeChange: (pageSize: number) => void;

    page: number;
    onPageChange: (page: number) => void;
}

export const ProPagination = (props: Props) => {
    const { totalCount, pageSize, page, onPageChange } = props;

    // 1. 计算总页数
    const totalPages = Math.ceil(totalCount / pageSize);
    const maxVisible = 3; // 最多显示 3 个页码链接

    // 2. 确定可见页码范围的逻辑
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxVisible) {
        // 如果总页数超过最大可见数，则需要计算截断范围
        const half = Math.floor(maxVisible / 2); // 2

        // 默认范围：以当前页为中心
        startPage = page - half;
        endPage = page + half;

        // 调整：如果起始页小于 1 (当前页靠近开头)
        if (startPage < 1) {
            startPage = 1;
            endPage = maxVisible;
        }

        // 调整：如果结束页大于总页数 (当前页靠近结尾)
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = totalPages - maxVisible + 1;
        }
    }

    // 创建要渲染的页码数组
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => {
        setIsBrowser(true);
    }, []);

    if (!isBrowser) {
        return null;
    }

    // --- 渲染部分 ---
    return (
        <Pagination className=" justify-between select-none">
            <PaginationContent>
                <PaginationItem className="flex items-center">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">总数量: {totalCount}</span>
                    <Select>
                        <SelectTrigger>
                            <span className="text-sm text-muted-foreground whitespace-nowrap">每页显示: {pageSize}</span>
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 20, 50, 100].map(size => (
                                <Button
                                    key={size}
                                    className="w-full text-left"
                                    variant="ghost"
                                    onClick={() => props.onPageSizeChange(size)}>
                                    {size}
                                </Button>
                            ))}
                        </SelectContent>
                    </Select>
                </PaginationItem>
            </PaginationContent>
            <PaginationContent>
                {/* 上一页按钮 */}
                <PaginationItem>
                    <Button
                        className="cursor-pointer"
                        size="icon"
                        disabled={page === 1}
                        onClick={() => onPageChange(page - 1)}
                        variant="outline">
                        <ChevronLeft />
                    </Button>
                </PaginationItem>

                {/* 1. 起始页码链接 */}
                {startPage > 1 && (
                    <PaginationItem>
                        <Button
                            className="cursor-pointer"
                            size="icon"
                            variant="outline"
                            onClick={() => onPageChange(1)}
                        >
                            1
                        </Button>
                    </PaginationItem>
                )}

                {/* 2. 左侧省略号 */}
                {startPage > 2 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {/* 3. 中间的可见页码链接 */}
                {pages.map(item => (
                    <PaginationItem key={item}>
                        <Button
                            className="cursor-pointer"
                            size="icon"
                            variant={item === page ? "default" : "outline"}
                            onClick={() => onPageChange(item)}>
                            {item}
                        </Button>
                    </PaginationItem>
                ))}

                {/* 4. 右侧省略号 */}
                {endPage < totalPages - 1 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {/* 5. 结尾页码链接 */}
                {endPage < totalPages && (
                    <PaginationItem>
                        <Button
                            className="cursor-pointer"
                            size="icon"
                            variant="outline"
                            onClick={() => onPageChange(totalPages)}
                        >
                            {totalPages}
                        </Button>
                    </PaginationItem>
                )}

                {/* 下一页按钮 */}
                <PaginationItem>
                    <Button
                        className="cursor-pointer"
                        size="icon"
                        disabled={page === totalPages}
                        onClick={() => onPageChange(page + 1)}
                        variant="outline">
                        <ChevronRight />
                    </Button>
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    );
}