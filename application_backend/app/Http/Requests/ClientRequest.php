<?php

namespace App\Http\Requests;

use App\enums\TipePengajuan;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_lengkap' => ['required', 'string', 'max:150'],
            'tipe_pengajuan' => ['required', Rule::enum(TipePengajuan::class)],
            'nominal' => ['required', 'integer', 'min:1'],
            'tenor' => ['required', 'integer', 'min:1', 'max:24'],
            'pendapatan_bulanan' => ['required', 'integer', 'min:1000000'],
            'catatan' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'nama_lengkap.required' => 'Nama lengkap wajib diisi.',
            'nama_lengkap.max' => 'Nama lengkap maksimal 150 karakter.',

            'tipe_pengajuan.required' => 'Tipe pengajuan wajib dipilih.',
            'tipe_pengajuan.in' => 'Tipe pengajuan harus berupa Motor, Mobil, atau Multiguna.',

            'nominal.required' => 'Nominal pengajuan wajib diisi.',
            'nominal.min' => 'Nominal pengajuan tidak kurang dari 1.',
            // 'nominal.max' => 'Nominal pengajuan maksimal Rp200.000.000.',

            'tenor.required' => 'Tenor wajib diisi.',
            'tenor.min' => 'Tenor minimal 1 bulan.',
            'tenor.max' => 'Tenor maksimal 24 bulan.',

            'pendapatan_bulanan.required' => 'Pendapatan bulanan wajib diisi.',
            'pendapatan_bulanan.min' => 'Nasabah belum dapat mengajukan pinjaman.',
        ];
    }
}
