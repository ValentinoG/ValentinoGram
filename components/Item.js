import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";

export default class Item extends React.Component {
  render() {
    const itemObject = {
      id: this.props.id,
      name: this.props.name,
      surname: this.props.surname,
      source: this.props.source,
      numComments: this.props.numComments
    };
    //for reciclyng the component in commentscreen
    let comment;
    this.props.navigator
      ? (comment = (
          <View style={styles.comment}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigator.navigate("Comments", {itemObject:itemObject})
              }
            >
              <Text style={styles.text}>{itemObject.numComments} Comments</Text>
            </TouchableOpacity>
          </View>
        ))
      : null;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Avatar
            small
            rounded
            title={`${itemObject.name != "" ? itemObject.name[0] : ""}${
              itemObject.surname != "" ? itemObject.surname[0] : ""
            }`}
          />
          <Text style={styles.text}>
            {itemObject.name} {itemObject.surname}
          </Text>
          {comment}
        </View>
        <View style={styles.imageBox}>
          <Image
            style={{ height: 360, width: "100%" }}
            resizeMode="contain"
            source={{ uri: itemObject.source }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#efefff",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30
    /*borderWidth:1,
    borderColor:'black'*/
  },
  text: {
    color: "black",
    padding: 8
  },
  comment: {
    flex: 1,
    alignItems: "flex-end"
    /*borderWidth:1,
    borderColor:'black'*/
  },
  imageBox: {
    //height:200,
    backgroundColor: "white"
  }
});
