<?php

namespace App\Models;

use App\Enums\StatusPengajuan;
use App\Enums\TipePengajuan;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_lengkap',
        'tipe_pengajuan',
        'nominal',
        'tenor',
        'pendapatan_bulanan',
        'status',
        'catatan',
    ];

    protected function casts(): array
    {
        return [
            'tipe_pengajuan' => TipePengajuan::class,
            'status' => StatusPengajuan::class,
        ];
    }
}