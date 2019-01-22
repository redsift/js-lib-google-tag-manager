/* globals window */

import { injectScript, sendCookiesConsent } from './lib';

export default function setupGoogleTagManager({
  id,
  cookiesAllowed = false,
}) {
  injectScript({ id });
  sendCookiesConsent({ cookiesAllowed });
}

export {
  injectScript,
  sendCookiesConsent,
  sendCustomEvent,
  getCookieConsent,
  setCookieConsent,
} from './lib';
