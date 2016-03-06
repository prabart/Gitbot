//User.js
var AppData= require('./App_data');
var AppStore = require('./App_Store')
var Api =	{
	UserLogin:function(user,pass){
    var user = "Basic " + btoa(user + ":" + pass);
    var requestObj = {
      method: 'POST',
      headers: {
        'Authorization':user ,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      	note:"Git Bot",
      	scopes: ["public_repo","user"]
      })
    }
    return fetch(AppData.api_calls.login, requestObj).then(function(res) {
      return res.json();
    })
	},
  userLogOut:function(username,pass,github_id){
    console.log(AppData.api_calls.logout+github_id,username,github_id);
    var userName = username;
      console.log(github_id,userName,pass);
      var user = "Basic " + btoa(userName + ":" + pass);
      var requestObj = {
        method: 'DELETE',
        headers: {
          'Authorization':user ,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      console.log(requestObj)
      return fetch(AppData.api_calls.logout+github_id, requestObj).then(function(res) {
        console.log(res)
        return res;
      })
  }
};

module.exports = Api