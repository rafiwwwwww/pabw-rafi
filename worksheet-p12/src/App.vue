<script setup>
import { onMounted, watch } from 'vue'
import { profil } from './data.js'
import { state, simpan, muat, pulihkan, isiProyek } from './state.js'
import { ambilProyek } from './api.js'
import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'

onMounted(async () => {
  pulihkan(muat())
  try {
    isiProyek(await ambilProyek())
  } catch (galat) {
    state.galat = 'Data gagal dimuat. Periksa koneksi, lalu muat ulang.'
  } finally {
    state.memuat = false
  }
})

watch(state, (nilai) => simpan(nilai), { deep: true })
</script>

<template>
  <div class="page">
    <KepalaProfil :profil="profil" />

    <main>
      <section id="bagian-1">
        <h2>Daftar Tugas</h2>
        <p>Berikut daftar tugas kuliah saya beserta mata kuliah dan tenggat waktunya semester ini.</p>

        <TombolFilter />
        <DaftarProyek />

        <figure>
          <img src="/tumpukan buku diatas meja.webp" alt="Tumpukan buku dan laptop terbuka di atas meja belajar dengan catatan tugas kuliah" width="640" height="360" loading="lazy">
          <figcaption>Meja belajar saya saat mengerjakan tugas-tugas kuliah.</figcaption>
        </figure>
      </section>

      <section id="bagian-2">
        <h2>Tambah Tugas</h2>
        <p>Gunakan form berikut untuk mencatat tugas baru yang harus saya kerjakan.</p>

        <FormKontak />
      </section>
    </main>

    <footer id="tentang">
      <p>Rafie Fachrullah Malah · NIM: 23523253 · 2026</p>
    </footer>
  </div>
</template>