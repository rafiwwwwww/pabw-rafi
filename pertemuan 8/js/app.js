// ---------- Lembar B: data sebagai variabel ----------
const judulHalaman = "Tugas & Tenggat Saya";

const profil = {
  nama: "Rafie Fachrullah Malah",
  nim: "23523253",
  peran: "Mahasiswa Informatika yang belajar front-end",
  tahun: 2026,
  keahlian: ["HTML", "CSS", "JavaScript"],
};

const daftarTugas = [
  { judul: "Analisis Kebutuhan Teknologi", mataKuliah: "Manajemen Teknologi Informasi", tenggat: "2026-09-25", prioritas: "tinggi", selesai: true },
  { judul: "Laporan Sensor IoT", mataKuliah: "IoT / Wireless Sensor Networks", tenggat: "2026-09-28", prioritas: "sedang", selesai: true },
  { judul: "Studi Kasus Etika Profesi", mataKuliah: "Etika Profesi", tenggat: "2026-10-02", prioritas: "sedang", selesai: true },
  { judul: "Rencana Bisnis Kewirausahaan", mataKuliah: "Entrepreneurship / Kewirausahaan", tenggat: "2026-10-05", prioritas: "tinggi", selesai: false },
];

const jumlahTugas = daftarTugas.length;
const kalimat = `Nama saya ${profil.nama}, dan saya belajar ${profil.keahlian.length} hal.`;

// ---------- Lembar C: fungsi murni ----------
const buatPerkenalan = ({ nama, peran }) => `${nama} — ${peran}`;

const formatKeahlian = (daftar) => daftar.join(" · ");

const formatTanggal = (iso) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

const labelPrioritas = { tinggi: "Prioritas Tinggi", sedang: "Prioritas Sedang" };

const buatKartu = ({ judul, mataKuliah, tenggat, prioritas }) => `
  <li class="kartu">
    <h3>${judul}</h3>
    <p class="kartu-mk">${mataKuliah}</p>
    <p>Tenggat: <time datetime="${tenggat}">${formatTanggal(tenggat)}</time></p>
    <p class="lencana lencana-${prioritas}">${labelPrioritas[prioritas] ?? "Prioritas Biasa"}</p>
  </li>`;

// ---------- Isi halaman dari data ----------
document.title = judulHalaman;
document.querySelector("h1").textContent = judulHalaman;
document.querySelector(".katalogg").innerHTML = daftarTugas.map(buatKartu).join("");
document.querySelector("#tentang p").textContent =
  `${profil.nama} · NIM: ${profil.nim} · ${profil.tahun}`;

// ---------- Cek di Console ----------
console.log(kalimat);
console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));
console.log(profil.alamat?.kota ?? "alamat belum diisi");

// ---------- Lembar D: array methods ----------
console.table(profil.keahlian);
console.table(daftarTugas);

const prioritasTinggi = daftarTugas.filter((tugas) => tugas.prioritas === "tinggi");
console.table(prioritasTinggi);

const tugasEtika = daftarTugas.find((tugas) => tugas.judul === "Studi Kasus Etika Profesi");
console.log(tugasEtika);

const semuaJudul = daftarTugas.map((tugas) => tugas.judul);
console.log(semuaJudul.length === daftarTugas.length);

const urutTenggat = [...daftarTugas].sort((a, b) => b.tenggat.localeCompare(a.tenggat));
console.log(urutTenggat[0].judul, "|", daftarTugas[0].judul);