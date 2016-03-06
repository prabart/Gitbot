//App_Store
var React = require('react-native');
var {
  AsyncStorage
} = React;
var App_data = require('./App_data')

var App_Store = {
  getVal: async function(key) {
    try {
      var value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      } else {
        return App_data.defaults.token
      }
    } catch (error) {
      console.log("error in getVal :" + error.message);
    }
  },

  setVal: async function(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("error in setVal :" + error.message)
    }
  },

  listKeys: async function() {
    try {
      var keys = await AsyncStorage.getAllKeys();
      console.log(keys);
    } catch (error) {
      console.log("error in listKeys :" + error.message)
    }
  },

  removeVal: async function(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("error in removeVal :" + error.message);
    }
  },

  clearStore: async function(){
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log("error in clearStore :" + error.message);
    }
  }

}
module.exports = App_Store;
