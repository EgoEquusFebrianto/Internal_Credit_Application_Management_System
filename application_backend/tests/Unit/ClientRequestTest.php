<?php

use App\Http\Requests\ClientRequest;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class ClientRequestTest extends TestCase
{
    private function validate(array $data)
    {
        $request = new ClientRequest();

        return Validator::make(
            $data,
            $request->rules(),
            $request->messages()
        );
    }

    public function test_validasi_data_nasabah_yang_valid(): void
    {
        $validator = $this->validate([
            'nama_lengkap' => 'Febrianto Kudadiri',
            'tipe_pengajuan' => 'MOTOR',
            'nominal' => 10000000,
            'tenor' => 12,
            'pendapatan_bulanan' => 5000000,
            'catatan' => 'Pengajuan kendaraan untuk kebutuhan pribadi.',
        ]);

        $this->assertFalse($validator->fails());
    }

    public function test_tipe_pengajuan_harus_tipe_enum_yang_tepat(): void
    {
        $validator = $this->validate([
            'nama_lengkap' => 'Febrianto Kudadiri',
            'tipe_pengajuan' => 'TRUK',
            'nominal' => 10000000,
            'tenor' => 12,
            'pendapatan_bulanan' => 5000000,
        ]);
        
        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey(
            'tipe_pengajuan', 
            $validator->errors()->toArray()
        );
    }

    public function test_tenor_tidak_boleh_lebih_dari_24_bulan(): void
    {
        $validator = $this->validate([
            'nama_lengkap' => 'Febrianto Kudadiri',
            'tipe_pengajuan' => 'MOTOR',
            'nominal' => 10000000,
            'tenor' => 25,
            'pendapatan_bulanan' => 5000000,
        ]);

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey(
            'tenor', 
            $validator->errors()->toArray()
        );
    }

    public function test_pendapatan_bulanan_tidak_boleh_dibawah_1_juta(): void
    {
        $validator = $this->validate([
            'nama_lengkap' => 'Febrianto Kudadiri',
            'tipe_pengajuan' => 'MOTOR',
            'nominal' => 10000000,
            'tenor' => 12,
            'pendapatan_bulanan' => 999999,
        ]);

        $this->assertTrue($validator->fails());
        $this->assertSame(
            'Nasabah belum dapat mengajukan pinjaman.',
            $validator->errors()->first('pendapatan_bulanan')
        );
    }
}