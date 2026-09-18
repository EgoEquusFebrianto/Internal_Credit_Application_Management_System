<?php

namespace App\Http\Resources;

use App\Models\Client;
use App\Support\InstallmentCalculator;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Client
 */
class ClientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $calculator = app(InstallmentCalculator::class);

        return [
            'id' => $this->id,
            'nama_lengkap' => $this->nama_lengkap,
            'tipe_pengajuan' => $this->tipe_pengajuan,
            'nominal' => $this->nominal,
            'tenor' => $this->tenor,
            'pendapatan_bulanan' => $this->pendapatan_bulanan,
            'catatan' => $this->catatan,
            'tagihan_perbulan' => $calculator->tagihanBulanan(
                $this->nominal,
                $this->tenor
            ),
            'tanggal_pengajuan' => $this->created_at,
            'status' => $this->status,
        ];
    }
}