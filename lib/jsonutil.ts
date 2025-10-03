export const JsonUtil = {
    isArrayString(value: string) {
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed);
        } catch {
            return false;
        }
    }
}
