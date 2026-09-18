import { ClientContextProvider } from "./src/features/client/ClientContext";

export const RootProvider = ({children}) => {
    return (
        <ClientContextProvider>
            {children}
        </ClientContextProvider>
    );
}