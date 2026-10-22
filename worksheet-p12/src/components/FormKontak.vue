<template>
  <form id="form-tugas" action="/simpan" method="post" novalidate @submit.prevent>
    <div class="form-kolom">
      <label for="nama-tugas">Nama tugas</label>
      <input type="text" id="nama-tugas" name="nama-tugas" required minlength="3" aria-describedby="galat-nama">
      <p class="pesan-galat" id="galat-nama">Nama tugas wajib diisi, minimal 3 huruf.</p>
    </div>
    <div class="form-kolom">
      <label for="mata-kuliah">Mata kuliah</label>
      <input type="text" id="mata-kuliah" name="mata-kuliah" required aria-describedby="galat-mk">
      <p class="pesan-galat" id="galat-mk">Mata kuliah wajib diisi.</p>
    </div>
    <div class="form-kolom">
      <label for="tenggat">Tenggat</label>
      <input type="date" id="tenggat" name="tenggat" required aria-describedby="galat-tenggat">
      <p class="pesan-galat" id="galat-tenggat">Pilih tanggal tenggat tugas.</p>
    </div>
    <button type="submit">Simpan</button>
  </form>
</template>
