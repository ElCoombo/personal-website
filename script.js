// Dark Mode Toggle Functionality

(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle.querySelector('.toggle-icon');

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark') {
    enableDarkMode();
  } else if (savedTheme === 'light') {
    disableDarkMode();
  } else if (prefersDark) {
    enableDarkMode();
  }

  function toggleTheme() {
    if (body.classList.contains('dark-theme')) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
  }

  function enableDarkMode() {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    icon.textContent = '☀️';
  }

  function disableDarkMode() {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    icon.textContent = '🌙';
  }

  themeToggle.addEventListener('click', toggleTheme);

  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });

  // Highlight active nav link based on current section
  const sections = document.querySelectorAll('.content-section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(currentSection)) {
        link.classList.add('active');
      }
    });
  });

})();


// ===== SLIDESHOW FUNCTIONALITY =====

let slideIndex = 0;
let autoSlideInterval;
const slides = document.querySelectorAll('.slide');
const thumbnails = document.querySelectorAll('.thumbnail');
const counter = document.querySelector('.slide-counter');

if (slides.length > 0) {
  showSlides(slideIndex);
  startAutoSlide();
}

function showSlides(n) {
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;
  
  slides.forEach(slide => slide.classList.remove('active'));
  thumbnails.forEach(thumb => thumb.classList.remove('active'));
  
  slides[slideIndex].classList.add('active');
  thumbnails[slideIndex].classList.add('active');
  
  if (counter) {
    counter.textContent = `${slideIndex + 1} / ${slides.length}`;
  }
}

function changeSlide(n) {
  stopAutoSlide();
  slideIndex += n;
  showSlides(slideIndex);
  startAutoSlide();
}

function currentSlide(n) {
  stopAutoSlide();
  slideIndex = n - 1;
  showSlides(slideIndex);
  startAutoSlide();
}

function startAutoSlide() {
  stopAutoSlide();
  autoSlideInterval = setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 3000);
  
  const container = document.querySelector('.slideshow-container');
  if (container) container.classList.add('playing');
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
  
  const container = document.querySelector('.slideshow-container');
  if (container) container.classList.remove('playing');
}

const slideshowContainer = document.querySelector('.slideshow-container');
if (slideshowContainer) {
  slideshowContainer.addEventListener('mouseenter', () => stopAutoSlide());
  slideshowContainer.addEventListener('mouseleave', () => startAutoSlide());
}

document.addEventListener('keydown', (e) => {
  if (!document.querySelector('.slideshow-container')) return;
  
  if (e.key === 'ArrowLeft') {
    stopAutoSlide();
    changeSlide(-1);
    startAutoSlide();
  } else if (e.key === 'ArrowRight') {
    stopAutoSlide();
    changeSlide(1);
    startAutoSlide();
  }
});


// ===== MODAL MANAGEMENT - CENTRALIZED =====

// Unified click handler for ALL modals
window.onclick = function(event) {
  const modals = document.querySelectorAll('.modal, .project-modal');
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
};

// Unified Escape key handler for ALL modals
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modals = document.querySelectorAll('.modal, .project-modal');
    modals.forEach(modal => {
      if (modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
});


// ===== CV MODAL FUNCTIONS =====

function openCVModal() {
  document.getElementById('cv-modal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeCVModal() {
  document.getElementById('cv-modal').style.display = 'none';
  document.body.style.overflow = 'auto';
}


// ===== GALLERY MODAL FUNCTIONS =====

function openGalleryModal(modalId) {
  const modal = document.getElementById(`${modalId}-modal`);
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeGalleryModal(modalId) {
  const modal = document.getElementById(`${modalId}-modal`);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}


// ===== PROJECT MODAL FUNCTIONS =====

function openProjectModal(projectId) {
  const modal = document.getElementById(`${projectId}-modal`);
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeProjectModal(projectId) {
  const modal = document.getElementById(`${projectId}-modal`);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Set up project trigger buttons
document.querySelectorAll('.popup-trigger').forEach(button => {
  button.addEventListener('click', function() {
    const projectId = this.getAttribute('data-project');
    openProjectModal(projectId);
  });
});