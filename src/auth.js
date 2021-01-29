

class Auth {
    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    /* eslint-disable no-undef */


    static authenticateUser (token, expiry) {
      localStorage.setItem("token",token)
      localStorage.setItem("expiry",expiry)
    }
  
    static authNotified () {
      localStorage.setItem('authNotified', true)
    }
  
    static getAuthNotified () {
      return localStorage.getItem('authNotified')
    }
  
    static storeReferer (path) {
      localStorage.setItem('referer', path)
    }
  
    static getReferer () {
      return localStorage.getItem('referer')
    }
  
    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated () {
      return localStorage.getItem('token') !== null
    }
  
    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser () {
      localStorage.removeItem('token')
    }
  
    /**
     * Get a token value.
     *
     * @returns {string}
     */
  


    static getToken () {
      const itemStr = localStorage.getItem('token')
      const getExpiry = localStorage.getItem('expiry')
      if (!itemStr) {
        return null
      }
      // console.log("itemStr", itemStr)
      const getExp = JSON.parse(JSON.stringify((getExpiry)))
      //console.log("item", getExp)
      //console.log("expiry",(getExp - new Date()) < 0)
      //const now = new Date()
      if ((getExp - new Date()) < 0) {
        localStorage.removeItem("token")
        return null
      }
      return itemStr
    }
  }
  
  export default Auth