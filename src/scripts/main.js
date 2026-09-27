/**
 * IRONHUB FITNESS CLUB - CLIENT INTERACTION ENGINE
 * Accessible, Performant, Mobile-Optimized Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-ready');
  initHeader();
  initMobileNav();
  initLocationModal();
  initBillingToggle();
  initPricingSlider();
  initProgramModals();
  initTestimonialSlider();
  initBookingForm();
  initFaqAccordion();
  initPlanSelectors();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER & ACTIVE SECTION SPY
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta-btn');

  if (!toggleBtn || !drawer) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.add('open');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  toggleBtn.addEventListener('click', () => toggleMenu());

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

/* --------------------------------------------------------------------------
   3. LOCATION SELECTOR MODAL
   -------------------------------------------------------------------------- */
function initLocationModal() {
  const triggerBtn = document.getElementById('location-select-btn');
  const modal = document.getElementById('location-modal');
  const closeBtn = document.getElementById('location-modal-close');
  const locationNameEl = triggerBtn ? triggerBtn.querySelector('.location-name') : null;
  const locationOptions = document.querySelectorAll('.location-option');

  if (!triggerBtn || !modal) return;

  function openModal() {
    // If mobile menu drawer is open, close it first
    const drawer = document.getElementById('mobile-nav-drawer');
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    if (drawer && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      if (toggleBtn) {
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    triggerBtn.setAttribute('aria-expanded', 'true');
    triggerBtn.classList.add('dropdown-open');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    triggerBtn.setAttribute('aria-expanded', 'false');
    triggerBtn.classList.remove('dropdown-open');
    document.body.style.overflow = '';
  }

  triggerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (modal.classList.contains('active')) {
      closeModal();
    } else {
      openModal();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  const drawerLocationInfo = document.querySelector('.mobile-location-info');
  if (drawerLocationInfo) {
    drawerLocationInfo.addEventListener('click', openModal);
  }

  const drawerLocationEl = document.querySelector('.mobile-location-info span');
  const sectionLocationTitle = document.querySelector('.location-meta-list .meta-title');

  locationOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      locationOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      const loc = opt.getAttribute('data-location');
      const shortName = loc.split(',')[0];

      if (locationNameEl) {
        locationNameEl.textContent = shortName;
      }
      if (drawerLocationEl) {
        drawerLocationEl.textContent = `${loc}, Delhi NCR`;
      }
      if (sectionLocationTitle) {
        sectionLocationTitle.textContent = `${loc}, Delhi NCR`;
      }

      closeModal();
    });
  });
}

/* --------------------------------------------------------------------------
   4. MEMBERSHIP BILLING CYCLE TOGGLE (MONTHLY VS QUARTERLY)
   -------------------------------------------------------------------------- */
function initBillingToggle() {
  const monthlyBtn = document.getElementById('billing-monthly');
  const quarterlyBtn = document.getElementById('billing-quarterly');
  const amountEls = document.querySelectorAll('.plan-price .amount');
  const periodEls = document.querySelectorAll('.plan-price .period');

  if (!monthlyBtn || !quarterlyBtn) return;

  function setCycle(cycle) {
    if (cycle === 'quarterly') {
      quarterlyBtn.classList.add('active');
      monthlyBtn.classList.remove('active');
      amountEls.forEach(el => {
        el.textContent = el.getAttribute('data-quarterly');
      });
      periodEls.forEach(el => {
        el.textContent = el.getAttribute('data-quarterly');
      });
    } else {
      monthlyBtn.classList.add('active');
      quarterlyBtn.classList.remove('active');
      amountEls.forEach(el => {
        el.textContent = el.getAttribute('data-monthly');
      });
      periodEls.forEach(el => {
        el.textContent = el.getAttribute('data-monthly');
      });
    }
  }

  monthlyBtn.addEventListener('click', () => setCycle('monthly'));
  quarterlyBtn.addEventListener('click', () => setCycle('quarterly'));
}

/* --------------------------------------------------------------------------
   5. PROGRAM DETAILS MODAL
   -------------------------------------------------------------------------- */
