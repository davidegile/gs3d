// ===== FORM SUBMIT =====
const form = document.getElementById('leadForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';

    const data = new FormData(form);

    const formData = new FormData();
    formData.append('_subject', `🖨️ Preventivo GS3D da ${data.get('nome')} — ${data.get('prodotto')}`);
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');
    formData.append('Nome', data.get('nome'));
    formData.append('Telefono', data.get('tel'));
    formData.append('Email', data.get('email'));
    formData.append('Prodotto', data.get('prodotto'));
    formData.append('Quantità', data.get('quantita') || 'Non specificata');
    formData.append('Tipo attività', data.get('attivita') || 'Non specificato');
    formData.append('Messaggio', data.get('messaggio') || '—');

    try {
      const res = await fetch('https://formsubmit.co/ajax/davidegile@gmail.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });

      if (res.ok) {
        form.style.display = 'none';
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        throw new Error('Errore server');
      }
    } catch {
      alert('Ops! Qualcosa è andato storto. Scrivici direttamente a davidegile@gmail.com');
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    }
  });
}

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.product-card, .step-card, .faq-item, .case-stat, .cp-item, .product-pill'
).forEach(el => {
  el.classList.add('reveal-on-scroll');
  observer.observe(el);
});

// ===== NAV ACTIVE =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });
