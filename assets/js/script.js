'use strict';

const toggleActive = function (element, forceState) {
  if (!element) return false;

  if (typeof forceState === 'boolean') {
    element.classList.toggle('active', forceState);
  } else {
    element.classList.toggle('active');
  }

  return element.classList.contains('active');
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


// Sidebar
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', function () {
    const isOpen = toggleActive(sidebar);
    sidebarBtn.setAttribute('aria-expanded', String(isOpen));
  });
}


// Testimonials modal
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const toggleTestimonialsModal = function (forceState) {
  const shouldOpen = typeof forceState === 'boolean'
    ? forceState
    : !modalContainer?.classList.contains('active');

  toggleActive(modalContainer, shouldOpen);
  toggleActive(overlay, shouldOpen);
};

testimonialsItem.forEach(function (item) {
  item.addEventListener('click', function () {
    const avatar = item.querySelector('[data-testimonials-avatar]');
    const title = item.querySelector('[data-testimonials-title]');
    const text = item.querySelector('[data-testimonials-text]');

    if (avatar && modalImg) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }

    if (title && modalTitle) modalTitle.textContent = title.textContent;
    if (text && modalText) modalText.innerHTML = text.innerHTML;

    toggleTestimonialsModal(true);
  });
});

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', function () {
    toggleTestimonialsModal(false);
  });
}

if (overlay) {
  overlay.addEventListener('click', function () {
    toggleTestimonialsModal(false);
  });
}


// Portfolio filter
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

const filterProjects = function (selectedValue) {
  filterItems.forEach(function (item) {
    const isMatch = selectedValue === 'all' || selectedValue === item.dataset.category;
    item.classList.toggle('active', isMatch);
  });
};

if (select) {
  select.addEventListener('click', function () {
    toggleActive(select);
  });
}

selectItems.forEach(function (item) {
  item.addEventListener('click', function () {
    const selectedValue = item.textContent.trim().toLowerCase();

    if (selectValue) selectValue.textContent = item.textContent.trim();
    toggleActive(select, false);
    filterProjects(selectedValue);
  });
});

let lastClickedBtn = document.querySelector('[data-filter-btn].active') || filterBtn[0];

filterBtn.forEach(function (button) {
  button.addEventListener('click', function () {
    const selectedValue = button.textContent.trim().toLowerCase();

    if (selectValue) selectValue.textContent = button.textContent.trim();
    filterProjects(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove('active');
    button.classList.add('active');
    lastClickedBtn = button;
  });
});


// Contact form
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');
const formStatus = document.querySelector('[data-form-status]');
const contactEmail = 'alhassanhossny@outlook.com';

const setFormStatus = function (message, statusClass = '') {
  if (!formStatus) return;

  formStatus.className = `form-status ${statusClass}`.trim();
  formStatus.textContent = message;
};

const updateFormState = function () {
  if (!form || !formBtn) return;

  formBtn.disabled = !form.checkValidity();
};

if (form) {
  formInputs.forEach(function (input) {
    input.addEventListener('input', function () {
      updateFormState();
      setFormStatus('');
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      setFormStatus('Please complete all fields before sending.', 'is-error');
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const fullName = String(formData.get('fullname') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const subject = `Portfolio inquiry from ${fullName || 'website visitor'}`;
    const body = [
      `Name: ${fullName}`,
      `Email: ${email}`,
      '',
      message,
    ].join('\n');

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormStatus('Your email app should open with the message ready to send.', 'is-success');
  });

  updateFormState();
}


// Page navigation
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navigationLinks.forEach(function (link, linkIndex) {
  link.addEventListener('click', function () {
    const targetPage = link.textContent.trim().toLowerCase();

    pages.forEach(function (page) {
      const isActive = targetPage === page.dataset.page;
      page.classList.toggle('active', isActive);
    });

    navigationLinks.forEach(function (navLink, navIndex) {
      const isCurrent = navIndex === linkIndex;
      navLink.classList.toggle('active', isCurrent);

      if (isCurrent) {
        navLink.setAttribute('aria-current', 'page');
      } else {
        navLink.removeAttribute('aria-current');
      }
    });

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  });
});
