// Modal open/close logic
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
});
