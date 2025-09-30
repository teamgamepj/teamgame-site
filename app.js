// Modal + footer copy link
document.addEventListener('DOMContentLoaded', () => {
  const readMoreButtons = document.querySelectorAll('.read-more');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.close');

  readMoreButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-open');
      const modal = document.getElementById(targetId);
      if (modal) modal.style.display = 'block';
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').style.display = 'none';
    });
  });

  window.addEventListener('click', e => {
    modals.forEach(modal => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Copy site link
  const copyBtn = document.getElementById('copy-link');
  const siteUrl = document.getElementById('site-url');
  if (copyBtn && siteUrl) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(siteUrl.href);
        copyBtn.textContent = 'Kopirano ✓';
        setTimeout(()=> copyBtn.textContent = 'Kopiraj link sajta', 1600);
      } catch (e) {
        copyBtn.textContent = 'Kopiranje neuspešno';
        setTimeout(()=> copyBtn.textContent = 'Kopiraj link sajta', 1600);
      }
    });
  }
});
