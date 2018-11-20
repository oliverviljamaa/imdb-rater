import { saveCookie, loadCookie } from './local';

describe('Local storage', () => {
  it('saves cookie in local storage under key cookie', () => {
    expect(window.localStorage.setItem).not.toBeCalled();
    saveCookie('a-cookie');
    expect(window.localStorage.setItem).toBeCalledWith('cookie', 'a-cookie');
  });

  it('loads cookie from local storage key cookie', () => {
    window.localStorage.getItem.mockReturnValue('a-cookie');

    expect(window.localStorage.getItem).not.toBeCalled();
    const cookie = loadCookie();
    expect(window.localStorage.getItem).toBeCalledWith('cookie');
    expect(cookie).toBe('a-cookie');
  });
});
