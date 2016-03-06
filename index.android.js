/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

var Login = require("./view/Login")

class Gitbot extends Component {
  render() {
    return (
      <Navigator 
      style = {{flex: 1}}
      configureScene={(route) => {
        if (route.sceneConfig) {
          return route.sceneConfig;
        }
        return Navigator.SceneConfigs.FadeAndroid;
      }}
      initialRoute = {{component: Login}}
      renderScene = {(route, navigator) => {
        return React.createElement(route.component, { navigator });         
      }}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Gitbot', () => Gitbot);
