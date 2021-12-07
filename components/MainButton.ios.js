import React from "react";
import { StyleSheet, View, Text, TouchableNativeFeedback } from "react-native";
import { colors } from "../constants/colors";



const MainButton = props => {
    return (
        <TouchableNativeFeedback activeOpacity={0.6} onPress={props.onPress}>
            <View style={{...styles.buttonContainer, ...props.color}}>
                <Text style={styles.button}>{props.children}</Text>
            </View>
        </TouchableNativeFeedback>
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