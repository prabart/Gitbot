//App_data.js
var github_url = "https://api.github.com/";
var App_data = {
  api_calls:{
    login:github_url+"authorizations",
    logout:github_url+"authorizations/",
    userInfo:github_url+"user?access_token=",
    starred:github_url+"user/starred?access_token="
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
