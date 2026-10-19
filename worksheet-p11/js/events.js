import { state, pilihKategori, tambahFavorit, tambahProyek, tandaiFormDicoba, aturUlang } from './state.js';
import {
  periksaSatuKolom,
  periksaSemuaKolom,
  semuaLayak,
  aturTombolKirim,
  bacaForm,
  kosongkanForm,
} from './dom.js';

export function pasangPendengar() {
  document.querySelector('#filter').addEventListener('click', (event) => {
    const tombol = event.target.closest('button');
    if (!tombol) return;               // klik di luar tombol, abaikan
    pilihKategori(tombol.dataset.kategori);
  });

  // satu pendengar di wadah daftar melayani semua tombol favorit
  document.querySelector('#daftar').addEventListener('click', (event) => {
    const tombol = event.target.closest('.favorit');
    if (!tombol) return;
    tambahFavorit(Number(tombol.dataset.id));
  });

  document.querySelector('#atur-ulang').addEventListener('click', aturUlang);

  const form = document.querySelector('#form-tugas');

  form.addEventListener('input', (event) => {
    if (!state.formDicoba) return;     // galat baru muncul setelah Simpan ditekan sekali
    periksaSatuKolom(event.target);
    aturTombolKirim(!semuaLayak());
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();            
    tandaiFormDicoba(true);

    const bermasalah = periksaSemuaKolom();
    aturTombolKirim(bermasalah.length > 0);
    if (bermasalah.length > 0) {
      bermasalah[0].focus();           
      return;
    }

    tambahProyek(bacaForm());
    kosongkanForm();
    tandaiFormDicoba(false);
  });
}