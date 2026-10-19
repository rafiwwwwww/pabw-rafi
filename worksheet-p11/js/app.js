import { ambilProyek } from './api.js';
import { isiProyek, pulihkan, muat } from './state.js';
import { tampilkanGalat, aturMemuat, isiIdentitas } from './dom.js';
import { pasangPendengar } from './events.js';

async function mulai() {
  isiIdentitas();
  pulihkan(muat());                 // pilihan terakhir, atau nilai bawaan
  pasangPendengar();                // klik filter, favorit, atur ulang, form
  aturMemuat(true);
  try {
    isiProyek(await ambilProyek()); // isiProyek memanggil render(state)
  } catch (galat) {
    tampilkanGalat('Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.');
    console.error(galat.message);   
  } finally {
    aturMemuat(false);
  }
}

mulai();