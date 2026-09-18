import { useContext } from 'react'
import { ClientContext } from '../ClientContext'

/**
 * 
 * @returns {import('../types/Types').ClientContextType}
 */
export const useClient = () => {
    const context = useContext(ClientContext);

    if (!context) {
        throw new Error("useClient harus didalam ClientContextProvider");
    }

    return context;
}