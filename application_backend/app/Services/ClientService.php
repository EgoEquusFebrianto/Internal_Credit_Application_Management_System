<?php

namespace App\Services;

use App\Enums\StatusPengajuan;
use App\Models\Client;
use Illuminate\Support\Str;

use DomainException;

class ClientService
{
    public function create(array $data)
    {
        $nama = Str::squish($data['nama_lengkap']);

        $jumlahPengajuan = Client::whereRaw(
            'Lower(nama_lengkap) = ?', 
            [Str::lower($nama)]
        )->count();

        if ($jumlahPengajuan >= 3) {
            throw new DomainException('Nasabah sudah mencapai maksimal 3 pengajuan.');
        }

        return Client::create([
            'nama_lengkap' => $data['nama_lengkap'],
            'tipe_pengajuan' => $data['tipe_pengajuan'],
            'nominal' => $data['nominal'],
            'tenor' => $data['tenor'],
            'pendapatan_bulanan' => $data['pendapatan_bulanan'],
            'status' => StatusPengajuan::PENDING,
            'catatan' => $data['catatan'] ?? null,
        ]);
    }

    public function updateStatus(
        Client $client,
        StatusPengajuan $status
    )
    {
        if (
            $status === StatusPengajuan::DISETUJUI && 
            $client->nominal > 200_000_000
        ) {
            throw new DomainException('Pengajuan melebihi batas maksimal Rp 200.000.000.');
        }

        $client->update([
            'status' => $status,
        ]);

        return $client->refresh();
    }
}