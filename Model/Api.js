//User.js
var AppData= require('./App_data')
var Api =	{
	UserLogin:function(user,pass){
    var request = new XMLHttpRequest();
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
	}
};

module.exports = Api