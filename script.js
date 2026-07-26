// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const body = document.body;

function applyTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    body.classList.remove('light');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const isLight = body.classList.contains('light');
  const next = isLight ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// ===== Mobile Nav =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== Typewriter =====
const roles = ['.NET MAUI Developer', 'Frontend Developer', 'Android Developer', 'Full Stack Engineer'];
const typewriterEl = document.getElementById('typewriter');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    typewriterEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typewriterEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
typeLoop();

// ===== Project Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

function filterProjects(filter) {
  projectCards.forEach(card => {
    const match = filter === 'all' || card.dataset.tag === filter;
    card.classList.toggle('show', match);
  });
}
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProjects(btn.dataset.filter);
  });
});
filterProjects('all');

// ===== Contact Form (submits to Formspree — see README to set your Form ID) =====
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const sendBtn = document.getElementById('sendBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (sendBtn.classList.contains('loading') || sendBtn.classList.contains('sent')) return;

  const actionUrl = form.getAttribute('action');
  const isConfigured = actionUrl && !actionUrl.includes('YOUR_FORM_ID');

  sendBtn.classList.add('loading');
  formNote.classList.remove('error');
  formNote.textContent = '';

  if (!isConfigured) {
    // Formspree ID hasn't been set yet — tell the developer, don't pretend it sent.
    setTimeout(() => {
      sendBtn.classList.remove('loading');
      formNote.classList.add('error');
      formNote.textContent = 'Form isn\'t connected yet — set your Formspree Form ID in index.html (see README).';
    }, 500);
    return;
  }

  try {
    const res = await fetch(actionUrl, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      sendBtn.classList.remove('loading');
      sendBtn.classList.add('sent');
      formNote.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
      form.reset();
      setTimeout(() => sendBtn.classList.remove('sent'), 2600);
    } else {
      throw new Error('Form submission failed');
    }
  } catch (err) {
    sendBtn.classList.remove('loading');
    formNote.classList.add('error');
    formNote.textContent = "Something went wrong — please email me directly instead.";
  }
});

// ===== Stat counters (count up when scrolled into view) =====
const statNumbers = document.querySelectorAll('.stat-number');
function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.round(target * eased);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statNumbers.forEach(el => statIO.observe(el));

// ===== Footer Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Scroll reveal for cards/sections =====
const revealTargets = document.querySelectorAll('.card, .tl-card, .goal-box');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  io.observe(el);
});

// ===== Scroll progress bar (top gradient line fills as you read) =====
const progressBar = document.querySelector('.top-gradient-bar');
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// ===== Section title underline reveal =====
const titleTargets = document.querySelectorAll('.section-title');
const titleIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      titleIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
titleTargets.forEach(el => titleIO.observe(el));

// ===== Nav scrollspy (highlight current section) =====
const navAnchors = document.querySelectorAll('.nav-links a');
const spySections = [...navAnchors].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const spyIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = '#' + entry.target.id;
    const link = document.querySelector(`.nav-links a[href="${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
spySections.forEach(sec => spyIO.observe(sec));

// ===== Hero photo tilt (dynamic parallax on mouse move) =====
const photoStage = document.getElementById('photoStage');
const photoBox = document.getElementById('photoBox');
if (photoStage && photoBox && window.matchMedia('(hover: hover)').matches) {
  photoStage.addEventListener('mousemove', (e) => {
    const rect = photoStage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    photoBox.style.transform = `perspective(600px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.03)`;
  });
  photoStage.addEventListener('mouseleave', () => {
    photoBox.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
  });
}
