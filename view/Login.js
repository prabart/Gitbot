
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ToastAndroid,
  Dimensions
} from 'react-native';

var Api = require('../Model/Api');
var AppStore = require('../Model/App_Store');
var AppData = require('../Model/App_data');
var GitHome = require('./GitHome');
var FontAwesome = require('react-native-vector-icons/FontAwesome');
var Entypo = require('react-native-vector-icons/Entypo');
var deviceWidth = Dimensions.get('window').width;
var Login = React.createClass({

  getInitialState:function(){

  	return({
      username:"",
      password:"",
      isLoading:true
  	})

  },
  componentWillMount:function(){
    var current = this;
    AppStore.getVal(AppData.defaults.token).done(function(value) {
      console.log("Token",value)
      if (value == AppData.defaults.emptyKey) {
        current.setState({isLoading:false})
      } else {
        current.props.navigator.push({
          title: 'Git Home',
          component: GitHome,
        })
      }
    }, function(error) {
      console.log(error);
    })
  },

  render:function() {
    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <View style={styles.splashBox}>
            <FontAwesome name="github" size={150} color="#67AB9E" />
          </View>
        </View>
      )
    }
    return (
    	<View style={styles.container}>
        <View style={styles.logoMain}> 
          <Text style={styles.title}>Git Bot</Text>
        </View>
        <View style={{alignItems:"center",justifyContent:"center",height:200}}>
          <FontAwesome name="github" size={150} color="#67AB9E" />
        </View>
	      <View style={styles.loginWrapper}>
	        <View style={styles.loginList}>
            <Entypo name="github" size={20} color="#67AB9E" />
	          <TextInput style={styles.contents} underlineColorAndroid='#F0E7D4' value={this.state.username} onChangeText={(username) => this.setState({username})} />
	        </View>
	        <View style={styles.loginList}>
            <Entypo name="key" size={20} color="#67AB9E" />
	          <TextInput style={styles.contents} underlineColorAndroid='#F0E7D4' value={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry={true} />
	        </View>
          <TouchableHighlight activeOpacity={1} underlayColor='#F19793' onPress={()=>this.login(this.state.username,this.state.password)}>
          <View style={styles.buttonWrapper}>
            <Text style={styles.buttonText}>Sign In</Text>
          </View>
        </TouchableHighlight>
	      </View>
	    </View>
    );
  },
  login:function(username, password){
 		console.log(username,password);
    var current = this;
    Api.UserLogin(username,password).done(function(response) {
      console.log(response)
      if(response.token){
        AppStore.setVal(AppData.defaults.token,response.token).done(function(value) {
          current.props.navigator.push({
            title: 'Git Home',
            component: GitHome,
          })
        }, function(error) {
          console.log(error);
        })
      }
      else{
        ToastAndroid.show('Invalid Login', ToastAndroid.SHORT)
      }
    }, function(error) {
      console.log(error);
    });  
  }

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#F0E7D4"
  },
  contents: {
    color: '#67AB9E',
    flex:1,
    fontSize:15
  },
  loginWrapper: {
    flex: 1,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  loginPanel:{
    borderRadius:7,
    borderColor:'#40A4C4',
    borderWidth:1,
    height:400,
  },
  buttonWrapper:{
    backgroundColor:"#E74C3C",
    paddingTop:15,
    paddingBottom:15,
    justifyContent:"center",
    alignItems:"center",
    margin:20,
    borderRadius:5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff'
  },
  loginList: {
    alignItems: 'center',
    flexDirection:"row",
    borderRadius:8,
    borderWidth:1,
    borderColor:"#67AB9E",
    marginTop:20,
    paddingLeft:10
  },
  logoMain:{
    height:50,
    backgroundColor:"#67AB9E",
    justifyContent:"center"
  },
  splashBox:{
    alignItems:"center",
    justifyContent:"center",
    height:deviceWidth
  },
  title:{
    textAlign:"center",
    color:"white",
    fontSize:20,
    fontWeight:'bold'
  }
});

module.exports = Login;
