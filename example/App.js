import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TypingAnimation } from "react-native-dot-typing";

import { colors, statusBarHeight, SCREEN_HEADER_HEIGHT } from "./constants";

function App() {
  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safearea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>React Native Typing</Text>
        </View>
      </SafeAreaView>
      <View>
        <TypingAnimation />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    backgroundColor: colors.white,
    flexDirection: "row",
    height: SCREEN_HEADER_HEIGHT,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 23,
  },
  safearea: {
    backgroundColor: colors.white,
    overflow: "hidden",
    paddingTop: statusBarHeight,
    zIndex: 3,
  },
  screen: {
    backgroundColor: colors.azure,
    flex: 1,
    flexGrow: 1,
  },
});

export default App;
