import * as React from "react";
import {View, StyleSheet, TouchableOpacity } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Header } from "react-native-elements";
import MainScreen from "./screen/MainScreen";
import FavScreen from "./screen/FavScreen";
import CommentScreen from "./screen/CommentScreen";
import {Text} from 'react-native-elements'
const MainScreenStackNavigator = createStackNavigator(
  {
    Show: {
      screen: MainScreen,
    },
    Comments: {
      screen: CommentScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header
          barStyle="light-content"
          leftComponent={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text>Close</Text>
            </TouchableOpacity>
          }
          centerComponent={
            <Text h3>ValentinoGram</Text>
          }
        />
      )
    })
  }
);

MainScreenStackNavigator.navigationOptions=({navigation}) =>{
    let tabBarVisible=true;
    if(navigation.state.index>0){
      tabBarVisible=false
    }
    return{
      tabBarVisible
    }
}

const appBottomTabNavigator = createBottomTabNavigator({
  Main: {
    screen: MainScreenStackNavigator
  },
  Favorites: {
    screen: FavScreen
  }
});

export default appBottomTabNavigator;
