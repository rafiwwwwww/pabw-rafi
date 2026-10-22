<script setup>
import { state, pilihKategori } from '../state.js'

const kategori = [
  { nilai: 'semua', label: 'Semua' },
  { nilai: 'teknis', label: 'Teknis' },
  { nilai: 'bisnis', label: 'Bisnis' },
  { nilai: 'etika', label: 'Etika' },
  { nilai: 'lainnya', label: 'Lainnya' },
]
</script>

<template>
  <div id="filter" role="group" aria-label="Filter kategori tugas">
    <button
      v-for="k in kategori"
      :key="k.nilai"
      type="button"
      :data-kategori="k.nilai"
      :class="{ aktif: state.kategoriAktif === k.nilai }"
      @click="pilihKategori(k.nilai)"
    >
      {{ k.label }}
    </button>
  </div>
</template>