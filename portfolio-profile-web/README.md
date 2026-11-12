# Website Profil & Portofolio Profesional (JavaScript)

Website profil diri dan portofolio profesional yang dirancang dengan konsep visual modern **Light Theme**, tata bahasa **semi-formal**, kaya akan grafis ilustrasi vektor serta foto profil, dan telah dikonfigurasi secara optimal untuk **siap diunggah (deploy) ke Vercel**.

---

## 📋 Konsep Tampilan Satu Halaman (Single-Page Seamless)

Website ini telah disatukan ke dalam **satu halaman penuh yang mengalir mulus (*Single-Page Application / One-Page Scroll*)** di `index.html`, sehingga pengunjung tidak perlu berpindah-pindah halaman secara terpotong-potong:

1. **Bagian Halaman Utama (`#beranda`)**:
   - Hero headline modern, badge status aktif dengan avatar foto profil, dan tombol aksi (CTA).
   - Statistik pencapaian & 3 pilar kompetensi utama.
   - Gambar ilustrasi vektor teknologi.

2. **Bagian Profil Diri (`#profil`)**:
   - Kartu profil lengkap dengan biografi profesional bergaya semi-formal.
   - **Fitur Ganti Foto Sendiri**: Pengguna dapat mengunggah foto profil langsung dari komputer via browser, tersimpan otomatis di *LocalStorage*.
   - Bilah keahlian teknis (JavaScript, HTML/CSS, UI/UX, Git, Vercel) yang terisi animasi saat di-scroll.
   - Linimasa riwayat rekam jejak berkarya & dedikasi teknologi.

3. **Bagian Kontak & Kolaborasi (`#kontak`)**:
   - Formulir pesan interaktif dengan validasi JavaScript dan pop-up notifikasi toast.
   - Tautan saluran jejaring sosial publik (GitHub, LinkedIn, Twitter/X).
   - **Privasi Terjamin**: Tetap mematuhi aturan privasi tanpa menampilkan nomor HP, alamat, maupun email pribadi.

4. **Konsep Warna (Light Theme)**:
   - Dominasi latar belakang cerah yang nyaman di mata (`#f8fafc`, `#ffffff`), aksen warna biru/indigo (`#2563eb`, `#4f46e5`), serta aksen hijau emerald (`#10b981`).
   - Kontras teks tinggi untuk keterbacaan optimal.

5. **Gaya Bahasa**:
   - Semi-formal dalam Bahasa Indonesia yang santun, profesional, dan tetap komunikatif.

6. **Gambar & Ilustrasi**:
   - Foto profil: `assets/images/profile-photo.svg`
   - Ilustrasi Beranda: `assets/images/hero-illustration.svg`
   - Ilustrasi Profil: `assets/images/about-illustration.svg`
   - Ilustrasi Kontak: `assets/images/contact-illustration.svg`

7. **Privasi & Keamanan Informasi**:
   - **Sesuai ketentuan, TIDAK memuat:** nomor telepon / WhatsApp, alamat tempat tinggal, maupun alamat email pribadi.
   - Komunikasi difasilitasi melalui formulir publik dan media sosial terverifikasi.

8. **Optimasi Vercel Ready**:
   - Dilengkapi berkas `vercel.json` dengan konfigurasi *Clean URLs* dan *Security Headers*.

---

## 📂 Struktur Direktori Proyek

```text
portfolio-profile-web/
├── index.html                      # Halaman Utama (Beranda)
├── profile.html                    # Halaman Profil Diri & Rekam Jejak
├── contact.html                    # Halaman Kontak & Saluran Diskusi
├── vercel.json                     # Konfigurasi Deployment Vercel (Clean URLs & Caching)
├── package.json                    # Metadata Proyek & Skrip
├── README.md                       # Dokumentasi & Panduan Lengkap
└── assets/
    ├── css/
    │   └── style.css               # Gaya Tampilan Visual (Modern Light Theme)
    ├── js/
    │   └── main.js                 # Logika JavaScript Interaktif & Form Handler
    └── images/
        ├── profile-photo.svg       # Foto Profil
        ├── hero-illustration.svg   # Ilustrasi Halaman Utama
        ├── about-illustration.svg  # Ilustrasi Halaman Profil
        └── contact-illustration.svg# Ilustrasi Halaman Kontak
```

---

## 🚀 Panduan Menjalankan Secara Lokal (Preview)

Anda dapat langsung membuka berkas `.html` di peramban (browser) favorit Anda, atau menggunakan server lokal sederhana:

### Opsi 1: Buka Langsung
Klik dua kali pada berkas `index.html` untuk membuka di Google Chrome / Edge / Firefox.

### Opsi 2: Menggunakan Node.js / `npx serve`
```bash
npx serve .
```
Lalu buka alamat `http://localhost:3000` di browser.

### Opsi 3: Menggunakan Python
```bash
python -m http.server 8000
```
Lalu buka alamat `http://localhost:8000` di browser.

---

## ☁️ Panduan Publikasi ke Vercel

Situs ini dibangun secara *native* (HTML, CSS, JavaScript) sehingga proses publikasi di Vercel berlangsung instan tanpa proses kompilasi (*Zero-Config*).

### Metode A: Melalui Dashboard Vercel & GitHub (Paling Direkomendasikan)
1. Buat repositori baru di [GitHub](https://github.com/new).
2. Unggah seluruh berkas di dalam folder ini ke repositori tersebut:
   ```bash
   git init
   git add .
   git commit -m "Inisialisasi website profil profesional"
   git branch -M main
   git remote add origin https://github.com/USERNAME_ANDA/NAMA_REPO.git
   git push -u origin main
   ```
3. Buka dashboard [Vercel](https://vercel.com/) dan lakukan login.
4. Klik tombol **"Add New..."** lalu pilih **"Project"**.
5. Impor repositori GitHub yang baru saja dibuat.
6. Pada bagian *Framework Preset*, biarkan default (**Other**).
7. Klik **"Deploy"**. Dalam beberapa detik website Anda sudah aktif secara publik dengan domain gratis `https://nama-proyek.vercel.app`!

### Metode B: Menggunakan Vercel CLI (Terminal)
1. Buka terminal di folder proyek ini:
   ```bash
   npm i -g vercel
   vercel
   ```
2. Ikuti instruksi login di layar dan pilih opsi default.
3. Untuk deployment produksi:
   ```bash
   vercel --prod
   ```
