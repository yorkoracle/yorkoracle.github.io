(async function() {
  'use strict';

  // --- Configuration ---
  const issues = [
    { issue: '2025-09-fall', title: 'Fall 2025', date: '2025-09-01', excerpt: 'Highlights: back-to-school features, student profiles, sports recap.' },
    { issue: '2025-06-summer', title: 'Summer 2025', date: '2025-06-15', excerpt: 'Graduation coverage, summer programs, student artwork.' }
    // Add more issue objects here
  ];

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

  function createIssueCard(issue) {
    const pdfPath = `pdfs/${issue.issue}.pdf`;
    const thumbPath = `pdfs/${issue.issue}-thumb.jpg`;

    return `
      <article class="issue-card" role="listitem">
        <a class="issue-link" href="${pdfPath}" target="_blank" rel="noopener">
          <div class="thumb" aria-hidden="true">
            <img src="${thumbPath}" alt="Cover for ${issue.title}" loading="lazy" />
          </div>
          <div class="issue-meta">
            <h3 class="issue-title">${issue.title}</h3>
            <time datetime="${issue.date}" class="issue-date">${new Date(issue.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</time>
            <p class="issue-excerpt">${issue.excerpt}</p>
          </div>
        </a>
      </article>
    `;
  }

  async function loadIssues() {
    const grid = document.getElementById('issuesGrid');
    if (!grid) return;

    // In a real application, you might fetch this data from a JSON file
    // For now, we'll use the 'issues' array defined at the top
    grid.innerHTML = issues.map(createIssueCard).join('');
  }

  // --- Initial execution ---
  document.addEventListener('DOMContentLoaded', () => {
    setCopyrightYear();
    setupMobileNav();
    loadIssues();
  });

})();
