import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TypingAnimation } from "react-native-dot-typing";

import { colors, statusBarHeight, SCREEN_HEADER_HEIGHT } from "./constants";

function App() {
  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safearea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>React Native Dot Typing</Text>
        </View>
      </SafeAreaView>
      <View style={styles.container}>
        <View style={styles.typing}>
          <TypingAnimation
            dotRadius={8}
            dotSpeed={0.05}
            dotAmplitude={12}
            dotMargin={14}
            dotX={0}
            dotY={0}
          />
        </View>
        <View style={styles.typing}>
          <TypingAnimation
            dotRadius={8}
            dotAmplitude={12}
            dotMargin={14}
            dotX={0}
            dotY={60}
          />
        </View>
        <View style={styles.typing}>
          <TypingAnimation
            dotRadius={8}
            dotSpeed={0.3}
            dotAmplitude={16}
            dotMargin={14}
            dotX={0}
            dotY={120}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
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
  typing: {
    alignItems: "center",
  },
});

export default App;