const PROGRAM_DATA = {
  'Strength Training': {
    title: 'STRENGTH TRAINING & HYPERTROPHY',
    lead: 'Scientifically engineered for progressive overload and muscle development.',
    details: [
      'Focus on compound barbell lifts (Squat, Bench Press, Deadlift, Overhead Press)',
      'High-grade Olympic barbells and calibrated steel plates',
      'Individual biomechanics screening and posture alignment',
      'Periodized training splits: Push/Pull/Legs and Upper/Lower',
      'Targeted accessory equipment: Belt squats, Glute-Ham developers, and Cable towers'
    ],
    schedule: 'Daily Coaching Available: 6:00 AM - 11:00 PM',
    idealFor: 'Beginners seeking form mastery to competitive athletes'
  },
  'Fat Loss Program': {
    title: 'FAT LOSS & METABOLIC CONDITIONING',
    lead: 'High-energy, sustained fat oxidation protocols with nutritional coaching.',
    details: [
      'Heart-rate targeted HIIT and steady-state cardiovascular conditioning',
      'EPOC (Excess Post-Exercise Oxygen Consumption) interval protocols',
      'Personalized body composition analysis (InBody bioimpedance scan)',
      'Custom macro-nutrient and caloric deficit roadmaps',
      'Weekly progress tracking with circumference and fat percentage checkpoints'
    ],
    schedule: 'Morning & Evening Dedicated Sessions',
    idealFor: 'Anyone wanting rapid, sustainable weight reduction and toning'
  },
  'Group Classes': {
    title: 'HIGH-ENERGY GROUP CLASSES',
    lead: 'Surge of energy, world-class certified instructors, and infectious group camaraderie.',
    details: [
      'IronHIIT: High-octane interval conditioning classes',
      'Power Spin: High-resistance indoor cycling with pulse lighting',
      'Core & Mobility: 45-minute deep core strengthening & spine mobility',
      'Bootcamp Surge: Obstacle & battle rope team circuits',
      'Soundtrack engineered for peak heart rate elevation'
    ],
    schedule: '6 Classes Daily: 7AM, 8:30AM, 10AM, 5PM, 6:30PM, 8PM',
    idealFor: 'All fitness levels loving music and team energy'
  },
  'Functional Training': {
    title: 'FUNCTIONAL ATHLETIC TRAINING',
    lead: 'Enhance real-world movement capacity, joint longevity, and explosive power.',
    details: [
      'Turf sprint lanes with weighted sled push & pull equipment',
      'Heavy dual-rope battle ropes, kettlebells, and Bulgarian bags',
      'Rotational power training using Keiser pneumatic resistance cables',
      'Multi-planar movement drills preventing joint injury',
      'Plyometric boxes, slam balls, and gymnastic rings'
    ],
    schedule: 'Open Turf Access + Dedicated Coaching Slots',
    idealFor: 'Athletes, weekend warriors, and functional longevity enthusiasts'
  }
};

function initProgramModals() {
  const modal = document.getElementById('program-modal');
  const modalTitle = document.getElementById('program-modal-title');
  const modalBody = document.getElementById('program-modal-body');
  const closeBtn = document.getElementById('program-modal-close');
  const programLinks = document.querySelectorAll('.program-link');
  const goalSelect = document.getElementById('form-goal');

  if (!modal || !modalBody) return;

  function openProgram(name) {
    const data = PROGRAM_DATA[name];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalBody.innerHTML = `
      <p style="font-size: 1.05rem; color: #fff; margin-bottom: 16px; font-weight: 600;">${data.lead}</p>
      <div style="margin-bottom: 20px;">
        <h4 style="font-family: var(--font-condensed); color: var(--color-yellow); text-transform: uppercase; margin-bottom: 8px; font-size: 1rem;">Key Highlights:</h4>
        <ul style="display: flex; flex-direction: column; gap: 8px;">
          ${data.details.map(d => `<li style="display: flex; gap: 8px; color: #ccc; font-size: 0.92rem;"><span style="color: var(--color-yellow);">▸</span> ${d}</li>`).join('')}
        </ul>
      </div>
      <div style="background: #111; padding: 12px 16px; border-radius: 4px; border: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 4px;">
        <span style="font-size: 0.85rem; color: var(--text-muted);"><strong style="color: #fff;">Schedule:</strong> ${data.schedule}</span>
        <span style="font-size: 0.85rem; color: var(--text-muted);"><strong style="color: #fff;">Ideal For:</strong> ${data.idealFor}</span>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Update form select if available
    if (goalSelect) {
      goalSelect.value = name;
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  programLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const prog = link.getAttribute('data-program');
      openProgram(prog);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  const modalCta = modal.querySelector('.modal-cta-btn');
  if (modalCta) {
    modalCta.addEventListener('click', () => {
      closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   6. TESTIMONIALS SLIDER
   -------------------------------------------------------------------------- */
function initTestimonialSlider() {
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  if (!track || !prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll('.testimonial-card');
  let currentIndex = 0;

  function updateView() {
    if (window.innerWidth <= 1023) {
      cards.forEach((card, i) => {
        card.style.display = i === currentIndex ? 'flex' : 'none';
      });
    } else {
      cards.forEach(card => card.style.display = 'flex');
    }
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateView();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateView();
  });

  window.addEventListener('resize', updateView, { passive: true });
  updateView();
}

/* --------------------------------------------------------------------------
   7. LEAD BOOKING FORM VALIDATION & CONFIRMATION PASS
   -------------------------------------------------------------------------- */
function initBookingForm() {
  const form = document.getElementById('trial-form');
  const successBox = document.getElementById('form-success');
  const successText = document.getElementById('success-msg-text');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  // Set default minimum date to today
  const dateInput = document.getElementById('form-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('form-name');
    const phoneInput = document.getElementById('form-phone');
    const goalInput = document.getElementById('form-goal');
    const dateVal = dateInput ? dateInput.value : 'Tomorrow';
    const slotVal = document.getElementById('form-slot') ? document.getElementById('form-slot').value : 'Evening';

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    } else {
      nameInput.closest('.form-group').classList.remove('has-error');
    }

    // Validate Phone (10 digits)
    const phoneClean = phoneInput.value.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      phoneInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    } else {
      phoneInput.closest('.form-group').classList.remove('has-error');
    }

    if (!isValid) return;

    // Submit Animation
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Processing Pass...</span>`;

    setTimeout(() => {
      form.style.display = 'none';
      if (successBox) {
        successBox.style.display = 'flex';
        if (successText) {
          successText.innerHTML = `
            Thank you <strong>${nameInput.value.trim()}</strong>! Your 1-Day VIP Trial Pass for <strong>${goalInput.value}</strong> on <strong>${dateVal}</strong> (${slotVal}) has been reserved at our Sector 62, Noida facility.
          `;
        }
      }
    }, 600);
  });

  // Clear errors on input
  ['form-name', 'form-phone'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        el.closest('.form-group').classList.remove('has-error');
      });
    }
  });
}

