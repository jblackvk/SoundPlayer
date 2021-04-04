/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import SoundPlayers from "./Src/SoundPlayer";
import { Colors } from "react-native-paper";
import { black } from "react-native-paper/lib/typescript/styles/colors";


export default class App extends React.Component{

  render(): React$Node {
    return <SafeAreaView style={{
      backgroundColor:Colors.black,
      display: 'flex',
      flex: 1
    }}>
      <SoundPlayers/>
    </SafeAreaView>;
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

