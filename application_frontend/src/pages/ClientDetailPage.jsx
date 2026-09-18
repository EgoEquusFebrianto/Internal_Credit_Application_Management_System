import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useClient } from '../features/client/hooks/useClient';
import { ClientDetailCard } from '../components/client_detail/ClientDetailCard';

export const ClientDetailPage = () => {
  const {clientID} = useParams();
  const {getClientDetail, loading} = useClient();

  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const fetchClientDetail = async () => {
      const payload = await getClientDetail(clientID);

      setClientData(payload);
    };

    fetchClientDetail();
  }, [clientID, getClientDetail]);

  return (
    <div className='min-h-screen bg-slate-50'>
      <header className='border-b border-slate-200 bg-white'>
        <div className='mx-atuo max-w-4xl px-6 py-5'>
          <h1 className='text-2xl font-bold text-slate-900'>
            Detail Pengajuan
          </h1>

          <p className='mt-1 text-sm text-slate-500'>
            Informasi lengkap pengajuan pembiayaan nasabah.
          </p>
        </div>
      </header>

      <main className='mx-auto max-w-4xl px-6 py-8'>
        {loading ? (
          <div>
            Memuat Data...
          </div>
        ) : (
          <ClientDetailCard clientData={clientData}/>
        )}
      </main>
    </div>
  )
}