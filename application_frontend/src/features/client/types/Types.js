/**
 * @typedef {Object} Pengajuan
 * @property {number} id
 * @property {string} nama_lengkap
 * @property {string} tipe_pengajuan - ("MOTOR", "MOBIL", "MULTIGUNA")
 * @property {number} nominal
 * @property {number} tenor
 * @property {number} pendapatan_bulanan
 * @property {string|null} catatan
 * @property {number} tagihan_perbulan
 * @property {string} tanggal_pengajuan
 * @property {string} status - ("PENDING", "DISETUJUI", "DITOLAK")
 */

/**
 * @typedef {Object} CreatePengajuanRequest
 * @property {string} nama_lengkap
 * @property {string} tipe_pengajuan
 * @property {number} nominal
 * @property {number} tenor
 * @property {number} pendapatan_bulanan
 * @property {string|null} catatan
 */

/**
 * @typedef {Object} UpdateStatusRequest
 * @property {string} status
 */

/**
 * @typedef {Object} PengajuanResponse
 * @property {string} message
 * @property {Pengajuan[]} data
 */

/**
 * @typedef {Object} SinglePengajuanResponse
 * @property {string} message
 * @property {Pengajuan} data
 */

/**
 * @typedef {Object} ClientContextType
 * @property {Pengajuan[]} clients
 * @property {boolean} loading
 * @property {Error|null} error
 * @property {() => Promise<void>} getClients
 * @property {() => Promise<Pengajuan>} getClientDetail
 * @property {() => Promise<SinglePengajuanResponse>} createClient
 * @property {() => Promise<SinglePengajuanResponse>} updateClientStatus
 */

/**
 * @typedef {Object} ValidationErrors
 * @property {string} message
 * @property {Object} errors
 */

export {};