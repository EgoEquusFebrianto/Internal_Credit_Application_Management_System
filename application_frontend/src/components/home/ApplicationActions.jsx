import React from 'react'
import { useNavigate } from 'react-router-dom';
import { showErrorAlert, showStatusConfirmation, showSuccessAlert } from '../../utils/alert';

export const ApplicationActions = ({ clientID, updateClient, status }) => {
    const navigate = useNavigate();

    const  handleClientDetailClick = () => {
        navigate(`/pengajuan/${clientID}`)
    };

    const handleStatusChange = async (status) => {
        const confirmation = await showStatusConfirmation(status);

        if (!confirmation.isConfirmed) return;

        try {
            await updateClient(clientID, {status});

            await showSuccessAlert(
                status === "DISETUJUI"
                    ? "Pengajuan nasabah berhasil disetujui."
                    : "Pengajuan nasabah berhasil ditolak."
            );
        } catch (error) {
            showErrorAlert("Gagal memperbaharui status pengajuan. Harap Hubungi tim IT bila masalah berulang.");
        }
    };

    return (
        <div className='flex items-center justify-end gap-2'>
            <button
                type='button'
                className='bg-emerald-600 rounded-lg px-3 py-2 text-sm font-medium text-white cursor-pointer transition hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={() => handleStatusChange("DISETUJUI")}
                disabled={status === "DISETUJUI"}
            >
                Setujui
            </button>

            <button
                type='button'
                className='bg-red-600 rounded-lg px-3 py-2 text-sm font-medium text-white cursor-pointer transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={() => handleStatusChange("DITOLAK")}
                disabled={status === "DITOLAK"}
            >
                Tolak
            </button>

            <button
                type='button'
                className='bg-slate-200 rounded-lg px-3 py-2 text-sm font-medium cursor-pointer transition hover:bg-slate-300'
                onClick={handleClientDetailClick}
            >
                Detail
            </button>
        </div>
    );
}