<?php

namespace App\Support;

class InstallmentCalculator
{
    private const BUNGA_TAHUNAN = 0.06;

    public function tagihanBulanan(int $nominal, int $tenor): int
    {
        $total = $nominal * (1 + self::BUNGA_TAHUNAN * ($tenor / 12));

        return $total / $tenor;
    }
}