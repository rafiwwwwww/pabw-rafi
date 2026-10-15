
const wadah = document.querySelector('#daftar');
const barisFilter = document.querySelector('#filter');
const kosong = document.querySelector('#kosong');
const muatEl = document.querySelector('#muat');
const formTugas = document.querySelector('#form-tugas');
const kolomNama = document.querySelector('#nama-tugas');
const kolomMataKuliah = document.querySelector('#mata-kuliah');
const kolomTenggat = document.querySelector('#tenggat');
const tombolKirim = formTugas.querySelector("button[type='submit']");

let semuaTugas = [];          // diisi pasangFilter() dengan data dari server
let kategoriAktif = 'semua';
let sudahDicoba = false;      // jadi true setelah pengguna menekan Simpan sekali

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

function buatElemen(tag, teks, kelas) {
  const elemen = document.createElement(tag);
  elemen.textContent = teks;           
  if (kelas) elemen.className = kelas;
  return elemen;
}

export function buatKartu({ judul, mataKuliah, tenggat, prioritas }) {
  const kartu = document.createElement('li');
  kartu.className = 'kartu';

  const waktu = buatElemen('time', formatTanggal(tenggat));
  waktu.dateTime = tenggat;
  const barisTenggat = buatElemen('p', 'Tenggat: ');
  barisTenggat.append(waktu);

  kartu.append(
    buatElemen('h3', judul),
    buatElemen('p', mataKuliah, 'kartu-mk'),
    barisTenggat,
    buatElemen('p', labelPrioritas[prioritas] ?? labelPrioritas.biasa, `lencana lencana-${prioritas}`),
  );
  return kartu;
}

export function render(daftar) {
  wadah.textContent = '';              
  if (daftar.length === 0) {           
    kosong.textContent =
      kategoriAktif === 'semua'
        ? 'Belum ada tugas. Tambahkan lewat form Tambah Tugas.'
        : 'Belum ada tugas di kategori ini. Coba pilih kategori lain atau tambahkan tugas baru.';
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;
  const fragmen = document.createDocumentFragment();
  daftar.forEach((tugas) => fragmen.append(buatKartu(tugas)));
  wadah.append(fragmen);               
}

export function aturMemuat(aktif) {
  muatEl.hidden = !aktif;
}

export function tampilkanGalat(pesan) {
  wadah.textContent = '';
  kosong.textContent = pesan;        
  kosong.hidden = false;
}

export function isiIdentitas(judul, kaki) {
  document.title = judul;
  document.querySelector('h1').textContent = judul;
  document.querySelector('#tentang p').textContent = kaki;
}

function tandaiTombolAktif(kategori) {
  barisFilter.querySelectorAll('button').forEach((tombol) => {
    const aktif = tombol.dataset.kategori === kategori;
    tombol.classList.toggle('aktif', aktif);
    tombol.setAttribute('aria-pressed', String(aktif));
  });
}

function tampilkan(kategori) {
  kategoriAktif = kategori;
  tandaiTombolAktif(kategoriAktif);
  render(semuaTugas.filter((p) => kategori === 'semua' || p.kategori === kategori));
}

export function pasangFilter(daftar) {
  semuaTugas = [...daftar];            
  tandaiTombolAktif('semua');
  barisFilter.addEventListener('click', (event) => {
    const tombol = event.target.closest('button');
    if (!tombol) return;              
    tampilkan(tombol.dataset.kategori);
  });
}


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

const semuaLayak = () => aturanKolom.every(({ kolom, sah }) => sah(kolom.value));

formTugas.addEventListener('input', (event) => {
  const aturan = aturanKolom.find(({ kolom }) => kolom === event.target);
  if (!aturan || !sudahDicoba) return;
  periksaKolom(aturan);
  tombolKirim.disabled = !semuaLayak();
});

formTugas.addEventListener('submit', (event) => {
  event.preventDefault();             
  sudahDicoba = true;

  const bermasalah = aturanKolom.filter((aturan) => !periksaKolom(aturan));
  tombolKirim.disabled = bermasalah.length > 0;
  if (bermasalah.length > 0) {
    bermasalah[0].kolom.focus();       
    return;
  }

  semuaTugas = [
    ...semuaTugas,
    {
      id: Math.max(0, ...semuaTugas.map((t) => t.id)) + 1,
      judul: kolomNama.value.trim(),
      mataKuliah: kolomMataKuliah.value.trim(),
      kategori: 'lainnya',
      tenggat: kolomTenggat.value,
      prioritas: 'biasa',
      selesai: false,
    },
  ];
  formTugas.reset();
  sudahDicoba = false;
  tampilkan('semua');
});