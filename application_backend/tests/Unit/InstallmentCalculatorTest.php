<?php

use App\Support\InstallmentCalculator;
use Tests\TestCase;

class InstallmentCalculatorTest extends TestCase
{
    private InstallmentCalculator $calculator;

    protected function setUp(): void
    {
        parent::setUp();

        $this->calculator = new InstallmentCalculator();
    }
    
    /**
     * Misal: A meminjam dengan nominal 12 juta, dengan tenor 12 bulan dan asumsi bunga adalah 6% per tahun,
     * 
     * Maka:
     * 1. Bunga perbulan: 6% / 12 => 0.5 per bulan
     * 2. Bunga perbulan (rupiah): 0.5 x 12.000.000 => Rp 60.000
     * 
     * Sehingga, total angsuran perbulan: 1.000.000 + 60.000 = Rp 1.060.000
     * 
     * @return void
     */
    public function test_dapat_menghitung_tagihan_bulanan(): void
    {
        $hasil = $this->calculator->tagihanBulanan(12_000_000, 12);

        $this->assertSame(1_060_000, $hasil);
    }
}