# Backend

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

Folder `backend/` berisi REST API yang dibangun menggunakan Laravel.

Dokumentasi mengenai fitur, business rules, API, instalasi, dan cara menjalankan aplikasi secara keseluruhan tersedia pada [README utama](../README.md).

## Struktur

```text
backend/
├── app/
│   ├── Enums/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Requests/
│   │   └── Resources/
│   ├── Models/
│   ├── Services/
│   └── Support/
│
├── database/
│   ├── factories/
│   └── migrations/
│
├── routes/
│   └── api.php
│
└── tests/
    ├── Feature/
    └── Unit/
```

## Penjelasan

### `app/`

Berisi source code utama aplikasi Laravel.

#### `app/Enums/`

Berisi enum yang digunakan untuk nilai yang memiliki pilihan tetap.

- `StatusPengajuan.php` — mendefinisikan status pengajuan (`PENDING`, `DISETUJUI`, `DITOLAK`).
- `TipePengajuan.php` — mendefinisikan tipe pengajuan (`MOTOR`, `MOBIL`, `MULTIGUNA`).

#### `app/Http/Controllers/`

Berisi controller yang menerima HTTP request dan mengatur proses request sebelum mengembalikan response.

- `ClientController.php` — menangani endpoint terkait pengajuan nasabah.

#### `app/Http/Requests/`

Berisi Form Request untuk validasi data yang diterima dari API.

- `ClientRequest.php` — validasi ketika membuat pengajuan.
- `UpdateStatusClientRequest.php` — validasi ketika mengubah status pengajuan.

#### `app/Http/Resources/`

Berisi API Resource untuk menentukan struktur data yang dikembalikan melalui API.

- `ClientResource.php` — mengubah data `Client` menjadi response JSON yang digunakan frontend.

#### `app/Models/`

Berisi model Eloquent yang merepresentasikan data pada database.

- `Client.php` — model untuk data pengajuan pada tabel `clients`.

#### `app/Services/`

Berisi business logic utama aplikasi sehingga tidak ditempatkan langsung pada controller.

- `ClientService.php` — menangani proses pembuatan pengajuan dan perubahan status serta pemeriksaan aturan bisnis terkait.

#### `app/Support/`

Berisi class pendukung dengan tanggung jawab khusus.

- `InstallmentCalculator.php` — menghitung estimasi cicilan per bulan berdasarkan nominal dan tenor.

---

### `database/`

Berisi komponen yang berkaitan dengan database.

#### `database/factories/`

Berisi factory untuk membuat data dummy atau data pengujian.

- `ClientFactory.php` — membuat data pengajuan untuk kebutuhan development dan testing.

#### `database/migrations/`

Berisi migration untuk mendefinisikan struktur tabel database.

---

### `routes/`

Berisi definisi route aplikasi.

#### `routes/api.php`

Mendefinisikan endpoint REST API yang digunakan frontend.

---

### `tests/`

Berisi automated test untuk backend.

#### `tests/Feature/`

Berisi pengujian terhadap behaviour aplikasi melalui HTTP/API dan business flow.

#### `tests/Unit/`

Berisi pengujian terhadap komponen secara terisolasi, seperti perhitungan cicilan.

---

## Prinsip Pembagian Tanggung Jawab

Secara sederhana, alur backend adalah:

```text
Route
  ↓
Controller
  ↓
Request Validation
  ↓
Service
  ↓
Model / Eloquent
  ↓
Database
  ↓
Resource
  ↓
JSON Response
```

Pembagian tersebut digunakan agar setiap bagian memiliki tanggung jawab yang jelas dan kode lebih mudah dipelihara.
