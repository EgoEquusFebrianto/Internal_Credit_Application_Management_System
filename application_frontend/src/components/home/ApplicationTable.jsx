import React from 'react'
import { ApplicationActions } from './ApplicationActions'
import { useClient } from '../../features/client/hooks/useClient'

/**
 * @import {Pengajuan} from '../../features/client/types/Types'
 * 
 * @typedef {Object} ApplicationTableProps
 * @property {Pengajuan[]} clients
 * @property {boolean} loading
 */

/**
 * 
 * @param {ApplicationTableProps} props
 * @returns 
 */
export const ApplicationTable = () => {
  const {clients, loading, updateClientStatus} = useClient();

  return (
    <div className='overflow-hidden rounded-x1 border border-slate-200 bg-white p-6 shadow'>
        <div className='border-b border-slate-200 px-6 py-5'>
          <h2 className='text-lg font-semibold text-slate-900'>
            Daftar Pengajuan
          </h2>

          <p className='mt-1 text-sm text-slate-500'>
            Daftar pengajuan pembiayaan nasabah.
          </p>
        </div>


        <div className='overflow-x-auto'>
          <table className='w-full min-w-250 text-left text-sm'>
            <thead className='bg-slate-50'>
              <tr>
                <th className='px-6 py-4 font-semibold text-slate-600'>
                  Nama Nasabah
                </th>

                <th className='px-6 py-4 font-semibold text-slate-600'>
                  Tipe Pengajuan
                </th>

                <th className='px-6 py-4 font-semibold text-slate-600'>
                  Nominal
                </th>

                <th className='px-6 py-4 font-semibold text-slate-600'>
                  Tenor (bulan)
                </th>

                <th className='px-6 py-4 font-semibold text-slate-600'>
                  Cicilan / Bulan
                </th>

                <th className='px-6 py-4 font-semibold text-slate-600'>
                  Tanggal Pengajuan
                </th>

                <th className='px-6 py-4 font-semibold text-slate-600'>
                  Status
                </th>

                <th className='px-6 py-4 font-semibold text-slate-600'>
                  Aksi
                </th>
              </tr>
            </thead>
            
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className=''
                  >
                    Memuat data pengajuan...
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className=''
                  >
                    Belum ada pengajuan.
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr
                    key={client.id}
                    className=''
                  >
                    <td
                      className='px-6 py-4 font-medium text-slate-900'
                    >
                      {client.nama_lengkap}
                    </td>

                    <td
                      className='px-6 py-4 font-medium text-slate-600'
                    >
                      {client.tipe_pengajuan}
                    </td>

                    <td
                      className='px-6 py-4 font-medium text-slate-600'
                    >
                      Rp{" "} 
                      {Number(
                          client.nominal
                      ).toLocaleString("id-ID")}
                    </td>

                    <td
                      className='px-6 py-4 font-medium text-slate-600'
                    >
                      {client.tenor}
                    </td>

                    <td
                      className='px-6 py-4 font-medium text-slate-600'
                    >
                      Rp{" "} 
                      {Number(
                          client.tagihan_perbulan
                      ).toLocaleString("id-ID")}
                    </td>

                    <td
                      className='px-6 py-4 font-medium text-slate-600'
                    >
                      {new Date(client.tanggal_pengajuan).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>

                    <td
                      className='px-6 py-4 font-medium text-slate-600'
                    >
                      {client.status}
                    </td>

                    <td
                      className='px-6 py-4 text-right'
                    >
                      <ApplicationActions clientID={client.id} updateClient={updateClientStatus} status={client.status}/>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
    </div>
  )
}