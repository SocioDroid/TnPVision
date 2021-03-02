class Auth {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  /* eslint-disable no-undef */

  static authenticateUser(token, expiry, group, user,cubejsjwt) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiry', expiry);
    localStorage.setItem('group', group);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('cubejs-jwt', cubejsjwt);
  }

  static storeUser(user){
    localStorage.setItem('user', JSON.stringify(user));
  }

  static authNotified() {
    localStorage.setItem('authNotified', true);
  }

  static getAuthNotified() {
    return localStorage.getItem('authNotified');
  }

  static storeReferer(path) {
    localStorage.setItem('referer', path);
  }

  static getReferer() {
    return localStorage.getItem('referer');
  }

  static getGroup() {
    return localStorage.getItem('group');
  }
  static getCubejsjwt() {
    return localStorage.getItem('cubejs-jwt');
  }

  static isTokenExpired() {
    const getExpiry = localStorage.getItem('expiry');
    const getExp = new Date(getExpiry);
    if (getExp - new Date() < 0) {
      localStorage.removeItem('token');
      localStorage.removeItem('expiry');
      localStorage.removeItem('group');
      localStorage.removeItem('user');
      localStorage.removeItem('cubejs-jwt');
      return true;
    }
    return false;
  }
  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    // console.log('token', localStorage.getItem('token') !== null)
    console.log("Token Expired ?", this.isTokenExpired());
    return !Auth.isTokenExpired() && localStorage.getItem('token') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');
    localStorage.removeItem('group');
    localStorage.removeItem('user');
    localStorage.removeItem('cubejs-jwt');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */
  static getUser(){
    return JSON.parse(localStorage.getItem('user'));
  }

  static getToken() {
    const itemStr = localStorage.getItem('token');
    const getExpiry = localStorage.getItem('expiry');
    if (!itemStr) {
      return null;
    }
    // console.log("itemStr", itemStr)
    const getExp = JSON.parse(JSON.stringify(getExpiry));
    //console.log("item", getExp)
    //console.log("expiry",(getExp - new Date()) < 0)
    //const now = new Date()
    if (getExp - new Date() < 0) {
      localStorage.removeItem('token');
      return null;
    }
    return itemStr;
  }
}

export default Auth;
