var GA_ID = '__GA_MEASUREMENT_ID__';
var CONSENT_KEY = 'ga_consent';

function loadGA() {
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
}

function showBanner() {
  var banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML =
    '<div id="cookie-banner-inner">' +
    '<p>This website uses analytics to measure its audience.' +
    ' Do you accept cookies?</p>' +
    '<div id="cookie-banner-buttons">' +
    '<button id="cookie-refuse">Refuse</button>' +
    '<button id="cookie-accept">Accept</button>' +
    '</div>' +
    '</div>';
  document.body.appendChild(banner);

  document.getElementById('cookie-accept').addEventListener('click', function() {
    localStorage.setItem(CONSENT_KEY, 'granted');
    banner.remove();
    loadGA();
  });

  document.getElementById('cookie-refuse').addEventListener('click', function() {
    localStorage.setItem(CONSENT_KEY, 'denied');
    banner.remove();
  });
}

(function() {
  var consent = localStorage.getItem(CONSENT_KEY);
  if (consent === 'granted') {
    loadGA();
  } else if (!consent) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
})();
