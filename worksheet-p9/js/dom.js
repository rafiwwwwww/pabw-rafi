// dom.js — satu-satunya berkas yang menyentuh halaman.
import {
  judulHalaman,
  profil,
  daftarTugas,
  labelPrioritas,
  formatTanggal,
  saringTugas,
  buatTugasBaru,
} from "./app.js";

// ---------- Lembar A: pilih elemen (semuanya diuji tidak null) ----------
const wadah = document.querySelector("#daftar");
const barisFilter = document.querySelector("#filter");
const kosong = document.querySelector("#kosong");
const formTugas = document.querySelector("#form-tugas");
const kolomNama = document.querySelector("#nama-tugas");
const kolomMataKuliah = document.querySelector("#mata-kuliah");
const kolomTenggat = document.querySelector("#tenggat");
const tombolKirim = formTugas.querySelector("button[type='submit']");

// ---------- Keadaan halaman ----------
let semuaTugas = [...daftarTugas]; // salinan, supaya data dari app.js tidak ikut berubah
let kategoriAktif = "semua";
let sudahDicoba = false;           // jadi true setelah pengguna menekan Simpan sekali

// ---------- Lembar B: menyusun kartu dari data ----------
function buatElemen(tag, teks, kelas) {
  const elemen = document.createElement(tag);
  elemen.textContent = teks;         // teks biasa, bukan HTML
  if (kelas) elemen.className = kelas;
  return elemen;
}

function buatKartu({ judul, mataKuliah, tenggat, prioritas }) {
  const kartu = document.createElement("li");
  kartu.className = "kartu";

  const waktu = buatElemen("time", formatTanggal(tenggat));
  waktu.dateTime = tenggat;
  const barisTenggat = buatElemen("p", "Tenggat: ");
  barisTenggat.append(waktu);

  kartu.append(
    buatElemen("h3", judul),
    buatElemen("p", mataKuliah, "kartu-mk"),
    barisTenggat,
    buatElemen("p", labelPrioritas[prioritas] ?? labelPrioritas.biasa, `lencana lencana-${prioritas}`),
  );
  return kartu;
}

// ---------- Lembar D: satu fungsi render ----------
function render(daftar) {
  wadah.textContent = "";            // 1. kosongkan lebih dulu
  if (daftar.length === 0) {         // 2. periksa keadaan kosong
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;
  const fragmen = document.createDocumentFragment();
  daftar.forEach((tugas) => fragmen.append(buatKartu(tugas)));
  wadah.append(fragmen);             // 3. isi ulang, halaman digambar sekali
}

function tandaiTombolAktif(kategori) {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    const aktif = tombol.dataset.kategori === kategori;
    tombol.classList.toggle("aktif", aktif);
    tombol.setAttribute("aria-pressed", String(aktif));
  });
}

// Setiap perubahan data atau filter lewat sini, jadi render dipanggil tepat sekali.
function tampilkan(kategori) {
  kategoriAktif = kategori;
  tandaiTombolAktif(kategoriAktif);
  render(saringTugas(semuaTugas, kategoriAktif));
}

// ---------- Lembar C: satu pendengar di induk untuk semua tombol filter ----------
barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return;               // klik di luar tombol, abaikan
  tampilkan(tombol.dataset.kategori);
});

// ---------- Lembar D: validasi form ----------
const aturanKolom = [
  { kolom: kolomNama, sah: (nilai) => nilai.trim().length >= 3 },
  { kolom: kolomMataKuliah, sah: (nilai) => nilai.trim() !== "" },
  { kolom: kolomTenggat, sah: (nilai) => nilai !== "" },
];

function periksaKolom({ kolom, sah }) {
  const layak = sah(kolom.value);
  kolom.closest(".form-kolom").classList.toggle("galat", !layak);
  if (layak) {
    kolom.removeAttribute("aria-invalid");
  } else {
    kolom.setAttribute("aria-invalid", "true");
  }
  return layak;
}

const semuaLayak = () => aturanKolom.every(({ kolom, sah }) => sah(kolom.value));

// Satu pendengar input di form: pesan galat hilang begitu isinya layak.
formTugas.addEventListener("input", (event) => {
  const aturan = aturanKolom.find(({ kolom }) => kolom === event.target);
  if (!aturan || !sudahDicoba) return;
  periksaKolom(aturan);
  tombolKirim.disabled = !semuaLayak();
});

formTugas.addEventListener("submit", (event) => {
  event.preventDefault();            // baris pertama: halaman tidak dimuat ulang
  sudahDicoba = true;

  const bermasalah = aturanKolom.filter((aturan) => !periksaKolom(aturan));
  tombolKirim.disabled = bermasalah.length > 0;
  if (bermasalah.length > 0) {
    bermasalah[0].kolom.focus();     // arahkan ke kolom pertama yang perlu diperbaiki
    return;
  }

  semuaTugas = [
    ...semuaTugas,
    buatTugasBaru({
      judul: kolomNama.value.trim(),
      mataKuliah: kolomMataKuliah.value.trim(),
      tenggat: kolomTenggat.value,
    }),
  ];
  formTugas.reset();
  sudahDicoba = false;
  tampilkan("semua");                // tugas baru berkategori "lainnya", tampilkan semuanya
});

// ---------- Isi halaman pertama kali ----------
document.title = judulHalaman;
document.querySelector("h1").textContent = judulHalaman;
document.querySelector("#tentang p").textContent =
  `${profil.nama} · NIM: ${profil.nim} · ${profil.tahun}`;
tampilkan("semua");