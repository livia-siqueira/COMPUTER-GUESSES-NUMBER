import React from "react";
import { View, StyleSheet, Text, Button, Image } from 'react-native'




const GameOver = props => {
    return (
        <View style={styles.screen}>
            <Text>The game is over</Text>
            <View style={styles.imageContainer}>
                <Image
                    fadeDuration={100}
                    resizeMode="contain"
                    style={styles.image}
                    source={{ uri: "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg" }}
                //source={require('../assets/success.png')}
                />
            </View>
            <Text>Number of rounds: {props.numberRounds}</Text>
            <Text>Number was: {props.userNumber}</Text>
            <Button title="Reset Game" onPress={props.onPress} />
        </View>
    )
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 20
    },
    image: {
        width: '100%',
        height: '100%'
    },

})

export default GameOver;