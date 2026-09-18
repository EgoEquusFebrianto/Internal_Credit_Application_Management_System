<?php

namespace App\Enums;

enum StatusPengajuan: string
{
    case DISETUJUI = 'DISETUJUI';
    case DITOLAK = 'DITOLAK';
    case PENDING = 'PENDING';
}
