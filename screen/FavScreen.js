import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class FavScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Favorites screen
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
