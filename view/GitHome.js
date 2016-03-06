
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';

var Api = require('../Model/Api');
var AppStore = require('../Model/App_Store');
var AppData = require('../Model/App_data');
var github_id,userName,password;
var Login = React.createClass({

  getInitialState:function(){

  	return({
      username:"",
      password:"",
      isLoading:true
  	})

  },
  componentWillMount:function(){
    AppStore.getVal(AppData.storeData.githubId).done(function(value) {
      github_id = value;
      console.log("github_id",github_id)
    },function(error) {
      console.log(error);
    });
    AppStore.getVal(AppData.storeData.userName).done(function(data) {
      console.log(data)
      userName = data;
    },function(error) {
      console.log(error);
    });
  },
  componentDidMount:function(){
    AppStore.getVal(AppData.storeData.password).done(function(value) {
      password = value;
    },function(error) {
      console.log(error);
    });
  },

  render:function() {
    
    return (
    	<View style={styles.container}>
	      <TouchableHighlight activeOpacity={1} underlayColor='#F19793' onPress={()=>this.logOut()}>
	        <View style={styles.buttonWrapper}>
	          <Text style={styles.buttonText}>Sign Out</Text>
	        </View>
	      </TouchableHighlight>
	    </View>
    );
  },
  logOut:function(){
    var current=this;
    console.log(userName,password,github_id)
    Api.userLogOut(userName,password,github_id).done(function(response) {
      console.log(response);
      if(response.status == 204){
        AppStore.removeVal(AppData.storeData.token);
        current.props.navigator.pop();
      }

    }, function(error) {
      console.log(error);
    });  
  }

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"orange"
  },
  icon: {
    textAlign: 'center',
    marginTop: 80,
    fontWeight: 'bold',
    fontSize: 40,
    color: '#ffffff',
  },
  contents: {
    color: '#ffffff',
    flex:1
  },
  loginWrapper: {
    flex: 1,
    marginTop: 120,
    marginLeft: 30,
    marginRight: 30,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: 5
  },
  buttonWrapper:{
    backgroundColor:"#BC4A4A",
    paddingTop:20,
    paddingBottom:20,
    justifyContent:"center",
    alignItems:"center"
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff'
  },
  loginList: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection:"row"
  },
  reachLogo:{
    height:100,
    width:200,
    marginTop:50
  },
  reachLogoSplash:{
    height:300,
    width:350,
    marginBottom:50
  }
});

module.exports = Login;
