import React from "react";
import { StyleSheet, TextInput } from "react-native";



export const Input = props => {
    return (
        <TextInput {...props} style={{...styles.input, ...props.style }}/>
    )
}

const styles = StyleSheet.create({
    input: {
        marginVertical: 10, 
        height: 30,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    }, 
})