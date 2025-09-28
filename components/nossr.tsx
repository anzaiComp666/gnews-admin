import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";

const promise = Promise.resolve(({ children }: PropsWithChildren) => children)
export const NoSSR = dynamic(() => promise, { ssr: false });