/* --------------------------------------------------------------------------
   8. FAQ ACCORDION (A11Y & SEO)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = document.getElementById(btn.getAttribute('aria-controls'));

      // Close other open FAQs
      faqQuestions.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherAns = document.getElementById(otherBtn.getAttribute('aria-controls'));
          if (otherAns) otherAns.hidden = true;
        }
      });

      // Toggle this FAQ
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        if (answer) answer.hidden = true;
      } else {
        btn.setAttribute('aria-expanded', 'true');
        if (answer) answer.hidden = false;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. PLAN SELECTORS (PRE-FILL TRIAL FORM)
   -------------------------------------------------------------------------- */
function initPlanSelectors() {
  const selectPlanBtns = document.querySelectorAll('.select-plan-btn');
  const goalSelect = document.getElementById('form-goal');

  selectPlanBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      if (goalSelect) {
        if (plan === 'Basic' || plan === 'Standard') {
          goalSelect.value = 'Strength Training';
        } else {
          goalSelect.value = 'Personal Training';
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. MOBILE PRICING CAROUSEL SLIDER WITH ARROWS & DOTS
   -------------------------------------------------------------------------- */
function initPricingSlider() {
  const grid = document.querySelector('.pricing-cards-grid');
  const prevBtn = document.getElementById('pricing-prev');
  const nextBtn = document.getElementById('pricing-next');
  const dots = document.querySelectorAll('.pricing-dot');
  if (!grid) return;

  const cards = grid.querySelectorAll('.pricing-card');
  if (!cards.length) return;

  function getActiveIndex() {
    const scrollCenter = grid.scrollLeft + grid.offsetWidth / 2;
    let closestIdx = 0;
    let minDiff = Infinity;
    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft - grid.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(scrollCenter - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    return closestIdx;
  }

  function updateDots(activeIndex) {
    dots.forEach((dot, idx) => {
      if (idx === activeIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('active');
        dot.removeAttribute('aria-current');
      }
    });
  }

  function scrollToIndex(index) {
    if (index < 0) index = cards.length - 1;
    if (index >= cards.length) index = 0;
    const targetCard = cards[index];
    if (targetCard) {
      const scrollPos = targetCard.offsetLeft - grid.offsetLeft - (grid.clientWidth - targetCard.clientWidth) / 2;
      grid.scrollTo({
        left: Math.max(0, scrollPos),
        behavior: 'smooth'
      });
    }
    updateDots(index);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const current = getActiveIndex();
      scrollToIndex(current - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const current = getActiveIndex();
      scrollToIndex(current + 1);
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      scrollToIndex(idx);
    });
  });

  // Sync dots when user manually swipes/scrolls horizontally on touch screen
  let scrollTimeout = null;
  grid.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const activeIdx = getActiveIndex();
      updateDots(activeIdx);
    }, 50);
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   11. SCROLL-TRIGGERED IN & OUT ANIMATION OBSERVER
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.reveal-fade-up, .reveal-fade-in, .reveal-left, .reveal-right, .reveal-img-zoom, .reveal-stagger'
  );
  if (!animatedElements.length) return;

  // Accessibility: respect reduced motion preferences
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animatedElements.forEach(el => el.classList.add('is-in-view'));
    return;
  }

  // High performance IntersectionObserver with hysteresis rootMargin
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in-view');
      } else {
        // In-and-Out animation: smoothly exit when scrolled out of view
        entry.target.classList.remove('is-in-view');
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  });

  animatedElements.forEach(el => observer.observe(el));
}

