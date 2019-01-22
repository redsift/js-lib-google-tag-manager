/* eslint no-use-before-define: 0 */

const _cookieConsentKey = 'redsift/gave-cookie-consent';

export function injectScript({ id }) {
  (function(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', id);
}

export function sendCookiesConsent({ cookiesAllowed }) {
  _pushToDataLayer({
    event: cookiesAllowed ? 'cookiesConsentYes' : 'cookiesConsentNo',
  });
}

export function sendCustomEvent({ category, action, label, value }) {
  _pushToDataLayer({
    event: 'customEvent',
    ceCategory: category,
    ceAction: action,
    ceLabel: label,
    ceValue: value,
  });
}

function _pushToDataLayer(params) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(params);
}

// NOTE: if key is not set yet this function returns `null`:
export function getCookieConsent() {
  let key = null;
  let localStorage = null;

  // NOTE: Some browsers throw a `Security error` when accessing localStorage (e.g. in private mode):
  try {
    /* eslint no-use-before-define: 0 */ localStorage =
      window && window.localStorage ? window.localStorage : null;

    key = localStorage.getItem(_cookieConsentKey);
  } catch (err) {} // eslint-disable-line no-empty

  console.log('key:', key);
  return key === 'yes' ? true : key === null ? null : false;
}

export function setCookieConsent(flag) {
  let localStorage = null;

  // NOTE: Some browsers throw a `Security error` when accessing localStorage (e.g. in private mode):
  try {
    localStorage = window && window.localStorage ? window.localStorage : null;
  } catch (err) {} // eslint-disable-line no-empty

  let result = null;

  if (localStorage) {
    /* eslint no-use-before-define: 0 */ const value =
      flag === true ? 'yes' : 'no';

    localStorage.setItem(_cookieConsentKey, value);
    result = flag;
  }

  return result;
}
