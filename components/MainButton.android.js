import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform, TouchableNativeFeedback } from "react-native";
import { colors } from "../constants/colors";



const MainButton = props => {

    let TypeTouchable = TouchableOpacity;
    if(Platform.Version > 21) {
        TypeTouchable = TouchableNativeFeedback;
    }
    return (
        <TypeTouchable activeOpacity={0.6} onPress={props.onPress}>
            <View style={{...styles.buttonContainer, ...props.color}}>
                <Text style={styles.button}>{props.children}</Text>
            </View>
        </TypeTouchable>
    )
}


const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: colors.principal,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    button: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
})

export default MainButton;