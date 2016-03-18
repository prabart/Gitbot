
'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  TextInput,
  Image,
  ListView
} from 'react-native';

var Api = require('../Model/Api');
var AppStore = require('../Model/App_Store');
var AppData = require('../Model/App_data');
var GitColor = require('../Model/GithubColors');
var FontAwesome = require('react-native-vector-icons/FontAwesome');
var Ionicons = require('react-native-vector-icons/Ionicons');
var Entypo = require('react-native-vector-icons/Entypo');
var token,userName;
var NewsFeed = React.createClass({

  getInitialState:function(){
  	return({
      allRepos:[],
      isLoading:true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
  	})
  },
  componentWillMount:function(){
  },
  componentDidMount:function(){
    var ref = this;
    AppStore.getVal(AppData.storeData.userName).done(function(value) {
      Api.newsList(ref.props.accessToken,value).done(function(response) {
        ref.setState({
          dataSource: ref.state.dataSource.cloneWithRows(response),
          isLoading:false
        })
      }, function(error) {
        console.log(error);
      });
    },function(error) {
      console.log(error);
    });
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
        <ListView
          style = {{flex:1}}
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRow}/>
	    </View>
    );
  },
  renderRow:function(news){
    console.log(news);
    return(
      <View style={styles.repoPane}>
        <View style={{flex:1,flexDirection:"row"}}>
          <View style={styles.avator}>
            <Image source={{uri:news.actor.avatar_url}} style={{width:40, height:40,borderRadius:50}}/>
          </View>
        </View>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#304153",
    flexDirection:"row",
    flex:1
  },
  avator:{
    flex:0.2,
    margin:10
  },
  repoPane:{
    flex:1,
    backgroundColor:"white",
    margin:5,
    marginLeft:15,
    marginRight:15,
    borderRadius:5,
    borderWidth:1,
  },
  listIcon:{
    flex:0.5,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  }
});

module.exports = NewsFeed;
