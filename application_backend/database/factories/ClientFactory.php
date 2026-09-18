<?php

namespace Database\Factories;

use App\Enums\StatusPengajuan;
use App\Enums\TipePengajuan;
use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Client>
 */
class ClientFactory extends Factory
{    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_lengkap' => fake()->name(),
            'tipe_pengajuan' => TipePengajuan::MOTOR,
            'nominal' => 10_000_000,
            'tenor' => 12,
            'pendapatan_bulanan' => 5_000_000,
            'catatan' => null,
            'status' => StatusPengajuan::PENDING,
        ];
    }
}
