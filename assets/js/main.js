/**
 * THE CENTRE FOR POLITICS (TCP)
 * Main JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initStickyHeader();
  initBackToTop();
  initModals();
  initFAQ();
  initForms();
  initCourseFilters();
});

/* -------------------------------------------------------------
 * 1. Mobile Menu Drawer
 * ------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-menu-drawer');
  const overlay = document.querySelector('.menu-overlay');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !overlay) return;

  function openMenu() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m));
    }
  });
}

/* -------------------------------------------------------------
 * 2. Sticky Header
 * ------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.7)';
    } else {
      header.classList.remove('scrolled');
      header.style.boxShadow = 'none';
    }
  });
}

/* -------------------------------------------------------------
 * 3. Back to Top Button
 * ------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.float-btn.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* -------------------------------------------------------------
 * 4. FAQ Accordion
 * ------------------------------------------------------------- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other open FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      if (!isActive) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
}

/* -------------------------------------------------------------
 * 5. Modals (Enquiry & Payment Gateway Simulation)
 * ------------------------------------------------------------- */
function initModals() {
  // Enquiry Modal triggers
  const enquiryBtns = document.querySelectorAll('[data-enquire-course]');
  const enquiryModal = document.getElementById('enquiryModal');
  const courseInput = document.getElementById('enquiryCourseField');

  enquiryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const courseName = btn.getAttribute('data-enquire-course') || 'General Political Programme Enquiry';
      if (courseInput) {
        courseInput.value = courseName;
      }
      openModal(enquiryModal);
    });
  });

  // Payment Modal triggers
  const payBtns = document.querySelectorAll('[data-pay-course]');
  const payModal = document.getElementById('paymentModal');
  const payCourseTitle = document.getElementById('payModalCourseTitle');
  const payCourseAmount = document.getElementById('payModalCourseAmount');
  const payAmountInput = document.getElementById('payAmountInput');

  payBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-pay-course') || 'TCP Executive Programme';
      const amount = btn.getAttribute('data-pay-amount') || '500';
      
      if (payCourseTitle) payCourseTitle.textContent = title;
      if (payCourseAmount) payCourseAmount.textContent = '₹' + Number(amount).toLocaleString('en-IN');
      if (payAmountInput) payAmountInput.value = amount;

      openModal(payModal);
    });
  });

  // Generic close for all modals
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal));
    }
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* -------------------------------------------------------------
 * 6. Interactive Forms & Payment Flow Simulation
 * ------------------------------------------------------------- */
function initForms() {
  // General Contact / Enquiry Form
  const contactForms = document.querySelectorAll('.tcp-contact-form, #enquiryForm');
  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Submitted Successfully!';
          submitBtn.style.background = '#00f59b';
          submitBtn.style.color = '#04120c';
        }

        alert('Thank you for contacting The Centre for Politics! Your details have been received. An academic counselor will connect with you shortly via Call/WhatsApp.');
        form.reset();

        const openModalEl = form.closest('.modal-overlay');
        if (openModalEl) {
          setTimeout(() => closeModal(openModalEl), 1000);
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
          }
        }, 3000);
      }, 1200);
    });
  });

  // Payment Form Simulation
  const paymentForm = document.getElementById('paymentSimulationForm');
  if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = paymentForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-lock fa-spin"></i> Securing Payment...';

      setTimeout(() => {
        const modalBody = document.querySelector('#paymentModal .modal-body');
        const courseName = document.getElementById('payModalCourseTitle')?.textContent || 'Course Registration';
        const amount = document.getElementById('payModalCourseAmount')?.textContent || '₹500';
        const txId = 'TCP-' + Math.floor(100000 + Math.random() * 900000);

        if (modalBody) {
          modalBody.innerHTML = `
            <div style="text-align: center; padding: 20px 10px;">
              <div style="width: 72px; height: 72px; margin: 0 auto 20px; border-radius: 50%; background: rgba(0, 245, 155, 0.15); border: 2px solid #00f59b; display: flex; align-items: center; justify-content: center; color: #00f59b; font-size: 2.2rem;">
                <i class="fas fa-check"></i>
              </div>
              <h3 style="font-size: 1.5rem; margin-bottom: 8px; color: #fff;">Registration Confirmed!</h3>
              <p style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 24px;">Your provisional enrolment in <strong>${courseName}</strong> is successful.</p>
              
              <div style="background: #0d1219; border: 1px solid rgba(241, 247, 250, 0.12); border-radius: 12px; padding: 20px; text-align: left; margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem;">
                  <span style="color: #94a3b8;">Transaction ID:</span>
                  <span style="color: #00f59b; font-weight: 700;">${txId}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem;">
                  <span style="color: #94a3b8;">Amount Paid:</span>
                  <span style="color: #fff; font-weight: 700;">${amount}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                  <span style="color: #94a3b8;">Status:</span>
                  <span style="color: #00f59b; font-weight: 600;"><i class="fas fa-shield-alt"></i> Verified</span>
                </div>
              </div>

              <p style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 20px;">
                Receipt and joining instructions have been generated. Our team at Sector 54, Gurugram will reach out within 24 hours.
              </p>
              
              <button onclick="location.reload()" class="btn btn-primary" style="width: 100%;">
                Done & Return to Site
              </button>
            </div>
          `;
        }
      }, 1500);
    });
  }
}

/* -------------------------------------------------------------
 * 7. Course Filter on Courses Page
 * ------------------------------------------------------------- */
function initCourseFilters() {
  const filterBtns = document.querySelectorAll('.course-filter-btn');
  const courseCards = document.querySelectorAll('.course-filterable-item');

  if (!filterBtns.length || !courseCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'flex';
        } else {
          const category = card.getAttribute('data-category');
          if (category === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 8. Download Brochure Simulation
 * ------------------------------------------------------------- */
function downloadBrochure(courseName = 'The Centre for Politics Prospectus') {
  alert(`Preparing download: "${courseName}".\nThe official prospectus PDF will be downloaded.`);
}
window.downloadBrochure = downloadBrochure;
