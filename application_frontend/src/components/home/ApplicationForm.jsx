import { useState } from 'react'

export const ApplicationForm = ({ onSubmit }) => {
    const defaultForm = {
        nama_lengkap: "",
        tipe_pengajuan: "",
        nominal: "",
        tenor: "",
        pendapatan_bulanan: "",
        catatan: "",
    };

    const [dataForm, setDataForm] = useState(defaultForm);

    /**
     * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} e
     */
    const handleChange = (e) => {
        const {name, value} = e.target;
        setDataForm(prev => ({...prev, [name]: value}));
    };

    /**
     * 
     * @param {React.SubmitEvent<HTMLFormElement>} e 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const request = {
            ...dataForm,
            nominal: Number(dataForm.nominal),
            tenor: Number(dataForm.tenor),
            pendapatan_bulanan: Number(dataForm.pendapatan_bulanan),
        };

        const res = await onSubmit(request);
        if (res) {
            setDataForm(defaultForm);
        }
    }

    console.log(dataForm)

    return (
        <div className='rounded-xl border border-slate-200 bg-white p-6 shadow'>
            <div className='mb-6'>
                <h2 className='text-lg font-semibold text-slate-900'>
                    Tambah Pengajuan
                </h2>

                <p className='mt-1 text-sm text-slate-500'>
                    Masukkan informasi pengajuan pembiayaan nasabah.
                </p>
            </div>

            <form className='space-y-6' onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                    <div>
                        <label
                            htmlFor='nama_lengkap'
                            className='mb-2 block text-sm font-medium text-slate-700'
                        >
                            Nama Lengkap
                        </label>
                        
                        <input 
                            id='nama_lengkap'
                            name='nama_lengkap'
                            type='text'
                            placeholder='Masukkan Nama Lengkap'
                            className='w-full rounded-lg border border-slate-300 px-4 py-2.5'
                            onChange={handleChange}
                            value={dataForm.nama_lengkap}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='tipe_pengajuan'
                            className='mb-2 block text-sm font-medium text-slate-700'
                        >
                            Tipe Pengajuan
                        </label>
                        
                        <select
                            id='tipe_pengajuan'
                            name='tipe_pengajuan'
                            className='w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200'
                            onChange={handleChange}
                            value={dataForm.tipe_pengajuan}
                        >
                            <option value={""}>Pilih Tipe Pengajuan</option>

                            <option value={"MOTOR"}>Motor</option>
                            <option value={"MOBIL"}>Mobil</option>
                            <option value={"MULTIGUNA"}>Multiguna</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor='nominal'
                            className='mb-2 block text-sm font-medium text-slate-700'
                        >
                            Nominal Pengajuan
                        </label>
                        
                        <input 
                            id='nominal'
                            name='nominal'
                            type='number'
                            min={1}
                            placeholder='Masukkan Nominal (Contoh: 1.000.000)'
                            className='w-full rounded-lg border border-slate-300 px-4 py-2.5'
                            onChange={handleChange}
                            value={dataForm.nominal}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='tenor'
                            className='mb-2 block text-sm font-medium text-slate-700'
                        >
                            Tenor
                        </label>
                        
                        <input 
                            id='tenor'
                            name='tenor'
                            type='number'
                            min={1}
                            placeholder='Masukkan Tenor (Contoh: 12)'
                            className='w-full rounded-lg border border-slate-300 px-4 py-2.5'
                            onChange={handleChange}
                            value={dataForm.tenor}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='pendapatan_bulanan'
                            className='mb-2 block text-sm font-medium text-slate-700'
                        >
                            Pendapatan Bulanan 
                        </label>
                        
                        <input 
                            id='pendapatan_bulanan'
                            name='pendapatan_bulanan'
                            type='number'
                            placeholder='Masukkan Pendapatan (minimal: 1.000.000)'
                            min={1}
                            className='w-full rounded-lg border border-slate-300 px-4 py-2.5'
                            onChange={handleChange}
                            value={dataForm.pendapatan_bulanan}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='catatan'
                            className='mb-2 block text-sm font-medium text-slate-700'
                        >
                            Catatan 
                        </label>
                        
                        <textarea 
                            id='catatan'
                            name='catatan'
                            rows={3}
                            placeholder='Tambahkan catatan jika diperlukan'
                            className='w-full rounded-lg border border-slate-300 px-4 py-2.5'
                            onChange={handleChange}
                            value={dataForm.catatan}
                        />
                    </div>
                </div>

                <div>
                    <button
                        type='submit'
                        className='rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition cursor-pointer hover:bg-slate-700'
                    >
                        Simpan Pengajuan
                    </button>
                </div>
            </form>
        </div>
    );
}