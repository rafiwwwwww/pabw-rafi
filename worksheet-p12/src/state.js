import { reactive } from 'vue'

const KUNCI = 'pabw-p11'

export const state = reactive({
  kategoriAktif: 'semua',
  daftarProyek: [],
  favorit: [],
  memuat: true,
  galat: '',
})

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai
}

export function tambahFavorit(id) {
  state.favorit = state.favorit.includes(id)
    ? state.favorit.filter((x) => x !== id)
    : [...state.favorit, id]
}

export function aturUlang() {
  state.kategoriAktif = 'semua'
  state.favorit = []
}

export function isiProyek(daftar) {
  state.daftarProyek = daftar
}

export function simpan(nilai) {
  try {
    localStorage.setItem(
      KUNCI,
      JSON.stringify({
        kategoriAktif: nilai.kategoriAktif,
        favorit: nilai.favorit,
      })
    )
  } catch (e) {
    // penyimpanan penuh atau diblokir: abaikan
  }
}

export function muat() {
  try {
    const mentah = localStorage.getItem(KUNCI)
    return mentah ? JSON.parse(mentah) : null
  } catch (e) {
    localStorage.removeItem(KUNCI)   // simpanan rusak dibuang
    return null
  }
}

export function pulihkan(data) {
  if (!data) return
  if (typeof data.kategoriAktif === 'string') state.kategoriAktif = data.kategoriAktif
  if (Array.isArray(data.favorit)) state.favorit = data.favorit
}