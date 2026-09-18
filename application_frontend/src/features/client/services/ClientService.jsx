import API from "../../api/API";

/**
 * @import {} from '../types/Types
 */
export const ClientService = {
    /**
     * 
     * @returns {Promise<PengajuanResponse>}
     */
    getAll: async () => {
        const response = await API.get("/clients");

        return response.data;
    },

    /**
     * 
     * @param {number} clientId
     * 
     * @returns {Promise<SinglePengajuanResponse>}
     */
    getClientDetail: async (clientId) => {
        const response = await API.get(`/clients/${clientId}`);
        
        return response.data;
    },

    /**
     * 
     * @param {CreatePengajuanRequest} request 
     * 
     * @returns {Promise<SinglePengajuanResponse>}
     */
    createClientData: async (request) => {
        const response = await API.post('/clients', request);
        
        return response.data
    },

    /**
     * 
     * @param {number} clientId 
     * @param {UpdateStatusRequest} request
     *  
     * @returns {Promise<SinglePengajuanResponse>}
     */
    updateClientData: async (clientId, request) => {
        const response = await API.patch(`/clients/${clientId}`, request);

        return response.data;
    },
};