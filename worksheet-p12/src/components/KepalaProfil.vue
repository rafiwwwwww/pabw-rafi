<script setup>
const props = defineProps({
  profil: { type: Object, required: true },
})
</script>

<template>
  <header>
    <div class="header-baris">
      <h1>{{ props.profil.judul }}</h1>
      <div class="header-kanan">
        <nav aria-label="Navigasi utama">
          <ul>
            <li><a href="#bagian-1">Daftar Tugas</a></li>
            <li><a href="#bagian-2">Tambah Tugas</a></li>
            <li><a href="#tentang">Tentang Saya</a></li>
          </ul>
        </nav>
        <input type="checkbox" id="tema" class="pengalih-tema">
        <label for="tema" class="tombol-tema">Tema gelap</label>
      </div>
    </div>
  </header>
</template>