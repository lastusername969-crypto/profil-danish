/**
 * Portfolio & Profile Website - Main JavaScript
 * Memberikan fungsionalitas interaktif, validasi kontak, dan responsivitas web
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inisialisasi Transisi Halus Antarhalaman (Smooth Page Transitions)
  initPageTransitions();

  // 2. Inisialisasi Tema Terang / Gelap (Dark & Light Mode)
  initThemeToggle();

  // 3. Inisialisasi Navigasi & Mobile Menu
  initNavigation();

  // 4. Inisialisasi Animasi Teks Berputar (Typewriter Effect)
  initTypewriter();

  // 5. Inisialisasi Animasi Scroll Reveal (Elemen Muncul Dinamis)
  initScrollReveal();

  // 6. Inisialisasi Tombol Kembali ke Atas (Back to Top)
  initBackToTop();

  // 7. Inisialisasi Dinamis Footer & Tahun
  initFooterYear();

  // 8. Inisialisasi Pengelolaan Foto Profil (Bisa Diganti Sendiri oleh Pengguna)
  initProfilePhotoManager();

  // 9. Inisialisasi Form Kontak Interaktif
  initContactForm();

  // 10. Inisialisasi Animasi Bilah Keahlian (Skill Bars)
  initSkillBars();

  // 11. Inisialisasi Efek Scroll Navbar
  initScrollEffects();
});

/**
 * 1. Transisi Mulus Antarhalaman (Smooth Page Transition Interception)
 */
function initPageTransitions() {
  // Trigger animasi halaman masuk saat siap
  requestAnimationFrame(() => {
    document.body.classList.add('page-loaded');
  });

  // Saat halaman dibuka dari cache riwayat peramban (back/forward)
  window.addEventListener('pageshow', () => {
    document.body.classList.remove('page-exiting');
    document.body.classList.add('page-loaded');
  });

  // Intersep klik tautan antarhalaman
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href &&
      !href.startsWith('#') &&
      !href.startsWith('http') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:') &&
      !link.hasAttribute('target')
    ) {
      link.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;

        const currentFile = window.location.pathname.split('/').pop() || 'index.html';
        const targetFile = href.split('/').pop().split('#')[0];
        if (currentFile === targetFile) return;

        e.preventDefault();
        document.body.classList.remove('page-loaded');
        document.body.classList.add('page-exiting');

        setTimeout(() => {
          window.location.href = href;
        }, 260);
      });
    }
  });
}

/**
 * Pengaturan Pengalihan Tema Gelap / Terang (Dark & Light Mode)
 * Menyimpan preferensi pengguna di LocalStorage dan mendeteksi preferensi sistem
 */
function initThemeToggle() {
  const THEME_KEY = 'site_theme_preference';
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const mobileToggleBtn = document.getElementById('mobile-theme-toggle-btn');

  // Deteksi preferensi tersimpan atau bawaan sistem OS
  const savedTheme = localStorage.getItem(THEME_KEY);
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  // Fungsi aksi penggantian tema
  const toggleThemeAction = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);

    const title = nextTheme === 'dark' ? 'Mode Gelap Aktif' : 'Mode Terang Aktif';
    const desc = nextTheme === 'dark'
      ? 'Tampilan kini nyaman digunakan dalam pencahayaan redup.'
      : 'Tampilan kini cerah dan bersih dengan tema terang.';
    showToast(title, desc, 'success');
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleThemeAction);
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', toggleThemeAction);
  }

  // Sinkronisasi otomatis jika preferensi sistem operasi berubah (opsional)
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

/**
 * Menerapkan atribut tema ke elemen akar <html>
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  const toggleBtn = document.getElementById('theme-toggle-btn');
  const mobileLabel = document.getElementById('mobile-theme-label');

  if (toggleBtn) {
    toggleBtn.setAttribute('title', theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap');
    toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap');
  }

  if (mobileLabel) {
    mobileLabel.textContent = theme === 'dark' ? 'Mode Gelap Aktif' : 'Mode Terang Aktif';
  }
}

/**
 * Pengaturan Navigasi, Hamburger Menu Mobile, dan ScrollSpy (Satu Halaman Penuh)
 */
