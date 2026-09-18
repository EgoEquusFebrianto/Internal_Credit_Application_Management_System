import { useNavigate } from 'react-router-dom';

/**
 * @import {Pengajuan} from '../../features/client/types/Types'
 * 
 * @typedef {Object} ApplicationTableProps
 * @property {Pengajuan} clientData
 */

/**
 * 
 * @param {ApplicationTableProps} props
 * @returns 
 */
export const ClientDetailCard = ({clientData}) => {
    const navigate = useNavigate();
    const tanggalPengajuan = new Date(clientData?.tanggal_pengajuan).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow">
          <div className="grid gap-6 md:grid-cols-2">
            <div >
              <p className='text-sm text-slate-500'>
                Nama Nasabah
              </p>

              <p className='mt-1 font-medium text-slate-900'>
                {clientData?.nama_lengkap}
              </p>
            </div>

            <div >
              <p className='text-sm text-slate-500'>
                Tipe pengajuan
              </p>

              <p className='mt-1 font-medium text-slate-900'>
                {clientData?.tipe_pengajuan}
              </p>
            </div>

            <div >
              <p className='text-sm text-slate-500'>
                Nominal Pengajuan
              </p>

              <p className='mt-1 font-medium text-slate-900'>
                RP {Number(clientData?.nominal).toLocaleString("id-ID")}
              </p>
            </div>

            <div >
              <p className='text-sm text-slate-500'>
                Tenor
              </p>

              <p className='mt-1 font-medium text-slate-900'>
                {clientData?.tenor} Bulan
              </p>
            </div>

            <div >
              <p className='text-sm text-slate-500'>
                Pendapatan Bulanan Nasabah
              </p>

              <p className='mt-1 font-medium text-slate-900'>
                Rp {Number(clientData?.pendapatan_bulanan).toLocaleString("id-ID")}
              </p>
            </div>

            <div >
              <p className='text-sm text-slate-500'>
                Cicilan Perbulan
              </p>

              <p className='mt-1 font-medium text-slate-900'>
                RP {Number(clientData?.tagihan_perbulan).toLocaleString("id-ID")}
              </p>
            </div>

            <div >
              <p className='text-sm text-slate-500'>
                Tanggal Pengajuan
              </p>

              <p className='mt-1 font-medium text-slate-900'>
                {tanggalPengajuan}
              </p>
            </div>

            <div >
              <p className='text-sm text-slate-500'>
                Status
              </p>

              <p className='mt-1 font-medium text-slate-900'>
                {clientData?.status}
              </p>
            </div>

            <div >
              <p className='text-sm text-slate-500'>
                Catatan
              </p>

              <p className='mt-1 font-medium text-slate-900'>
                {clientData?.catatan || "-"}
              </p>
            </div>

            <div className=''>
              <button
                type='button'
                onClick={() => navigate("/")}
                className='bg-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300 cursor-pointer'
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
    );
}
