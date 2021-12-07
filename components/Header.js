import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { colors } from "../constants/colors";
import TitleText from "./TitleText";

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.HeaderBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderBase: {
    height: 90,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerIOS: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: colors.principal,
    borderBottomColor: "transparent",
    borderBottomWidth: 0,
  },
  headerTitle: {
    color: "black",
    fontSize: 18,
  },
  title: {
    color: Platform.OS === "ios" ? colors.principal : "white",
  },
});

export default Header;
