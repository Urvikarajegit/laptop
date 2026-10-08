/**
 * GSAP Animation Suite: ScrollTrigger, Split Text, Image Transitions & Lenis Smooth Scroll
 */
document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP Plugins
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }

  // 1. Initialize Lenis Smooth Scrolling
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false,
    });

    window.lenis = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // -------------------------------------------------------------------------
  // Smooth Scroll Animation for All Nav Options & Anchor Links
  // -------------------------------------------------------------------------
  const scrollLinks = document.querySelectorAll('a[href^="#"], button[data-scroll-to]');
  scrollLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetSelector = link.getAttribute('href') || link.getAttribute('data-scroll-to');
      if (!targetSelector || targetSelector === '#' || targetSelector.length <= 1) return;

      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        e.preventDefault();

        // Close mobile drawer if active
        const mobileDrawer = document.getElementById('mobileDrawer');
        const mobileToggle = document.getElementById('mobileMenuToggle');
        if (mobileDrawer && mobileDrawer.classList.contains('active')) {
          mobileDrawer.classList.remove('active');
          if (mobileToggle) mobileToggle.classList.remove('open');
        }

        // Perform cinematic smooth scroll animation
        if (lenis) {
          lenis.scrollTo(targetElement, {
            offset: -68,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        } else {
          const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 68;
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
        }

        // Immediately ensure target elements are visible without requiring double refresh
        setTimeout(() => {
          if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
          if (targetSelector === '#projects') {
            gsap.to('.reveal-project', { opacity: 1, y: 0, duration: 0.35, clearProps: 'opacity,transform' });
          } else if (targetSelector === '#skills') {
            gsap.set('.skill-card', { opacity: 1, clearProps: 'opacity' });
          }
        }, 150);
      }
    });
  });

  // -------------------------------------------------------------------------
  // 2. SPLIT TEXT ANIMATIONS (Alphabet by Alphabet with Opacity Change)
  // -------------------------------------------------------------------------
  
  // Hero Title Split Text Stagger (Alphabet by Alphabet)
  const heroTitle = document.querySelector('.split-text-hero');
  if (heroTitle) {
    if (typeof SplitType !== 'undefined') {
      const splitHero = new SplitType(heroTitle, { types: 'words,chars', tagName: 'span' });

      gsap.fromTo(splitHero.chars, 
        { opacity: 0, y: 28, rotateX: -35 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.018, // Alphabet by alphabet progression
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
          clearProps: 'transform'
        }
      );
    } else {
      gsap.fromTo(heroTitle, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.2 });
    }
  }

  // Hero Subtitle Split Text Animation (Alphabet by Alphabet with Opacity Change - Snappy Stream)
  const heroBioSub = document.querySelector('.split-text-bio');
  if (heroBioSub) {
    if (typeof SplitType !== 'undefined') {
      const splitBio = new SplitType(heroBioSub, { types: 'words,chars', tagName: 'span' });

      gsap.fromTo(splitBio.chars,
        { opacity: 0, y: 6, filter: 'blur(2px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.006, // Crisp, snappy streaming duration per character
          duration: 0.3,
          ease: 'power1.out',
          delay: 0.35,
          clearProps: 'filter,transform'
        }
      );
    } else {
      gsap.fromTo(heroBioSub, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.35 });
    }
  }

  // Section Headers Split Text Stagger on Scroll (Alphabet by Alphabet)
  const sectionTitles = document.querySelectorAll('.split-text-section');
  sectionTitles.forEach((title) => {
    if (typeof SplitType !== 'undefined') {
      const splitSec = new SplitType(title, { types: 'words,chars', tagName: 'span' });

      gsap.fromTo(splitSec.chars,
        { opacity: 0, y: 16, rotateX: -15 },
        {
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.01,
          duration: 0.45,
          ease: 'power2.out'
        }
      );
    } else {
      gsap.fromTo(title,
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: title,
            start: 'top 85%'
          },
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        }
      );
    }
  });

  // About Section Subheading Split Text Animation (Alphabet by Alphabet)
  const aboutHeading = document.querySelector('.split-text-about-title');
  if (aboutHeading) {
    if (typeof SplitType !== 'undefined') {
      const splitAboutHead = new SplitType(aboutHeading, { types: 'words,chars', tagName: 'span' });
      gsap.fromTo(splitAboutHead.chars,
        { opacity: 0, y: 12, rotateX: -15 },
        {
          scrollTrigger: {
            trigger: aboutHeading,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.012,
          duration: 0.45,
          ease: 'power2.out'
        }
      );
    } else {
      gsap.fromTo(aboutHeading,
        { opacity: 0, y: 15 },
        {
          scrollTrigger: {
            trigger: aboutHeading,
            start: 'top 85%'
          },
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        }
      );
    }
  }

  // About Section Paragraphs: Fast ChatGPT Stream (Para-by-Para Sequential Alphabet Stagger with Reduced Duration)
  const aboutNarrative = document.querySelector('.about-narrative');
  const aboutParagraphs = document.querySelectorAll('.split-text-about');

  if (aboutNarrative && aboutParagraphs.length > 0) {
    if (typeof SplitType !== 'undefined') {
      // Create master sequential timeline triggered on scroll
      const chatGptTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: aboutNarrative,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      });

      aboutParagraphs.forEach((p, idx) => {
        const splitP = new SplitType(p, { types: 'words,chars', tagName: 'span' });

        // Set all characters to invisible initially
        gsap.set(splitP.chars, { opacity: 0, y: 3 });

        // Stream this paragraph alphabet-by-alphabet cleanly with snappy pace
        chatGptTimeline.to(
          splitP.chars,
          {
            opacity: 1,
            y: 0,
            stagger: 0.0055, // Snappy fast ChatGPT streaming pace
            duration: 0.18,
            ease: 'power1.out'
          },
          idx === 0 ? '+=0.1' : '+=0.12' // Minimal clean pause between paragraphs
        );
      });
    } else {
      gsap.fromTo(
        aboutParagraphs,
        { opacity: 0, y: 15 },
        {
          scrollTrigger: {
            trigger: aboutNarrative,
            start: 'top 82%'
          },
          opacity: 1,
          y: 0,
          stagger: 0.4,
          duration: 0.6,
          ease: 'power2.out'
        }
      );
    }
  }

  // -------------------------------------------------------------------------
  // 3. HERO ENTRANCE SEQUENCES
  // -------------------------------------------------------------------------
  
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .fromTo('.hero-badge', { opacity: 0, y: -20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, 0.1)
    .fromTo('.hero-cta-group .btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.7 }, 0.8)
    .fromTo('.hero-stat-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.7 }, 1.0)
    .fromTo('.dna-canvas-card', { opacity: 0, scale: 0.92, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'back.out(1.4)' }, 0.3);

  // Animated Numbers Counter on Scroll
  const counterElements = document.querySelectorAll('.counter-value');
  counterElements.forEach((counter) => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const isDecimal = target % 1 !== 0;

    gsap.fromTo(counter, 
      { innerText: 0 }, 
      {
        innerText: target,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: isDecimal ? 0.01 : 1 },
        scrollTrigger: {
          trigger: counter,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        onUpdate: function() {
          if (isDecimal) {
            counter.innerText = Number(this.targets()[0].innerText).toFixed(2);
          } else {
            counter.innerText = Number(this.targets()[0].innerText).toLocaleString();
          }
        }
      }
    );
  });

  // -------------------------------------------------------------------------
  // 4. IMAGE TRANSITIONS & REVEAL CLIP-PATHS (Smooth ScrollTrigger Reveals)
  // -------------------------------------------------------------------------
  
  const revealImages = document.querySelectorAll('.image-transition-reveal');
  revealImages.forEach((wrap) => {
    const img = wrap.querySelector('img');
    
    // Set initial clip path state
    gsap.set(wrap, {
      clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
    });

    if (img) {
      gsap.set(img, { scale: 1.25 });
    }

    gsap.to(wrap, {
      scrollTrigger: {
        trigger: wrap,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1.2,
      ease: 'power4.inOut'
    });

    if (img) {
      gsap.to(img, {
        scrollTrigger: {
          trigger: wrap,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        scale: 1,
        duration: 1.4,
        ease: 'power3.out'
      });

      // Subtle parallax scrub while scrolling
      gsap.to(img, {
        scrollTrigger: {
          trigger: wrap,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        },
        yPercent: 8,
        ease: 'none'
      });
    }
  });

  // -------------------------------------------------------------------------
  // 5. PROJECT CARDS STAGGER & HOVER REVEAL (Resilient ScrollTrigger & ClearProps)
  // -------------------------------------------------------------------------
  
  const projectCards = document.querySelectorAll('.reveal-project');
  const projectsGrid = document.querySelector('.projects-grid');

  if (projectCards.length > 0 && projectsGrid) {
    ScrollTrigger.create({
      trigger: projectsGrid,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.fromTo(projectCards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'opacity,transform'
          }
        );
      }
    });

    // Safety fallback: If cards are in view on page load or after navigation, ensure they are visible
    const ensureProjectsVisible = () => {
      const rect = projectsGrid.getBoundingClientRect();
      if (rect.top < window.innerHeight + 150) {
        gsap.to(projectCards, { opacity: 1, y: 0, duration: 0.4, clearProps: 'opacity,transform' });
      }
    };
    ensureProjectsVisible();
    window.addEventListener('scroll', ensureProjectsVisible, { passive: true, once: true });
  }

  // -------------------------------------------------------------------------
  // 6. SKILLS MATRIX BARS ON SCROLL
  // -------------------------------------------------------------------------
  
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    ScrollTrigger.create({
      trigger: skillsSection,
      start: 'top 82%',
      onEnter: () => {
        const activeCards = document.querySelectorAll('.skills-grid.active .skill-card');
        gsap.fromTo(activeCards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set('.skill-card', { opacity: 1, clearProps: 'opacity' });
            }
          }
        );

        // Trigger bar fill animation
        activeCards.forEach((card) => {
          const fill = card.querySelector('.skill-bar-fill');
          const percentEl = card.querySelector('.meter-percent');
          if (fill && percentEl) {
            const targetWidth = percentEl.textContent.trim();
            fill.style.width = '0%';
            setTimeout(() => {
              fill.style.width = targetWidth;
            }, 80);
          }
        });
      }
    });
  }

  // -------------------------------------------------------------------------
  // 7. TIMELINE PROGRESS LINE SCRUB & ITEMS STAGGER
  // -------------------------------------------------------------------------
  
  const timelineContainer = document.querySelector('.timeline-container');
  const progressLine = document.getElementById('timelineProgressLine');
  const timelineItems = document.querySelectorAll('.reveal-timeline-item');

  if (timelineContainer && progressLine) {
    gsap.fromTo(progressLine, 
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineContainer,
          start: 'top 75%',
          end: 'bottom 85%',
          scrub: true
        }
      }
    );
  }

  timelineItems.forEach((item, index) => {
    const isLeft = item.classList.contains('timeline-left');
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      x: isLeft ? -40 : 40,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  // -------------------------------------------------------------------------
  // 8. LAB NOTES CARDS STAGGER
  // -------------------------------------------------------------------------
  
  const noteCards = document.querySelectorAll('.reveal-note');
  gsap.from(noteCards, {
    scrollTrigger: {
      trigger: '.notes-grid',
      start: 'top 82%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power2.out'
  });

  // -------------------------------------------------------------------------
  // 9. NAVBAR DYNAMIC SCROLL CLASS
  // -------------------------------------------------------------------------
  
  const siteHeader = document.getElementById('siteHeader');
  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: { className: 'scrolled', targets: siteHeader }
  });

  // -------------------------------------------------------------------------
  // 10. ELIMINATE OPACITY & LAYOUT-SHIFT ISSUES ON INITIAL LOAD
  // -------------------------------------------------------------------------
  const refreshAndReveal = () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
    gsap.set('.reveal-project, .skill-card, .reveal-note', { opacity: 1, clearProps: 'opacity' });
  };

  // When all external assets (images, fonts) finish loading
  window.addEventListener('load', refreshAndReveal);

  // Monitor image loads individually to prevent premature ScrollTrigger calculation
  document.querySelectorAll('img').forEach((img) => {
    if (!img.complete) {
      img.addEventListener('load', () => {
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      }, { once: true });
    }
  });

  // Short timer safety reveal (guarantees content is never stuck at opacity 0)
  setTimeout(refreshAndReveal, 500);

});
