class AuthenticationLocalStorage {

  static CheckAuthenticationData() {
    return localStorage.getItem('token');
  }

  static SetAuthenticationData(token) {
    localStorage.setItem('token', token);
  }
}

export default AuthenticationLocalStorage;