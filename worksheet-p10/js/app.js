import { ambilProyek } from './api.js';
import { render, pasangFilter, aturMemuat, tampilkanGalat, isiIdentitas } from './dom.js';


const judulHalaman = 'Tugas & Tenggat Saya';

const profil = {
  nama: 'Rafie Fachrullah Malah',
  nim: '23523253',
  peran: 'Mahasiswa Informatika yang belajar front-end',
  tahun: 2026,
  keahlian: ['HTML', 'CSS', 'JavaScript'],
};

async function muat() {
  aturMemuat(true);                        
  try {
    const daftar = await ambilProyek();    
    pasangFilter(daftar);                  
    render(daftar);                        
  } catch (galat) {
    tampilkanGalat('Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.');
    console.error(galat.message);          
  } finally {
    aturMemuat(false);
  }
}

isiIdentitas(judulHalaman, `${profil.nama} · NIM: ${profil.nim} · ${profil.tahun}`);
muat();                                    // dipanggil sekali saat halaman dibuka
