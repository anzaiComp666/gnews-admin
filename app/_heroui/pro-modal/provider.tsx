import { createContext, PropsWithChildren } from "react";

interface ProModalContextType {
    onClose: () => void;
}

export const ProModalContext = createContext<ProModalContextType>({
    onClose: () => {
        console.warn("ProModalContext onClose is not provided");
    }
});

interface Props extends PropsWithChildren, ProModalContextType {

}

export const ProModalProvider = (props: Props) => {
    const { children, ...restProps } = props;
    return (
        <ProModalContext.Provider value={restProps}>
            {props.children}
        </ProModalContext.Provider>
    )
};