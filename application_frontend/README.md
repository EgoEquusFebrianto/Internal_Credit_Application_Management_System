# Frontend

Folder `frontend/` berisi antarmuka aplikasi yang dibangun menggunakan React dan JavaScript.

Dokumentasi mengenai fitur, business rules, instalasi, API, dan keseluruhan aplikasi tersedia pada [README utama](../README.md).

## Struktur

```text
frontend/
└── src/
    ├── components/
    │   ├── client_detail/
    │   └── home/
    ├── features/
    │   ├── api/
    │   └── client/
    ├── pages/
    ├── test/
    ├── utils/
    ├── App.jsx
    ├── main.jsx
    └── RootProvider.jsx
```

## Penjelasan

### `src/components/`

Berisi komponen UI yang digunakan oleh halaman aplikasi.

#### `components/home/`

Berisi komponen untuk halaman utama.

-`ApplicationForm.jsx` — form untuk membuat pengajuan baru.
-`ApplicationTable.jsx` — tabel untuk menampilkan daftar pengajuan.
-`ApplicationActions.jsx` — aksi approve, reject, dan detail pada setiap pengajuan.

#### `components/client_detail/`

Berisi komponen UI yang digunakan untuk menampilkan detail pengajuan nasabah.

---

### `src/features/`

Berisi logic yang dikelompokkan berdasarkan fitur atau tanggung jawab aplikasi.

#### `features/api/`

Berisi konfigurasi komunikasi HTTP dengan backend, termasuk konfigurasi Axios.

#### `features/client/`

Berisi logic yang berkaitan dengan data dan proses pengajuan nasabah.

Bagian ini mencakup service dan hook/context yang digunakan untuk mengambil, membuat, serta memperbarui data pengajuan.

---

### `src/pages/`

Berisi komponen yang merepresentasikan halaman aplikasi.

-`HomePage.jsx` — halaman utama yang berisi form dan daftar pengajuan.
-`ClientDetailPage.jsx` — halaman untuk melihat detail pengajuan berdasarkan ID.

---

### `src/test/`

Berisi konfigurasi dan automated test untuk frontend.

Test berfokus pada behaviour komponen yang penting, seperti behaviour `ApplicationForm`.

---

### `src/utils/`

Berisi utility function yang digunakan kembali oleh beberapa bagian aplikasi.

Contohnya adalah utility untuk menampilkan:

- Success alert.
- Error alert.
- Validation error.
- Confirmation dialog.

---

### `App.jsx`

Menjadi komponen utama aplikasi dan mendefinisikan routing menggunakan React Router.

---

### `main.jsx`

Menjadi entry point aplikasi React dan melakukan proses mounting aplikasi ke DOM.

---

### `RootProvider.jsx`

Berisi provider utama yang digunakan untuk menyediakan context atau state yang dibutuhkan oleh aplikasi.

---

## Prinsip Pembagian Tanggung Jawab

Secara sederhana, alur frontend adalah:

```text
Page
  ↓
Component
  ↓
Hook / Context
  ↓
Service
  ↓
Axios
  ↓
Laravel REST API
```

Dengan pembagian tersebut, komponen UI tidak perlu menangani detail komunikasi HTTP secara langsung.
