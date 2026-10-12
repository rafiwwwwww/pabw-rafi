// app.js — data dan fungsi murni. File ini tidak menyentuh halaman.

export const judulHalaman = "Tugas & Tenggat Saya";

export const profil = {
  nama: "Rafie Fachrullah Malah",
  nim: "23523253",
  peran: "Mahasiswa Informatika yang belajar front-end",
  tahun: 2026,
  keahlian: ["HTML", "CSS", "JavaScript"],
};

export const daftarTugas = [
  { judul: "Analisis Kebutuhan Teknologi", mataKuliah: "Manajemen Teknologi Informasi", kategori: "bisnis", tenggat: "2026-09-25", prioritas: "tinggi", selesai: true },
  { judul: "Laporan Sensor IoT", mataKuliah: "IoT / Wireless Sensor Networks", kategori: "teknis", tenggat: "2026-09-28", prioritas: "sedang", selesai: true },
  { judul: "Studi Kasus Etika Profesi", mataKuliah: "Etika Profesi", kategori: "etika", tenggat: "2026-10-02", prioritas: "sedang", selesai: true },
  { judul: "Rencana Bisnis Kewirausahaan", mataKuliah: "Entrepreneurship / Kewirausahaan", kategori: "bisnis", tenggat: "2026-10-05", prioritas: "tinggi", selesai: false },
];

export const labelPrioritas = {
  tinggi: "Prioritas Tinggi",
  sedang: "Prioritas Sedang",
  biasa: "Prioritas Biasa",
};

export const buatPerkenalan = ({ nama, peran }) => `${nama} — ${peran}`;

export const formatKeahlian = (daftar) => daftar.join(" · ");

export const formatTanggal = (iso) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

// Mengembalikan array baru; "semua" berarti tidak ada yang disaring.
export const saringTugas = (daftar, kategori) =>
  daftar.filter((tugas) => kategori === "semua" || tugas.kategori === kategori);

// Tugas dari form belum punya kategori dan prioritas, jadi diberi nilai bawaan.
export const buatTugasBaru = ({ judul, mataKuliah, tenggat }) => ({
  judul,
  mataKuliah,
  kategori: "lainnya",
  tenggat,
  prioritas: "biasa",
  selesai: false,
});