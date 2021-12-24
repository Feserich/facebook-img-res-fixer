/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// Override the user-agent HTTP headers sent to Facebook

// Keep in sync with include_globs in manifest.json
const WebsiteTLDs = /^https?:\/\/(www|m)\.facebook\./;

const WebsiteMatchPatterns = browser.runtime.getManifest().content_scripts[0].matches;

function rewriteUserAgentForWebsiteTLDs(e) {
  if (e.url.match(WebsiteTLDs)) {
    for (let header of e.requestHeaders) {
      if (header.name.toLowerCase() === "user-agent") {
        header.value = getUserAgentOverride(header.value);
      }
    }
    return {requestHeaders: e.requestHeaders};
  }
}

browser.webRequest.onBeforeSendHeaders.addListener(
  rewriteUserAgentForWebsiteTLDs,
  {urls: WebsiteMatchPatterns},
  ["blocking", "requestHeaders"]
);


