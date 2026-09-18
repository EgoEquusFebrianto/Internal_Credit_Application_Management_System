<?php

use App\Enums\StatusPengajuan;
use App\Models\Client;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClientControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_dapat_membuat_data_nasabah(): void
    {
        $request = [
            'nama_lengkap' => 'Febrianto Kudadiri',
            'tipe_pengajuan' => 'MOTOR',
            'nominal' => 10_000_000,
            'tenor' => 12,
            'pendapatan_bulanan' => 1_000_000,
            'catatan' => 'Pengajuan kendaraan.',
        ];

        $response = $this->postJson('/api/clients', $request);
        
        $response->assertStatus(201);
        $response->assertJsonPath(
            'data.nama_lengkap',
            'Febrianto Kudadiri'
        );
        $response->assertJsonPath(
            'data.status',
            'PENDING'
        );

        $this->assertDatabaseHas('clients', [
            'nama_lengkap' => 'Febrianto Kudadiri',
            'nominal' => 10_000_000,
            'tenor' => 12,
            'pendapatan_bulanan' => 1_000_000,
            'status' => 'PENDING',
        ]);
    }
    
    public function test_tolak_nasabah_dengan_pendapatan_dibawah_satu_juta(): void 
    {
        $request = [
            'nama_lengkap' => 'Febrianto Kudadiri',
            'tipe_pengajuan' => 'MOTOR',
            'nominal' => 10_000_000,
            'tenor' => 12,
            'pendapatan_bulanan' => 999_999,
        ];

        $response = $this->postJson('/api/clients', $request);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['pendapatan_bulanan']);
        $response->assertJsonPath(
            'errors.pendapatan_bulanan.0',
            'Nasabah belum dapat mengajukan pinjaman.'
        );

        $this->assertDatabaseCount('clients', 0);
    }

    public function test_tolak_nasabah_dengan_tenor_lebih_dari_24(): void 
    {
        $request = [
            'nama_lengkap' => 'Febrianto Kudadiri',
            'tipe_pengajuan' => 'MOTOR',
            'nominal' => 10_000_000,
            'tenor' => 25,
            'pendapatan_bulanan' => 5_000_000,
        ];

        $response = $this->postJson('/api/clients', $request);

        $response->dump();

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['tenor']);
        $response->assertJsonPath(
            'errors.tenor.0',
            'Tenor maksimal 24 bulan.'
        );

        $this->assertDatabaseCount('clients', 0);
    }

    public function test_nasabah_ditolak_jika_sudah_memiliki_tiga_pengajuan(): void
    {
        Client::factory()->count(3)->create([
            'nama_lengkap' => 'Febrianto Kudadiri',
        ]);

        $request = [
            'nama_lengkap' => '  FEBRIANTO    KUDADIRI  ',
            'tipe_pengajuan' => 'MOTOR',
            'nominal' => 12_000_000,
            'tenor' => 15,
            'pendapatan_bulanan' => 5_000_000,
        ];

        $response = $this->postJson('/api/clients', $request);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Nasabah sudah mencapai maksimal 3 pengajuan.',
        ]);

        $this->assertDatabaseCount('clients', 3);
    }

    public function test_pengajuan_dengan_nominal_lebih_dari_200_juta_tidak_dapat_diapprove(): void
    {
        /**
         * @var Client $client
         */
        $client = Client::factory()->create([
            'nominal' => 200_000_001,
            'status' => StatusPengajuan::PENDING,
        ]);

        $response = $this->patchJson("api/clients/{$client->id}", [
            'status' => "DISETUJUI",
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Pengajuan melebihi batas maksimal Rp 200.000.000.',
        ]);

        $this->assertDatabaseHas('clients', [
            'id' => $client->id,
            'nominal' => 200_000_001,
            'status' => 'PENDING',
        ]);
    }

    public function test_pengajuan_dengan_nominal_200_juta_dapat_diapprove(): void
    {
        /**
         * @var Client $client
         */
        $client = Client::factory()->create([
            'nominal' => 200_000_000,
            'status' => StatusPengajuan::PENDING,
        ]);

        $response = $this->patchJson("/api/clients/{$client->id}", [
            'status' => 'DISETUJUI',
        ]);

        $response->assertStatus(200);
        $response->assertJsonPath(
            'data.status',
            'DISETUJUI'
        );

        $this->assertDatabaseHas('clients', [
            'id' => $client->id,
            'nominal' => 200_000_000,
            'status' => 'DISETUJUI',
        ]);
    }
}