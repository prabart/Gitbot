//App_data.js
var App_data = {
  api_calls:{
    login:"https://api.github.com/authorizations",
    logout:"https://api.github.com/authorizations/",
    userInfo:"https://api.github.com/user?access_token="
  },
  storeData:{
  	token:"TOKEN",
  	userName:"USERNAME",
  	password:"PASSWORD",
  	githubId:"GITHUBID",
  	empty:"EMPTY"
  }
};

module.exports = App_data;
