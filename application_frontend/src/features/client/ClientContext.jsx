import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { ClientService } from "./services/ClientService"

export const ClientContext = createContext(null);

export const ClientContextProvider = ({children}) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getClients = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await ClientService.getAll();

            setClients(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const getClientDetail = useCallback(async (clientID) => {
        setLoading(true);
        
        try {
            const response = await ClientService.getClientDetail(clientID);
            
            return response.data;
        } catch (error) {
            console.log(error)
            
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const createClient = useCallback(async (formData) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await ClientService.createClientData(formData);

            setClients((prev) => [
                ...prev,
                response.data,
            ]);

            return response;
        } catch (error) {
            setError(error.response?.data ?? error.message);

            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateClientStatus = useCallback(async (clientID, request) => {
        setLoading(true);
        setError(null);

        try{
            const response = await ClientService.updateClientData(clientID, request);

            setClients((prev) => prev.map(
                (client) => client.id === clientID
                    ? response.data
                    : client
                )
            );

            return response;
        } catch (error) {
            setError(error.response?.data ?? error.message);
            throw error;

        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const getAllData = async () => {
            await getClients();
        };

        getAllData();
    }, [getClients]);

    const contextValue = useMemo(
        () => ({
            clients,
            loading,
            error,
            getClients,
            getClientDetail,
            createClient,
            updateClientStatus,
        }),
        [clients, loading, error, getClients, getClientDetail, createClient, updateClientStatus]
    );

    return (
        <ClientContext.Provider value={contextValue}>
            {children}
        </ClientContext.Provider>
    );
};