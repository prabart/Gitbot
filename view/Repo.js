
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
var token;
var Repo = React.createClass({

  getInitialState:function(){
  	return({
      allRepos:[],
      isLoading:true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
  	})
  },
  componentDidMount:function(){
    var ref = this;
    AppStore.getVal(AppData.storeData.token).done(function(token) {
      Api.reposList(token).done(function(response) {
        console.log(response);
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
  renderRow:function(repo){
    console.log(repo);
    return(
      <View style={styles.repoPane}>
        <View style={{flex:1,flexDirection:"row"}}>
          <View style={{flex:0.8}}>
            <Text style={{color:"#57B7F3",fontWeight:"bold",fontSize:18}}>{repo.name}</Text>
          </View>
          <View style={{flex:0.2,alignItems:"flex-end"}}>
            <Text style={{color:GitColor[repo.language],paddingRight:3,fontWeight:"bold"}}>{repo.language}</Text>
          </View>
        </View>
        <View style={{flex:1,marginTop:5}}>
          <Text style={{color:"black"}}>{repo.description}</Text>
        </View>
        <View style={{flex:1,flexDirection:"row",marginTop:5}}>
          <View style={styles.listIcon}>
            <Ionicons name="fork-repo" size={18} color="black" />
            <Text style={{color:"black",marginLeft:5}}>{repo.forks_count}</Text>
          </View>
          <View style={styles.listIcon}>
            <FontAwesome name="star" size={15} color="black" />
            <Text style={{color:"#ccc",marginLeft:5}}>{repo.stargazers_count}</Text>
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
  repoPane:{
    flex:1,
    backgroundColor:"white",
    margin:7,
    borderRadius:5,
    padding:5
  },
  listIcon:{
    flex:0.5,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  }
});

module.exports = Repo;
