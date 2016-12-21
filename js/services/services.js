meducap.factory('auth', function(LSFactory){
  var userKey = '_user';
  var passcode = '_passcode';

  var userId =  '_userId';


  var basicAuth = '_basicAuth';
  var lastSyncTime = 'lastSyncTime';
  var AuthAPI = {



    isLoggedIn : function(){
      return this.getUser() == null?false:true;
    },
    getUser: function(){
      return LSFactory.get(userKey);
    },
    getUserId: function(){
      return LSFactory.get(userId);
    },

    setUser: function(user){
      return LSFactory.set(userKey,user)
    },

    setUserId: function(id) {
      return LSFactory.set(userId, id)
    },

    setToken: function(token){
      return LSFactory.set(tokenKey, token)
    },
    setBasicAuth: function(user, password) {
      var tok = user + ':' + password;
      var hash = btoa(tok);
      var basicAuthToken =  "Basic " + hash;
      return LSFactory.set(basicAuth, basicAuthToken)
    },
    deleteAuth: function(){
      LSFactory.delete(userKey);
      LSFactory.delete(passcode);
      LSFactory.delete(userId);

    }


  };
  return AuthAPI

});



meducap.factory('LSFactory', function(){
  var LSAPI = {
    clear: function(){
      return localStorage.clear();

    },
    get: function(key){

      return JSON.parse(localStorage.getItem(key));

    },
    set: function(key,data) {
      return localStorage.setItem(key, JSON.stringify(data));
    },
    delete: function(key) {
      return localStorage.removeItem(key)
    }

  };
  return LSAPI

});