function initNavigation() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      toggleBtn.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    });

    // Tutup menu saat tautan navigasi diklik & aktifkan status tab langsung
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          navLinks.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }

        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          toggleBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
        }
      });
    });
  }

  // Tandai nav-link yang aktif sesuai nama halaman saat ini
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath === '/' && href === 'index.html')) {
      link.classList.add('active');
    } else if (!href.startsWith('#')) {
      link.classList.remove('active');
    }
  });

  // ScrollSpy Otomatis jika terdapat sections dalam 1 halaman
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  if (sections.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 140;

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          allNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else if (href.startsWith('#')) {
              link.classList.remove('active');
            }
          });
        }
      });
    });
  }
}

/**
 * 3. Animasi Efek Mengetik Otomatis (Typewriter Effect) di Hero Section
 */
function initTypewriter() {
  const target = document.getElementById('typing-text');
  if (!target) return;

  const words = [
    'Siswa Kelas 10 SMK TKJ',
    'Eksplorasi Jaringan Komputer',
    'Scripting Otomasi Python',
    'Analisis Paket Wireshark',
    'Perancangan Struktur Web HTML'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeLoop() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // jeda saat kata selesai diketik
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 450; // jeda sebelum mulai kata berikutnya
    }

    setTimeout(typeLoop, typeSpeed);
  }

  typeLoop();
}

/**
 * 4. Animasi Scroll Reveal (Elemen Muncul Mulus Menggunakan IntersectionObserver)
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 5. Tombol Mengambang Kembali ke Atas (Back to Top)
 */
