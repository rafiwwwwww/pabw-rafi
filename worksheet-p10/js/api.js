const ALAMAT = 'https://raw.githubusercontent.com/rafiwwwwww/pabw-rafi/refs/heads/main/worksheet-p10/js/proyek.json';

export async function ambilProyek() {
  try {
    const respons = await fetch(ALAMAT);
    if (!respons.ok) throw new Error('status ' + respons.status);
    const data = await respons.json();
    return data;
  } catch (galat) {
    console.error('gagal memuat', galat.message);
    throw galat;                    
  }
}
