// data.js — sisa data dari P8 dan fungsi murni. Tidak menyentuh halaman, tidak punya keadaan.

export const judulHalaman = 'Tugas & Tenggat Saya';

export const profil = {
  nama: 'Rafie Fachrullah Malah',
  nim: '23523253',
  peran: 'Mahasiswa Informatika yang belajar front-end',
  tahun: 2026,
  keahlian: ['HTML', 'CSS', 'JavaScript'],
};

export function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

export const formatKeahlian = (daftar) => daftar.join(' · ');

// Fungsi murni: mengembalikan daftar baru, daftar asli tidak diubah.
export function saring(daftar, kategori) {
  return daftar.filter((proyek) => kategori === 'semua' || proyek.kategori === kategori);
}