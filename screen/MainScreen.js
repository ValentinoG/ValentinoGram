import * as React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Divider, Text } from "react-native-elements";

import Item from "../components/Item";

export default class MainScreen extends React.Component {
  state = {
    instagramList: [], //contains posts
    loadCompleted: false, //flag ActivityIndicator
    totalCommentList: [] //contains all comment of all post
  };

  componentDidMount() {
    this.getInstagramList();
  }

  getInstagramList = () => {
    fetch("http://unsplash.it/list").then(response => {
      if(response.status!==200){
        alert("Ther is some problem with url: "+response.status)
        return;
      }
      response.json().then(instagramList => {
        this.setState({instagramList});
        this.setState({ loadCompleted: true });
      }).catch(e=>alert(e));
    }).catch(e=>alert(e));
  };

  _renderItem = item => {
    let author = item.item.author.split(" ");

    //If in author string is defined only one name
    if (author.length < 2) {
      author[1] = "";
    }
    return (
      <Item
        id={item.item.id}
        navigator={this.props.navigation}
        name={author[0]}
        surname={author[1]}
        source={`https://picsum.photos/600/600?image=${item.item.id}`}
      />
    );
  };
  render() {
    //This is a conditional rendering that permits to show ActivitityIndicator just when instagramList is not already loaded
    let activity;
    !this.state.loadCompleted ? (activity = <ActivityIndicator />) : null;

    return (
      <View style={styles.container}>
        {activity}
        <FlatList
          data={this.state.instagramList}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <Divider style={{ borderColor: "white", borderWidth: 5 }} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    //justifyContent: 'center',
    //backgroundColor: 'white',
    //paddingTop: 20
  }
});
