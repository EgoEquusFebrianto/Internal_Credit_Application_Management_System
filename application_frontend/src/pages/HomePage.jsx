import React from 'react'
import { ApplicationForm } from '../components/home/ApplicationForm'
import { ApplicationTable } from '../components/home/ApplicationTable'
import { useClient } from '../features/client/hooks/useClient'
import { showSuccessAlert, showValidationError } from '../utils/alert'

export const HomePage = () => {
  const { createClient } = useClient();
  
  const handleCreateClient = async (formData) => {
    try {
      await createClient(formData);
      showSuccessAlert("Data nasabah berhasil disimpan.")

      return 1;
    } catch (error) {
      showValidationError(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
        <header className='border-b border-slate-200 bg-white'>
          <div className='mx-auto max-w-7xl px-6 py-5'>
            <div>
              <h1 className='text-2xl font-bold text-slate-900'>
                Pengajuan Nasabah
              </h1>

              <p className='mt-1 text-sm text-slate-500'>
                Kelola pengajuan pembiayaan nasabah.
              </p>
            </div>
          </div>
        </header>

        <main className='mx-auto max-w-7xl space-y-6 px-6 py-8'>
          <section>
            <ApplicationForm onSubmit={handleCreateClient}/>
          </section>

          <section>
            <ApplicationTable />
          </section>
        </main>
    </div>
  )
}