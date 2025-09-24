import { useContext } from "react";
import { ProModalContext } from "./provider";

export const useProModal = () => {
    const context = useContext(ProModalContext);
    if (!context) {
        throw new Error('useProModal must be used within a ProModalProvider');
    }
    return context;
}