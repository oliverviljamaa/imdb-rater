const COOKIE_KEY = 'cookie';

export function saveCookie(cookie) {
  window.localStorage.setItem(COOKIE_KEY, cookie);
}

export function loadCookie() {
  return window.localStorage.getItem(COOKIE_KEY);
}
