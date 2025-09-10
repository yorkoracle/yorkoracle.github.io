(async function() {
  'use strict';

  // --- Configuration ---
  // --- Configuration ---
  const issues = [
    { issue: 'v3-i1', title: 'Vol 3, Issue 1', date: '2025-10-01', excerpt: 'Coming soon! Check back for the latest issue.' },
    { issue: 'v2-i2', title: 'Vol 2, Issue 2', date: '2025-05-01', excerpt: 'Highlights from the end of the year, student achievements, and more.' },
    { issue: 'v2-i1', title: 'Vol 2, Issue 1', date: '2024-12-01', excerpt: 'Kicking off the new school year with exciting stories and features.' },
    { issue: 'v1-i2', title: 'Vol 1, Issue 2', date: '2023-05-01', excerpt: 'A look back at the spring semester, with special graduation coverage.' },
    { issue: 'v1-i1', title: 'Vol 1, Issue 1', date: '2023-12-01', excerpt: 'The very first issue! Read about the launch of the newspaper and more.' }
    // Add more issue objects here
  ];

// --- DOM Elements ---
  const pdfViewer = document.getElementById('pdfViewer');
  const pdfFrame = document.getElementById('pdfFrame');
  const closePdfBtn = document.getElementById('closePdfBtn');
  const issuesGrid = document.getElementById('issuesGrid');

  // --- Functions ---
  function setCopyrightYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  function setupMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const primaryNav = document.getElementById('primaryNav');
    if (!navToggle || !primaryNav) return;

    navToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      primaryNav.classList.toggle('open');
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  function showPdf(pdfPath) {
    if (!pdfViewer || !pdfFrame) return;
    pdfFrame.src = pdfPath;
    pdfViewer.classList.add('visible');
    pdfViewer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function hidePdf() {
    if (!pdfViewer || !pdfFrame) return;
    pdfFrame.src = ''; // Clear the src to stop loading
    pdfViewer.classList.remove('visible');
    pdfViewer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore scrolling
  }

  function setupPdfViewer() {
    if (!pdfViewer || !closePdfBtn) return;
    closePdfBtn.addEventListener('click', hidePdf);

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && pdfViewer.classList.contains('visible')) {
        hidePdf();
      }
    });

    // Close by clicking background
    pdfViewer.addEventListener('click', (e) => {
      if (e.target === pdfViewer) {
        hidePdf();
      }
    });
  }

  function createIssueCard(issue) {
    const pdfPath = `pdfs/${issue.issue}.pdf`;

    return `
      <article class="issue-card" role="listitem">
        <button class="issue-link" data-pdf-path="${pdfPath}">
          <div class="issue-meta">
            <h3 class="issue-title">${issue.title}</h3>
            <time datetime="${issue.date}" class="issue-date">${new Date(issue.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</time>
            <p class="issue-excerpt">${issue.excerpt}</p>
          </div>
        </button>
      </article>
    `;
  }

  async function loadIssues() {
    if (!issuesGrid) return;

    issuesGrid.innerHTML = issues.map(createIssueCard).join('');

    // Add event listeners to the new buttons
    const issueLinks = issuesGrid.querySelectorAll('.issue-link');
    issueLinks.forEach(link => {
      link.addEventListener('click', () => {
        const pdfPath = link.dataset.pdfPath;
        if (pdfPath) {
          showPdf(pdfPath);
        }
      });
    });
  }

  // --- Initial execution ---
  document.addEventListener('DOMContentLoaded', () => {
    setCopyrightYear();
    setupMobileNav();
    setupPdfViewer();
    loadIssues();
  });

})();
