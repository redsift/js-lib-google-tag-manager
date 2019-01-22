# js-lib-google-tag-manager

`js-lib-google-tag-manager` is a helper library to setup Google Tag Manager. Depending on a cookies flag it propagates a `cookiesConsentYes` or `cookiesConsentNo` custom event to the tag manager, which can be used in your setup to trigger tags depending on the users cookies consent choice. Additionally, a `sendCustomEvent` is provided as part of this library to send a custom event to the tag manager.

You don't need to include the tag manager script in your HTML, it gets injected by this library.

### Usage

#### Cookies consent given

This code snippet will setup Google Tag Manager and send a `cookiesConsentYes` custom event which can be used to trigger tags in the configuration UI:

```javascript
import setupGoogleTagManager from '@redsift/js-lib-google-tag-manager';

const config = {
    id: 'GTAG-CONTAINER-ID',
    cookiesAllowed: true,
};
```

#### No cookies consent given

This code snippet will setup Google Tag Manager and send a `cookiesConsentNo` custom event which can be used to trigger tags in the configuration UI:

```javascript
import setupGoogleTagManager from '@redsift/js-lib-google-tag-manager';

const config = {
    id: 'GTAG-CONTAINER-ID',
    cookiesAllowed: false,
};
```

#### Send a custom event

This code snippet sends a custom event to Google Tag Manager. It can be used e.g. to propagate a button click. It mimics the signature of a Google Analytics event, with `category`, `action`, label` and `value` as parameters:

```javascript
import { sendCustomEvent } from '@redsift/js-lib-google-tag-manager';

sendCustomEvent({
    category: 'cta-clicked',
    action: 'signup',
    label: '/pricing',
    value: 1,
});
```

#### Helper functions

To store the cookies consent flag to localStorage use this:

```
import { setCookieConsent } from '@redsift/js-lib-google-tag-manager';

setCookiesConsent(true);
```

To read the flag use:

```
import { getCookieConsent } from '@redsift/js-lib-google-tag-manager';

const gaveConsent = getCookiesConsent();
```

The key used to store the flag in localStorage is `redsift/gave-cookie-consent`.
