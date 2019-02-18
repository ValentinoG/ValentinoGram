import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  TextInput,
  FlatList
} from "react-native";

import Item from "../components/Item";

//record template
/**
 * commentsArray = [
 * {
 *   id: anId,
 *   comments: [
 *     {
 *       timestamp: anyDate,
 *       text: anyText
 *     },
 *     {
 *       ...moreComment
 *     }
 *   ]
 * },
 * {
 *   ...morePost
 * }
 *];
 */

export default class CommentScreen extends React.Component {
  state = {
    comment: "",
    commentList: []
  };

  //get the reference of the post
  itemObject = this.props.navigation.getParam("itemObject", {});

  componentDidMount() {

    //fill this.state.commentList with comments related to this post
    this._getCommentList
      .then(commentList => {
        let commentListOfThisPost = JSON.parse(commentList).find(element =>
          element.id == this.itemObject.id ? element.comment : null
        );

        //if there aren't comments to load then, [] is assigned to this.state.commentList
        this.setState({
          commentList: commentListOfThisPost
            ? commentListOfThisPost.comment
            : []
        });
      })
      .catch(e => console.log(e));
  }

  //This func is call is call by onSubmit event
  loadComment = async () => {
    let newComment = {
      id: this.itemObject.id,
      comment: [{ timestamp: new Date(), text: this.state.comment }]
    };

    //commentsArray waits the string containing object that is parsing JSON.parse
    //if commentsArray doesn't contain anything, [] is assigned
    let commentsArray = JSON.parse(await AsyncStorage.getItem("comment"));
    !commentsArray ? (commentsArray = []) : null;
    let i = 0;

    //Searching of eventual old comments already existing
    while (i < commentsArray.length && commentsArray[i].id != newComment.id)
      i++;

    //if no comments then an entire record relative to the post is pushed to commentsArray, else is pushed only new comment to "comment" array in existing record
    if (i != commentsArray.length)
      commentsArray[i].comment.push(newComment.comment[0]);
    else commentsArray.push(newComment);

    AsyncStorage.setItem("comment", JSON.stringify(commentsArray));

    //when a new comment is loaded then is needed to reload the state this.state.commentList with new update.
    //In this way the render() will be reload with change and FlatList will be up-to-date
    let commentListOfThisPost = commentsArray.find(element =>
      element.id == this.itemObject.id ? element.comment : null
    );
    this.setState({ commentList: commentListOfThisPost.comment, comment:"" });
    this.textInput.clear()
  };

  _getCommentList = new Promise((resolve, reject) => {
    AsyncStorage.getItem("comment").then(response =>
      response ? resolve(response) : reject("EMPTY")
    );
  });

  _renderItem = item => {
    const today = new Date(item.item.timestamp);
    const dateTime = `${today.getHours()}:${today.getMinutes()}  ${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`;

    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text>{item.item.text}</Text>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-end",
            borderBottomColor: "grey",
            borderBottomWidth: 1
          }}
        >
          <Text>{dateTime}</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Item
          id={this.itemObject.id}
          navigator={null}
          name={this.itemObject.name}
          surname={this.itemObject.surname}
          source={this.itemObject.source}
        />

        <TextInput
          placeholder="Inserisci un commento"
          onChangeText={comment => this.setState({ comment })}
          onSubmitEditing={comment => this.loadComment()}
          ref={input =>{this.textInput = input}}
        />
        <View style={styles.commentBox}>
          <Text>Comments</Text>
          <FlatList
            data={this.state.commentList}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  commentBox: {
    flex: 1,
    backgroundColor: "white"
  }
});
