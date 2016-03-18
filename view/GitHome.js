
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  TextInput,
  Image
} from 'react-native';

var Api = require('../Model/Api');
var AppStore = require('../Model/App_Store');
var AppData = require('../Model/App_data');
var FontAwesome = require('react-native-vector-icons/FontAwesome');
var Entypo = require('react-native-vector-icons/Entypo');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var Repo = require('./Repo');
var NewsFeed = require('./NewsFeed');
var deviceWidth = Dimensions.get('window').width
var github_id,userName,password;
var Login = React.createClass({

  getInitialState:function(){

  	return({
      username:"",
      password:"",
      isLoading:true,
      userInfo:{},
      starredRepos:[],
  	})

  },
  componentWillMount:function(){
    var ref = this;
    AppStore.getVal(AppData.storeData.token).done(function(token) {
      github_id = token;
      Api.getUserInfo(token).done(function(response) {
        console.log(response);
        ref.setState({isLoading:false,userInfo:response})
      }, function(error) {
        console.log(error);
      });
    },function(error) {
      console.log(error);
    });
  },
  componentDidMount:function(){
    var current = this;
    AppStore.getVal(AppData.storeData.password).done(function(value) {
      password = value;
    },function(error) {
      console.log(error);
    });
  },

  render:function() {
    var userInfo = this.state.userInfo;
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
          <Entypo name="menu" size={26} color="white" />
          <Text style={styles.title}>Git Bot</Text>
        </View>
        {this.renderUserInfo(userInfo)}
        <View style={styles.thickLine}>
        </View>
        <View style={{backgroundColor:"304153",flexDirection:"row",flex:1}}>
          <ScrollableTabView style={{flex:1}} initialPage={0} tabBarUnderlineColor="#0ECCE4"
           tabBarActiveTextColor="0ECCE4" tabBarInactiveTextColor="ccc">
            <Repo tabLabel="Repos" accessToken={github_id}/>
            <NewsFeed tabLabel="News Feed" accessToken={github_id}/>
          </ScrollableTabView>
        </View>
	    </View>
    );
  },
  renderUserInfo:function(userInfo){
    return(
      <View style={styles.userPanel}>
        <View style={styles.avator}>
          <Image source={{uri:userInfo.avatar_url}} style={{width: 80, height: 80,borderRadius:50}}/>
        </View>
        <View style={{flex:0.8,marginTop:10,marginLeft:5}}>
          <View style={{marginLeft:20}}>
            <Text style={{fontWeight:"bold",fontSize:20,color:"white"}}>{userInfo.name}</Text>
            <Text style={{fontWeight:"bold",fontSize:13,color:"#627383"}}>{userInfo.location}</Text>
          </View>
          <View style={{flex:1,flexDirection:"row",marginTop:5}}>
            <View style={{flex:0.3}}>
              <Text style={{fontWeight:"bold",textAlign:"center",fontSize:20,color:"#F9CD0A"}}>{userInfo.followers}</Text>
              <Text style={{fontWeight:"bold",textAlign:"center",fontSize:10,color:"#627383"}}>Followers</Text>
            </View>
            <View style={{flex:0.3}}>
              <Text style={{fontWeight:"bold",textAlign:"center",fontSize:20,color:"#F63256"}}>{userInfo.following}</Text>
              <Text style={{fontWeight:"bold",textAlign:"center",fontSize:10,color:"#627383"}}>Following</Text>
            </View>
            <View style={{flex:0.3}}>
              <Text style={{fontWeight:"bold",textAlign:"center",fontSize:20,color:"#F9A00E"}}>{userInfo.public_repos}</Text>
              <Text style={{fontWeight:"bold",textAlign:"center",fontSize:10,color:"#627383"}}>Repos</Text>
            </View>
          </View>
        </View>
      </View>
    )
  },
  logOut:function(){
    var current=this;
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
    backgroundColor:"#304153",
    flexDirection:"column",
    flex:1
  },
  logoMain:{
    backgroundColor:"#0ECCE4",
    padding:10,
    flexDirection:"row"
  },
  title:{
    color:"white",
    fontSize:20,
    fontWeight:'bold',
    paddingLeft:5
  },
  userPanel:{
    flexDirection:"row"
  },
  avator:{
    flex:0.2,
    margin:10
  },
  thickLine:{
    marginTop:5,
    padding:2,
    backgroundColor:"#0ECCE4",
  },
  splashBox:{
    alignItems:"center",
    justifyContent:"center",
    height:deviceWidth
  },
});

module.exports = Login;
