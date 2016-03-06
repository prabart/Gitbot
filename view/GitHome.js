
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
var Login = React.createClass({

  getInitialState:function(){

  	return({
      username:"",
      password:"",
      isLoading:true
  	})

  },
  componentWillMount:function(){
    
  },

  render:function() {
    
    return (
    	<View style={styles.container}>
	      <TouchableHighlight activeOpacity={1} underlayColor='#F19793' onPress={()=>this._handlePress(this.state.username,this.state.password)}>
	        <View style={styles.buttonWrapper}>
	          <Text style={styles.buttonText}>Sign Out</Text>
	        </View>
	      </TouchableHighlight>
	    </View>
    );
  },
  _handlePress:function(username, password){
    var current = this;
      AppStore.removeVal(AppData.defaults.token).done(function(value) {
        current.props.navigator.pop()
      }, function(error) {
        console.log(error);
      }) 
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
