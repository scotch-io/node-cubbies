auth0 = new auth0.WebAuth({
  domain:       'adobot.auth0.com',
  clientID:     'E7v0bIDB2bM4ICfIgbWPbe6J6T54hsiT',
  redirectUri:  'http://localhost:3000',
  responseType: 'token id_token',
  audience:     'gifbattle',
  scope:        'openid profile email write:gifs'
});

window.authService = {

  logout: function() {
    auth0.logout();
    app.isLoggedIn = false;
  },

  setSession: function (authResult) {
    app.accessToken= authResult.accessToken;
    app.idToken= authResult.idToken;
  },

  login: function() {
    auth0.authorize();
  },

  handleAuthentication: function() {
    auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {

        console.log(authResult);

        window.location.hash = '';
        app.isLoggedIn = true;
        authService.setSession(authResult);

      } else if (err) {
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
    })
  },
  checkSession: function(){
    auth0.checkSession({}, function (err, authResult) {
        console.log(authResult);
        if(err){
          alert(`Error: ${err.error}. Check the console for further details.`);
          console.log(err);
        } else {
          authService.setSession(authResult);
          app.isLoggedIn = true;
        }
    });
  }
};
