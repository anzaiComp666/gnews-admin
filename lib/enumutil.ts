import { Key } from "react";

export const enumToOptions = <T extends { [key: string]: string | number }>(enumObj: T, textMap?: Record<string, string>): {
    label: string;
    value: Key;
}[] => {
    return Object.keys(enumObj)
        .filter(key => isNaN(Number(key))) // 过滤掉数字键
        .map(key => ({
            label: textMap?.[key] ?? String(enumObj[key]),
            value: enumObj[key],
        }));
}