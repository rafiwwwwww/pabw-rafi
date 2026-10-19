// state.js — satu objek keadaan, fungsi pengubahnya, dan penyimpanan di localStorage.
import { render } from './dom.js';

const KUNCI = 'pabw-p11';
const VERSI = 2;

export const state = {
  daftarProyek: [],       // diisi dari server oleh isiProyek(), tidak disimpan
  kategoriAktif: 'semua', // disimpan
  favorit: [],            // disimpan: daftar id proyek
  formDicoba: false,      // sudah menekan Simpan sekali? tidak disimpan
};

// ---------- Simpan dan muat ----------
export function simpan(state) {
  const isi = { versi: VERSI, kategoriAktif: state.kategoriAktif, favorit: state.favorit };
  try {
    localStorage.setItem(KUNCI, JSON.stringify(isi));
  } catch {
    // penyimpanan penuh atau diblokir: halaman tetap bekerja tanpa mengingat
  }
}

export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI));
    if (isi?.versi !== VERSI) {
      localStorage.removeItem(KUNCI);     // bentuk lama atau kosong: buang
      return null;
    }
    return isi;
  } catch {
    localStorage.removeItem(KUNCI);       // isi rusak: buang
    return null;
  }
}

export function pulihkan(isi) {           // dipanggil sekali dari mulai() di app.js
  if (!isi) return;                       // kunjungan pertama: nilai bawaan tetap
  state.kategoriAktif = isi.kategoriAktif ?? 'semua';
  state.favorit = Array.isArray(isi.favorit) ? isi.favorit : [];
}

// ---------- Fungsi pengubah: satu pintu masuk setiap perubahan ----------
export function isiProyek(daftar) {
  state.daftarProyek = daftar;
  render(state);
}

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai;
  simpan(state);
  render(state);
}

export function tambahFavorit(id) {
  if (state.favorit.includes(id)) return;
  state.favorit = [...state.favorit, id];   // salinan baru, bukan push
  simpan(state);
  render(state);
}

export function tambahProyek({ judul, mataKuliah, tenggat }) {
  const idBaru = Math.max(0, ...state.daftarProyek.map((p) => p.id)) + 1;
  state.daftarProyek = [
    ...state.daftarProyek,
    { id: idBaru, judul, mataKuliah, kategori: 'lainnya', tenggat, prioritas: 'biasa', selesai: false },
  ];
  state.kategoriAktif = 'semua';            // proyek baru berkategori "lainnya"; tampilkan semuanya
  simpan(state);
  render(state);
}

export function tandaiFormDicoba(nilai) {
  state.formDicoba = nilai;
}

export function aturUlang() {
  localStorage.removeItem(KUNCI);
  state.kategoriAktif = 'semua';
  state.favorit = [];
  render(state);
}