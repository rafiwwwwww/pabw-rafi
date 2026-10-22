<script setup>
import { computed } from 'vue'
import { state } from '../state.js'
import { saring } from '../data.js'

const tampil = computed(() => saring(state.daftarProyek, state.kategoriAktif))
</script>

<template>
  <p v-if="state.memuat">Memuat data...</p>
  <p v-else-if="state.galat">{{ state.galat }}</p>
  <p v-else-if="tampil.length === 0">Belum ada data.</p>

  <ul
    v-else
    class="katalog"
    id="daftar"
    aria-label="Tugas kuliah dan tenggat waktunya semester ini"
  >
    <li v-for="tugas in tampil" :key="tugas.id">
      <h3>{{ tugas.nama }}</h3>
      <p>{{ tugas.mataKuliah }}</p>
      <p>Tenggat: {{ tugas.tenggat }}</p>
    </li>
  </ul>
</template>