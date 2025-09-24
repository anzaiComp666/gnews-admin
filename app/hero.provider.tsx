"use client";


import { HeroUIProvider, ToastProvider } from "@heroui/react";
import type { FC, PropsWithChildren } from "react";


const HeroProvider: FC<PropsWithChildren> = ({ children }) => {
    return (

        <HeroUIProvider>
            <ToastProvider placement="top-center" />
            {children}
        </HeroUIProvider>

    );
};

export default HeroProvider;
