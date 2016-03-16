
'use strict';
import React, {
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
var token;
var Note = React.createClass({

  getInitialState:function(){
  	return({
      allRepos:[],
      isLoading:true
  	})
  },
  componentWillMount:function(){
    console.log(token,"####1111#######")
    var ref = this;
    AppStore.getVal(AppData.storeData.token).done(function(token) {
      console.log(token,"###########")
      Api.reposList(token).done(function(response) {
        console.log(response);
      }, function(error) {
        console.log(error);
      });
    },function(error) {
      console.log(error);
    });
  },
  componentDidMount:function(){
    console.log(token,"####22211#######")

  },

  render:function() {
    console.log(this.state.isLoading)
    // if(this.state.isLoading){
    //   return(
    //     <View style={styles.container}>
    //         <FontAwesome name="github" size={150} color="#67AB9E" />
    //     </View>
    //   )
    // }
    return (
    	<View style={styles.container}>
          <Text style={{color:"white"}}>Git Bot</Text>
	    </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    width:300,
    flexDirection:"row",
    flex:1
  },
});

module.exports = Note;