function initBackToTop() {
  let btn = document.getElementById('back-to-top-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top-btn';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Kembali ke atas');
    btn.setAttribute('title', 'Kembali ke atas halaman');
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    `;
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Efek Scroll Navbar
 */
function initScrollEffects() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/**
 * Pengelolaan Foto Profil (Bisa Diubah Sendiri Langsung oleh Pengguna)
 * Menyimpan foto yang diupload ke LocalStorage browser secara instan
 */
function initProfilePhotoManager() {
  const STORAGE_KEY = 'user_custom_profile_photo';
  const savedPhoto = localStorage.getItem(STORAGE_KEY);

  // Fungsi helper untuk memperbarui semua foto avatar di seluruh halaman
  const updateAllAvatarsOnPage = (photoUrl) => {
    // 1. Gambar avatar di profil
    const profileAvatar = document.getElementById('profile-avatar-display');
    if (profileAvatar) profileAvatar.src = photoUrl;

    // 2. Gambar avatar di navbar
    document.querySelectorAll('.brand-avatar').forEach(img => {
      img.src = photoUrl;
    });

    // 3. Gambar avatar di badge hero halaman utama
    const heroBadgeImg = document.querySelector('.badge-tag img');
    if (heroBadgeImg) heroBadgeImg.src = photoUrl;
  };

  // Jika sebelumnya pengguna sudah mengunggah foto sendiri, tampilkan foto tersebut
  if (savedPhoto) {
    updateAllAvatarsOnPage(savedPhoto);
    const resetBtn = document.getElementById('btn-reset-photo');
    if (resetBtn) resetBtn.style.display = 'inline-flex';
  }

  // Pengaturan input file dan tombol di halaman profil
  const avatarContainer = document.getElementById('avatar-container');
  const fileInput = document.getElementById('avatar-file-input');
  const changeBtn = document.getElementById('btn-change-photo');
  const resetBtn = document.getElementById('btn-reset-photo');

  if (fileInput) {
    // Memicu dialog pemilihan file saat tombol atau wadah foto diklik
    const openFilePicker = () => fileInput.click();

    if (avatarContainer) avatarContainer.addEventListener('click', openFilePicker);
    if (changeBtn) changeBtn.addEventListener('click', openFilePicker);

    // Saat pengguna memilih foto dari komputernya
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        showToast('Format Salah', 'Mohon pilih berkas gambar (JPG, PNG, atau WebP).', 'warning');
        return;
      }

      // Validasi ukuran (maksimal 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToast('Ukuran Terlalu Besar', 'Maksimal ukuran foto adalah 5MB.', 'warning');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target.result;
        try {
          localStorage.setItem(STORAGE_KEY, base64Data);
          updateAllAvatarsOnPage(base64Data);
          if (resetBtn) resetBtn.style.display = 'inline-flex';

          showToast(
            'Foto Berhasil Diperbarui!',
            'Foto profil Anda telah disimpan dan kini aktif di seluruh halaman website.',
            'success'
          );
        } catch (err) {
          console.error(err);
          showToast('Peringatan', 'Foto berhasil dimuat sementara, namun memori browser penuh untuk penyimpanan permanen.', 'warning');
        }
      };
      reader.readAsDataURL(file);
    });

    // Tombol reset foto ke default
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);
        updateAllAvatarsOnPage('assets/images/profile-photo.jpg');
        resetBtn.style.display = 'none';
        fileInput.value = '';
        showToast('Foto Direset', 'Foto profil telah dikembalikan ke foto bawaan.', 'success');
      });
    }
  }
}

/**
 * Format Tahun Otomatis di Footer
 */
function initFooterYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/**
 * Animasi Pengisian Bilah Keahlian (Skill Bars)
 */
function initSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  if (skillFills.length === 0) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const targetWidth = fill.getAttribute('data-percentage') || '85%';
          fill.style.width = targetWidth;
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.2 }
  );

  skillFills.forEach(fill => {
    fill.style.width = '0%';
    observer.observe(fill);
  });
}

/**
 * Penanganan Form Kontak Interaktif
 * (Sesuai ketentuan: Tanpa meminta Nomor HP, Alamat, atau Email)
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const senderName = document.getElementById('sender-name')?.value.trim();
    const platformAccount = document.getElementById('sender-platform')?.value.trim();
    const topic = document.getElementById('contact-topic')?.value;
    const message = document.getElementById('sender-message')?.value.trim();
    const submitBtn = document.getElementById('submit-btn');

    // Validasi form sederhana
    if (!senderName || !message) {
      showToast('Peringatan', 'Silakan lengkapi nama dan isi pesan Anda terlebih dahulu.', 'warning');
      return;
    }

    if (message.length < 10) {
      showToast('Peringatan', 'Pesan terlalu singkat, mohon tuliskan minimal 10 karakter.', 'warning');
      return;
    }

    // Simulasi status pengiriman pesan
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg> Mengirim Pesan...
      `;
    }

    setTimeout(() => {
      // Simpan data pesan ke LocalStorage browser untuk catatan aktivitas publik
      const submittedData = {
        name: senderName,
        platformAccount: platformAccount || 'Anonim / Publik',
        topic: topic || 'Diskusi Umum',
        message: message,
        timestamp: new Date().toLocaleString('id-ID')
      };

      try {
        const storedMessages = JSON.parse(localStorage.getItem('sent_messages') || '[]');
        storedMessages.push(submittedData);
        localStorage.setItem('sent_messages', JSON.stringify(storedMessages));
      } catch (err) {
        console.warn('Gagal menyimpan riwayat pesan lokal:', err);
      }

      // Reset form input
      contactForm.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg> Kirim Pesan Sekarang
        `;
      }

      showToast(
        'Pesan Terkirim!',
        `Terima kasih Saudara/i ${senderName}. Pesan Anda telah tersimpan dan akan segera saya tinjau.`,
        'success'
      );
    }, 1200);
  });
}

/**
 * Notifikasi Pop-up Toast Modern
 */
function showToast(title, message, type = 'success') {
  let toast = document.querySelector('.toast-notice');

  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  const iconColor = type === 'warning' ? '#f59e0b' : '#10b981';
  const iconSvg =
    type === 'warning'
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;

  toast.innerHTML = `
    <div class="toast-icon">${iconSvg}</div>
    <div class="toast-text">
      <h4>${title}</h4>
      <p>${message}</p>
    </div>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

// Keyframes untuk CSS spinner loading dinamis
const style = document.createElement('style');
style.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
