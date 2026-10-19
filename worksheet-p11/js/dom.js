import { judulHalaman, profil, buatPerkenalan, formatKeahlian, saring } from './data.js';

const wadah = document.querySelector('#daftar');
const barisFilter = document.querySelector('#filter');
const kosong = document.querySelector('#kosong');
const muatEl = document.querySelector('#muat');
const formTugas = document.querySelector('#form-tugas');
const kolomNama = document.querySelector('#nama-tugas');
const kolomMataKuliah = document.querySelector('#mata-kuliah');
const kolomTenggat = document.querySelector('#tenggat');
const tombolKirim = formTugas.querySelector("button[type='submit']");

const labelPrioritas = {
  tinggi: 'Prioritas Tinggi',
  sedang: 'Prioritas Sedang',
  biasa: 'Prioritas Biasa',
};

const formatTanggal = (iso) =>
  new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

// ---------- Kartu ----------
function buatElemen(tag, teks, kelas) {
  const elemen = document.createElement(tag);
  elemen.textContent = teks;           // teks biasa, bukan HTML
  if (kelas) elemen.className = kelas;
  return elemen;
}

export function buatKartu(proyek, favorit) {
  const { id, judul, mataKuliah, tenggat, prioritas } = proyek;
  const kartu = document.createElement('li');
  kartu.className = 'kartu';

  const waktu = buatElemen('time', formatTanggal(tenggat));
  waktu.dateTime = tenggat;
  const barisTenggat = buatElemen('p', 'Tenggat: ');
  barisTenggat.append(waktu);

  const disukai = favorit.includes(id);
  const tombol = buatElemen('button', disukai ? '★' : '☆', 'favorit');
  tombol.type = 'button';
  tombol.dataset.id = id;
  tombol.setAttribute('aria-pressed', String(disukai));
  tombol.setAttribute('aria-label', `Tandai ${judul} sebagai favorit`);

  kartu.append(
    buatElemen('h3', judul),
    buatElemen('p', mataKuliah, 'kartu-mk'),
    barisTenggat,
    buatElemen('p', labelPrioritas[prioritas] ?? labelPrioritas.biasa, `lencana lencana-${prioritas}`),
    tombol,
  );
  return kartu;
}

// ---------- Render dari state ----------
function tandaiTombolAktif(kategoriAktif) {
  barisFilter.querySelectorAll('button').forEach((tombol) => {
    const aktif = tombol.dataset.kategori === kategoriAktif;
    tombol.classList.toggle('aktif', aktif);
    tombol.setAttribute('aria-pressed', String(aktif));
  });
}

export function render(state) {
  wadah.textContent = '';                                            // 1. kosongkan
  tandaiTombolAktif(state.kategoriAktif);
  const tampil = saring(state.daftarProyek, state.kategoriAktif);    // dari data.js
  if (tampil.length === 0) {                                         // 2. keadaan kosong
    kosong.textContent =
      state.kategoriAktif === 'semua'
        ? 'Belum ada tugas. Tambahkan lewat form Tambah Tugas.'
        : 'Belum ada tugas di kategori ini. Coba pilih kategori lain atau tambahkan tugas baru.';
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;
  const fragmen = document.createDocumentFragment();                 // 3. isi ulang
  tampil.forEach((item) => fragmen.append(buatKartu(item, state.favorit)));
  wadah.append(fragmen);
}

// ---------- Keadaan antarmuka ----------
export function aturMemuat(aktif) {
  muatEl.hidden = !aktif;
}

export function tampilkanGalat(pesan) {
  wadah.textContent = '';
  kosong.textContent = pesan;          // elemen pesan yang sama, isinya berbeda
  kosong.hidden = false;
}

export function isiIdentitas() {
  document.title = judulHalaman;
  document.querySelector('h1').textContent = judulHalaman;
  const kaki = document.querySelector('#tentang p');
  kaki.textContent = `${profil.nama} · NIM: ${profil.nim} · ${profil.tahun}`;
  kaki.title = `${buatPerkenalan(profil)} | ${formatKeahlian(profil.keahlian)}`;
}

// ---------- Form: pemeriksaan dan tampilan galat per kolom ----------
const aturanKolom = [
  { kolom: kolomNama, sah: (nilai) => nilai.trim().length >= 3 },
  { kolom: kolomMataKuliah, sah: (nilai) => nilai.trim() !== '' },
  { kolom: kolomTenggat, sah: (nilai) => nilai !== '' },
];

function periksaKolom({ kolom, sah }) {
  const layak = sah(kolom.value);
  kolom.closest('.form-kolom').classList.toggle('galat', !layak);
  if (layak) {
    kolom.removeAttribute('aria-invalid');
  } else {
    kolom.setAttribute('aria-invalid', 'true');
  }
  return layak;
}

export function periksaSatuKolom(elemen) {
  const aturan = aturanKolom.find(({ kolom }) => kolom === elemen);
  if (aturan) periksaKolom(aturan);
}

export function periksaSemuaKolom() {      // mengembalikan kolom yang bermasalah
  return aturanKolom.filter((aturan) => !periksaKolom(aturan)).map(({ kolom }) => kolom);
}

export const semuaLayak = () => aturanKolom.every(({ kolom, sah }) => sah(kolom.value));

export function aturTombolKirim(nonaktif) {
  tombolKirim.disabled = nonaktif;
}

export function bacaForm() {
  return {
    judul: kolomNama.value.trim(),
    mataKuliah: kolomMataKuliah.value.trim(),
    tenggat: kolomTenggat.value,
  };
}

export function kosongkanForm() {
  formTugas.reset();
}