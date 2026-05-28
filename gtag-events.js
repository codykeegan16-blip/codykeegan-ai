// codykeegan.ai — GA4 custom event tracking
// Fires events for the high-value funnel actions:
//   subscribe_click · blueprint_card_click · audit_interest · external_link_click · pdf_download
// Loaded on every page after the GA4 gtag snippet.

(function() {
  function track(name, params) {
    if (typeof gtag === 'function') {
      try {
        gtag('event', name, params || {});
      } catch (e) {}
    }
  }

  // 1. subscribe_click — fires whenever any form on the site submits to Substack
  document.addEventListener('submit', function(e) {
    var form = e.target;
    if (form && form.action && form.action.indexOf('substack.com') !== -1) {
      track('subscribe_click', {
        source_page: window.location.pathname,
        form_class: (form.className || 'unknown').toString()
      });
    }
  }, true);

  // 2-4. Delegated click handler — walks up the DOM to find the relevant element
  document.addEventListener('click', function(e) {
    var target = e.target;
    var depth = 0;
    while (target && target !== document.body && depth < 8) {

      // Blueprint card click (homepage numbered cards)
      if (target.classList && target.classList.contains('issue')) {
        var trig = target.querySelector('.trigger');
        var titleEl = target.querySelector('.title');
        track('blueprint_card_click', {
          blueprint: trig ? trig.textContent.trim() : 'unknown',
          blueprint_title: titleEl ? titleEl.textContent.trim() : '',
          source_page: window.location.pathname
        });
        return;
      }

      // Anchor tag handling
      if (target.tagName === 'A') {
        var href = (target.getAttribute('href') || '').toString();
        var hrefFull = target.href || '';

        // Audit interest — links to /audit/ or audit-themed mailtos
        if (href.indexOf('/audit') === 0 || href.indexOf('/audit/') !== -1 ||
            (href.indexOf('mailto:') === 0 && href.toLowerCase().indexOf('audit') !== -1)) {
          track('audit_interest', {
            source_page: window.location.pathname,
            link_text: (target.textContent || '').substring(0, 80).trim()
          });
          return;
        }

        // External link click — exclude own domain and Substack
        if (hrefFull.indexOf('http') === 0 &&
            hrefFull.indexOf('codykeegan.ai') === -1 &&
            hrefFull.indexOf('codykeeganai.substack.com') === -1) {
          var platform = 'other';
          if (hrefFull.indexOf('tiktok.com') !== -1) platform = 'tiktok';
          else if (hrefFull.indexOf('instagram.com') !== -1) platform = 'instagram';
          else if (hrefFull.indexOf('facebook.com') !== -1) platform = 'facebook';
          else if (hrefFull.indexOf('youtube.com') !== -1) platform = 'youtube';
          else if (hrefFull.indexOf('linkedin.com') !== -1) platform = 'linkedin';
          else if (hrefFull.indexOf('x.com') !== -1 || hrefFull.indexOf('twitter.com') !== -1) platform = 'twitter';
          else if (hrefFull.indexOf('threads.net') !== -1) platform = 'threads';
          else if (hrefFull.indexOf('pinterest.com') !== -1) platform = 'pinterest';
          else if (hrefFull.indexOf('substack.com') !== -1) platform = 'substack';
          track('external_link_click', {
            platform: platform,
            url: hrefFull.substring(0, 200),
            source_page: window.location.pathname
          });
          return;
        }
      }

      target = target.parentElement;
      depth++;
    }
  }, true);

  // 5. pdf_download — homepage email-gate completion
  document.addEventListener('DOMContentLoaded', function() {
    var gateForm = document.getElementById('gate-form');
    if (gateForm) {
      gateForm.addEventListener('submit', function() {
        var trigger = document.getElementById('gate-trigger');
        var pdfEl = document.getElementById('gate-pdf');
        track('pdf_download', {
          blueprint: trigger ? trigger.value : 'unknown',
          pdf_url: pdfEl ? pdfEl.value : 'unknown'
        });
      }, true);
    }
  });
})();
