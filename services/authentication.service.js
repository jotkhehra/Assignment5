class AuthenticationService {
  static authenticate(username, password) {
    if (username === "admin" && password === "password" ){
    return true;
    }
    else{
return false;
    }
  }
}

module.exports = AuthenticationService;
