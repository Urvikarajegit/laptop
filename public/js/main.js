/**
 * Main Interactive Application Controller for Urvika Biotechnology Portfolio
 */
document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------------------
  // 0. THEME CONTROLLER (Dark / Light Mode)
  // -------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const metaColorScheme = document.querySelector('meta[name="color-scheme"]');

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    if (metaColorScheme) {
      metaColorScheme.setAttribute('content', theme === 'dark' ? 'dark' : 'light');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch(e) {}

    // Update mobile toggle label if present
    const mobileThemeText = document.querySelector('.mobile-theme-text');
    if (mobileThemeText) {
      mobileThemeText.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
  }

  function toggleTheme() {
    const current = getCurrentTheme();
    const nextTheme = current === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTheme();
    });
  }

  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTheme();
    });
  }

  // Document-level fallback delegation to guarantee theme toggle always triggers
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#themeToggleBtn, #mobileThemeToggleBtn, .theme-toggle-btn');
    if (btn && btn !== themeToggleBtn && btn !== mobileThemeToggleBtn) {
      e.preventDefault();
      toggleTheme();
    }
  });

  // React to OS-level theme changes when user has not explicitly overridden
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      try {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      } catch (err) {}
    });
  }

  // Initialize UI label state
  const initialTheme = getCurrentTheme();
  const mobileThemeText = document.querySelector('.mobile-theme-text');
  if (mobileThemeText) {
    mobileThemeText.textContent = initialTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
  }

  // -------------------------------------------------------------------------
  // 1. MOBILE NAVIGATION DRAWER
  // -------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
      mobileToggle.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        mobileToggle.classList.remove('open');
      });
    });
  }

  // -------------------------------------------------------------------------
  // 2. DAY IN THE LIFE TAB SWITCHER (About Section - Optional)
  // -------------------------------------------------------------------------
  const dayTabs = document.querySelectorAll('.timeline-tab');
  const dayContentBox = document.getElementById('dayContentBox');

  if (dayTabs && dayTabs.length > 0 && dayContentBox) {
    const dayScheduleData = {
      morning: `<strong>09:00 AM — Wet-Lab Bench:</strong> Setting up PCR thermal cyclers, running agarose gel electrophoresis to verify plasmid inserts, and maintaining bacterial cultures in the incubator.`,
      afternoon: `<strong>02:00 PM — Dry-Lab Coding:</strong> Writing Biopython scripts for FASTA sequence manipulation, running AutoDock Vina molecular docking jobs, and analyzing RNA-seq differential expression in R.`,
      evening: `<strong>06:00 PM — Journal & Club:</strong> Leading discussions at the University Biotech Society, reviewing latest Nature/Cell CRISPR papers, and planning upcoming wet-lab workshops for juniors.`
    };

    dayTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        dayTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const timeKey = tab.getAttribute('data-time');
        if (dayContentBox && dayScheduleData[timeKey]) {
          if (window.gsap) {
            gsap.to(dayContentBox, {
              opacity: 0,
              y: 8,
              duration: 0.15,
              onComplete: () => {
                dayContentBox.innerHTML = `<p>${dayScheduleData[timeKey]}</p>`;
                gsap.to(dayContentBox, { opacity: 1, y: 0, duration: 0.25 });
              }
            });
          } else {
            dayContentBox.innerHTML = `<p>${dayScheduleData[timeKey]}</p>`;
          }
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 3. WET-LAB VS DRY-LAB SKILLS TAB SWITCHER
  // -------------------------------------------------------------------------
  const skillTabBtns = document.querySelectorAll('.skill-tab-btn');
  const dryLabGrid = document.getElementById('dryLabGrid');
  const wetLabGrid = document.getElementById('wetLabGrid');

  skillTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tabType = btn.getAttribute('data-tab');

      if (tabType === 'dry') {
        dryLabGrid.classList.add('active');
        wetLabGrid.classList.remove('active');
        animateSkillGrid(dryLabGrid);
      } else {
        wetLabGrid.classList.add('active');
        dryLabGrid.classList.remove('active');
        animateSkillGrid(wetLabGrid);
      }
    });
  });

  function animateSkillGrid(grid) {
    const cards = grid.querySelectorAll('.skill-card');
    if (window.gsap) {
      gsap.fromTo(cards, 
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.06, 
          duration: 0.4, 
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(cards, { opacity: 1, clearProps: 'opacity' });
          }
        }
      );
    } else {
      cards.forEach(c => { c.style.opacity = '1'; });
    }

    // Animate progress meter bars
    cards.forEach((card) => {
      const fill = card.querySelector('.skill-bar-fill');
      const percentEl = card.querySelector('.meter-percent');
      if (fill && percentEl) {
        const targetPercent = percentEl.textContent.trim();
        fill.style.width = '0%';
        setTimeout(() => {
          fill.style.width = targetPercent;
        }, 50);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 4. INTERACTIVE VIRTUAL AGAROSE GEL ELECTROPHORESIS RUNNER
  // -------------------------------------------------------------------------
  const runGelBtn = document.getElementById('runGelBtn');
  const gelBands = document.querySelectorAll('.gel-band');

  if (runGelBtn) {
    let isGelRunning = false;

    runGelBtn.addEventListener('click', () => {
      if (isGelRunning) return;
      isGelRunning = true;

      runGelBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Running 100V (Simulating 45m)...';
      runGelBtn.classList.add('btn-primary');

      const gelTank = document.querySelector('.gel-tank-container');
      if (gelTank) gelTank.classList.add('gel-running');

      // Reset band positions to near wells
      gelBands.forEach(band => {
        band.style.top = '10px';
        band.style.opacity = '0.3';
      });

      // Animate migration down the gel matrix based on molecular weight
      setTimeout(() => {
        gelBands.forEach(band => {
          band.style.opacity = '0.9';
          if (band.classList.contains('b-10000')) band.style.top = '22px';
          else if (band.classList.contains('b-6000')) band.style.top = '44px';
          else if (band.classList.contains('b-4000')) band.style.top = '68px';
          else if (band.classList.contains('b-2000')) band.style.top = '98px';
          else if (band.classList.contains('b-1500')) band.style.top = '112px';
          else if (band.classList.contains('b-1000')) band.style.top = '130px';
          else if (band.classList.contains('b-500')) band.style.top = '148px';
          else if (band.classList.contains('b-primer-dimer')) band.style.top = '154px';
        });

        setTimeout(() => {
          if (gelTank) gelTank.classList.remove('gel-running');
          runGelBtn.innerHTML = '<i class="fa-solid fa-check"></i> Migration Complete (1.2% Agarose)';
          setTimeout(() => {
            runGelBtn.innerHTML = '<i class="fa-solid fa-bolt"></i> Re-Run 100V Voltage';
            isGelRunning = false;
          }, 2500);
        }, 1500);

      }, 300);
    });
  }

  // -------------------------------------------------------------------------
  // 5. PROJECT DETAILS MODAL
  // -------------------------------------------------------------------------
  const projectModal = document.getElementById('projectModal');
  const closeProjectBtn = document.getElementById('closeProjectBtn');
  const modalProjectCategory = document.getElementById('modalProjectCategory');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalProjectBody = document.getElementById('modalProjectBody');
  const openProjectModalBtns = document.querySelectorAll('.open-project-modal-btn');

  openProjectModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const category = btn.getAttribute('data-category');
      const image = btn.getAttribute('data-image');
      const desc = btn.getAttribute('data-desc');
      const metric = btn.getAttribute('data-metric') || btn.getAttribute('data-metrics') || '';
      const report = btn.getAttribute('data-report');
      const github = btn.getAttribute('data-github');
      
      let tools = [];
      let highlights = [];
      try {
        tools = JSON.parse(btn.getAttribute('data-tools') || '[]');
        highlights = JSON.parse(btn.getAttribute('data-highlights') || '[]');
      } catch(e){}

      modalProjectCategory.textContent = category;
      modalProjectTitle.textContent = title;

      let highlightsHtml = highlights.map(h => `<li><i class="fa-solid fa-check text-primary mr-1"></i> ${h}</li>`).join('');
      let toolsHtml = tools.map(t => `<span class="tool-tag">${t}</span>`).join('');

      modalProjectBody.innerHTML = `
        <div class="modal-project-img-wrap" style="margin-bottom: 20px; border-radius: 14px; overflow: hidden; max-height: 280px; background: #f1f5f9;">
          <img src="${image}" alt="${title}" style="width:100%; height:100%; object-fit: cover; display:block;">
        </div>
        <p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 20px; color: var(--text-main);">${desc}</p>
        
        <h4 style="font-size: 0.95rem; margin-bottom: 10px; color: var(--primary); font-weight: 700;">Key Methodologies & Findings</h4>
        <ul style="list-style:none; padding-left:0; margin-bottom: 20px; display:flex; flex-direction:column; gap:8px;">
          ${highlightsHtml}
        </ul>

        ${metric ? `
        <div class="project-metric-box" style="margin-bottom: 20px;">
          <i class="fa-solid fa-award"></i>
          <span>${metric}</span>
        </div>
        ` : ''}

        <h4 style="font-size: 0.9rem; margin-bottom: 8px; color: var(--text-muted);">Technologies & Laboratory Equipment</h4>
        <div class="project-tools" style="margin-bottom: 24px;">
          ${toolsHtml}
        </div>

        <div class="modal-footer-actions" style="display:flex; justify-content:space-between; align-items:center; gap:12px; border-top:1px solid var(--border-subtle); padding-top:18px; margin-top:20px; flex-wrap:wrap;">
          <button type="button" class="btn btn-outline-sm modal-dismiss-btn" id="modalInnerCloseBtn" data-cursor="CLOSE">
            <i class="fa-solid fa-xmark"></i> Close Details
          </button>
          <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
            ${report ? `
              <a href="${report}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-sm" data-cursor="REPORT">
                <i class="fa-solid fa-file-pdf"></i> Read Full Report (PDF) <i class="fa-solid fa-arrow-up-right-from-square ml-1"></i>
              </a>
            ` : ''}
            ${github && github !== '#' ? `
              <a href="${github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-sm" data-cursor="GITHUB">
                <i class="fa-brands fa-github"></i> View GitHub
              </a>
            ` : ''}
          </div>
        </div>
      `;

      // Reset scroll position to top
      modalProjectBody.scrollTop = 0;

      // Open Modal and pause Lenis to allow smooth inner column scroll
      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.lenis) {
        window.lenis.stop();
      }

      // Attach listener to newly created bottom close button
      const innerCloseBtn = modalProjectBody.querySelector('#modalInnerCloseBtn');
      if (innerCloseBtn) {
        innerCloseBtn.addEventListener('click', closeProject);
      }
    });
  });

  const closeProject = () => {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
    }
  };

  if (closeProjectBtn) closeProjectBtn.addEventListener('click', closeProject);

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProject();
    });
  }

  // -------------------------------------------------------------------------
  // 5b. CERTIFICATE QUICK LOOK MODAL
  // -------------------------------------------------------------------------
  const certModal = document.getElementById('certModal');
  const modalCertBadge = document.getElementById('modalCertBadge');
  const modalCertTitle = document.getElementById('modalCertTitle');
  const modalCertBody = document.getElementById('modalCertBody');
  const closeCertModalBtn = document.getElementById('closeCertModalBtn');

  const normalizeCertPath = (p) => {
    if (!p || p === '#' || p.startsWith('http://') || p.startsWith('https://')) return p;
    if (window.location.protocol === 'file:' && p.startsWith('/')) {
      return '.' + p;
    }
    return p;
  };

  const closeCertModal = () => {
    if (certModal) {
      certModal.classList.remove('active');
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
    }
  };

  const openCertificateModal = (triggerEl) => {
    if (!certModal) return;
    const card = triggerEl.closest('.cert-card') || triggerEl;
    const title = card.getAttribute('data-title') || '';
    const issuer = card.getAttribute('data-issuer') || '';
    const platform = card.getAttribute('data-platform') || '';
    const issueDate = card.getAttribute('data-date') || '';
    const credentialId = card.getAttribute('data-id') || '';
    const badge = card.getAttribute('data-badge') || 'Verified Credential';
    let fileUrl = normalizeCertPath(card.getAttribute('data-file') || card.getAttribute('data-drive') || '#');
    let image = normalizeCertPath(card.getAttribute('data-image') || '/images/certificate-placeholder.svg');
    let driveUrl = normalizeCertPath(card.getAttribute('data-drive') || '#');
    let verifyUrl = normalizeCertPath(card.getAttribute('data-verify') || '#');
    const desc = card.getAttribute('data-desc') || '';

    let skills = [];
    try {
      skills = JSON.parse(card.getAttribute('data-skills') || '[]');
    } catch (err) {}

    if (modalCertBadge) modalCertBadge.innerHTML = `<i class="fa-solid fa-award"></i> ${badge}`;
    if (modalCertTitle) modalCertTitle.textContent = title;

    let skillsHtml = skills.map(s => `<span class="cert-skill-tag">${s}</span>`).join('');

    if (modalCertBody) {
      modalCertBody.innerHTML = `
        <div class="modal-cert-preview-wrap">
          <img src="${image}" alt="${title} Certificate Preview" class="modal-cert-img" />
          <div class="modal-cert-badge-overlay">
            <span class="cert-placeholder-tag" style="background: rgba(16, 185, 129, 0.95); color: #fff;"><i class="fa-solid fa-certificate"></i> Verified Certificate Document</span>
          </div>
        </div>

        <div class="modal-cert-details">
          <div class="modal-cert-meta-row">
            <div class="meta-item">
              <span class="meta-label">Issuing Authority</span>
              <strong class="meta-val"><i class="fa-solid fa-building-columns text-primary mr-1"></i> ${issuer} ${platform ? `(${platform})` : ''}</strong>
            </div>
            <div class="meta-item">
              <span class="meta-label">Date of Issue</span>
              <strong class="meta-val"><i class="fa-regular fa-calendar text-primary mr-1"></i> ${issueDate}</strong>
            </div>
            <div class="meta-item">
              <span class="meta-label">Credential ID</span>
              <strong class="meta-val font-mono"><i class="fa-solid fa-fingerprint text-primary mr-1"></i> ${credentialId}</strong>
            </div>
          </div>

          ${desc ? `
          <h4 style="font-size: 0.95rem; margin-top: 18px; margin-bottom: 8px; color: var(--primary); font-weight: 700;">Curriculum & Competencies</h4>
          <p style="font-size: 0.95rem; line-height: 1.65; color: var(--text-secondary); margin-bottom: 16px;">${desc}</p>
          ` : ''}

          <h4 style="font-size: 0.88rem; margin-bottom: 8px; color: var(--text-muted); font-weight: 600;">Key Skills Acquired</h4>
          <div class="cert-skills-list" style="margin-bottom: 24px;">
            ${skillsHtml}
          </div>

          <div class="modal-cert-actions" style="justify-content: flex-end;">
            <div class="action-right-group" style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
              ${verifyUrl && verifyUrl !== '#' ? `
                <a href="${verifyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-sm">
                  <i class="fa-solid fa-shield-halved"></i> Verify Official
                </a>
              ` : ''}
              ${fileUrl && fileUrl !== '#' ? `
                <a href="${fileUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-sm">
                  <i class="fa-solid fa-file-lines"></i> Open Full Document <i class="fa-solid fa-arrow-up-right-from-square ml-1"></i>
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      `;

      modalCertBody.scrollTop = 0;
    }

    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.lenis) {
      window.lenis.stop();
    }
  };

  // Delegated click handler: handles clicks on .btn-cert-quicklook, .open-cert-modal-btn, .cert-thumb-preview, or .cert-card-clickable
  document.addEventListener('click', (e) => {
    // If clicked inside an external link like "View PDF" or "Verify", let the link navigate
    if (e.target.closest('a.btn-cert-drive, a.stop-modal-prop')) return;

    // Check if clicked inside preview button, thumbnail preview, or card
    const certTrigger = e.target.closest('.open-cert-modal-btn, .btn-cert-quicklook, .cert-thumb-preview, .cert-card-clickable');
    if (certTrigger) {
      e.preventDefault();
      openCertificateModal(certTrigger);
    }
  });

  if (closeCertModalBtn) closeCertModalBtn.addEventListener('click', closeCertModal);
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeCertModal();
    });
  }

  // Global Esc key handler for all modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProject();
      closeCertModal();
      closeResume();
    }
  });

  // -------------------------------------------------------------------------
  // 6. RESUME / CV MODAL
  // -------------------------------------------------------------------------
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtn = document.getElementById('openResumeBtn');
  const openResumeContactBtn = document.getElementById('openResumeContactBtn');
  const closeResumeBtn = document.getElementById('closeResumeBtn');
  const footerCloseResumeBtn = document.getElementById('footerCloseResumeBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  const openResume = () => {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.lenis) {
        window.lenis.stop();
      }
      const resumeBody = resumeModal.querySelector('.modal-body');
      if (resumeBody) resumeBody.scrollTop = 0;
    }
  };

  const closeResume = () => {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
    }
  };

  const mobileOpenResumeBtn = document.getElementById('mobileOpenResumeBtn');
  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (openResumeContactBtn) openResumeContactBtn.addEventListener('click', openResume);
  if (mobileOpenResumeBtn) {
    mobileOpenResumeBtn.addEventListener('click', () => {
      const mobileDrawer = document.getElementById('mobileDrawer');
      const mobileToggle = document.getElementById('mobileMenuToggle');
      if (mobileDrawer) mobileDrawer.classList.remove('active');
      if (mobileToggle) mobileToggle.classList.remove('open');
      openResume();
    });
  }
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);
  if (footerCloseResumeBtn) footerCloseResumeBtn.addEventListener('click', closeResume);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  // -------------------------------------------------------------------------
  // 6b. GET IN TOUCH / CONTACT MODAL
  // -------------------------------------------------------------------------
  const contactModal = document.getElementById('contactModal');
  const openContactBtn = document.getElementById('openContactBtn');
  const mobileOpenContactBtn = document.getElementById('mobileOpenContactBtn');
  const closeContactBtn = document.getElementById('closeContactBtn');
  const footerCloseContactBtn = document.getElementById('footerCloseContactBtn');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const contactEmailAddress = document.getElementById('contactEmailAddress');
  const copySuccessHint = document.getElementById('copySuccessHint');

  const openContact = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (contactModal) {
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.lenis) {
        window.lenis.stop();
      }
    }
  };

  const closeContact = () => {
    if (contactModal) {
      contactModal.classList.remove('active');
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
    }
  };

  if (openContactBtn) openContactBtn.addEventListener('click', openContact);
  if (mobileOpenContactBtn) {
    mobileOpenContactBtn.addEventListener('click', (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const mobileDrawer = document.getElementById('mobileDrawer');
      const mobileToggle = document.getElementById('mobileMenuToggle');
      if (mobileDrawer) mobileDrawer.classList.remove('active');
      if (mobileToggle) mobileToggle.classList.remove('open');
      openContact();
    });
  }

  if (closeContactBtn) closeContactBtn.addEventListener('click', closeContact);
  if (footerCloseContactBtn) footerCloseContactBtn.addEventListener('click', closeContact);

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) closeContact();
    });
  }

  if (copyEmailBtn && contactEmailAddress) {
    copyEmailBtn.addEventListener('click', () => {
      const email = contactEmailAddress.textContent.trim();
      const onCopied = () => {
        copyEmailBtn.classList.add('copied');
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span class="copy-btn-text">Copied!</span>';
        if (copySuccessHint) copySuccessHint.style.display = 'flex';

        setTimeout(() => {
          copyEmailBtn.classList.remove('copied');
          copyEmailBtn.innerHTML = '<i class="fa-regular fa-copy"></i> <span class="copy-btn-text">Copy Email</span>';
          if (copySuccessHint) copySuccessHint.style.display = 'none';
        }, 2500);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(onCopied).catch(() => {
          const ta = document.createElement('textarea');
          ta.value = email;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          onCopied();
        });
      } else {
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        onCopied();
      }
    });
  }

  // Global Escape key to dismiss any active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (projectModal && projectModal.classList.contains('active')) closeProject();
      if (resumeModal && resumeModal.classList.contains('active')) closeResume();
      if (contactModal && contactModal.classList.contains('active')) closeContact();
      if (certModal && certModal.classList.contains('active')) {
        certModal.classList.remove('active');
        document.body.style.overflow = '';
        if (window.lenis) window.lenis.start();
      }
    }
  });

  // Ensure modal bodies can scroll independently without outer document capture
  const enableNativeInnerScroll = (el) => {
    if (!el) return;
    el.addEventListener('wheel', (e) => {
      e.stopPropagation();
    }, { passive: true });
  };
  enableNativeInnerScroll(modalProjectBody);
  enableNativeInnerScroll(document.querySelector('.resume-preview-body'));

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      document.body.classList.add('printing-resume');
      window.print();
    });
  }

  window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing-resume');
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal) projectModal.classList.remove('active');
      if (resumeModal) resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });


  // -------------------------------------------------------------------------
  // 8. CONTACT FORM ASYNC SUBMISSION
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const submitFormBtn = document.getElementById('submitFormBtn');
  const formStatusMsg = document.getElementById('formStatusMsg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name') ? document.getElementById('name').value.trim() : '';
      const subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : 'Research Inquiry';
      const message = document.getElementById('message') ? document.getElementById('message').value.trim() : '';

      // 100% Frontend - opens user's email client directly without backend
      const mailtoUrl = `mailto:rajeurvika@gmail.com?subject=${encodeURIComponent(subject || 'Research Inquiry')}&body=${encodeURIComponent(`From: ${name}\n\n${message}`)}`;
      window.location.href = mailtoUrl;

      showFormStatus('Opening your email client to send message to rajeurvika@gmail.com...', 'success');
    });
  }

  function showFormStatus(msg, type) {
    if (!formStatusMsg) return;
    formStatusMsg.textContent = msg;
    formStatusMsg.className = `form-status-msg ${type}`;
    formStatusMsg.style.display = 'block';

    if (window.gsap) {
      gsap.fromTo(formStatusMsg, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
    }
  }

  // -------------------------------------------------------------------------
  // 9. BACK TO TOP BUTTON
  // -------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

});
