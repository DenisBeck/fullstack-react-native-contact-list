import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Constants } from 'expo';
// import Contacts from './screens/Contacts';
//import Profile from './screens/Profile';
import AppNavigator from './routes';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.Container}>
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    marginTop: Platform.OS === 'android' || platformVersion < 11
                ? Constants.statusBarHeight
                : 0,
  }
})

