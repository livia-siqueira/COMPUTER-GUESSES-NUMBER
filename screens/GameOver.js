import React from "react";
import { View, StyleSheet, Text, Button, Image, Dimensions, ScrollView, SafeAreaView } from 'react-native'
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import TitleText from "../components/TitleText";
import { colors } from "../constants/colors";


const GameOver = props => {
    return (
      
            <ScrollView>
                <View style={styles.screen}>
                    <TitleText>The game is over</TitleText>
                    <View style={styles.imageContainer}>
                        <Image
                            fadeDuration={100}
                            resizeMode="cover"
                            style={styles.image}
                            // source={{ uri: "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg" }}
                            source={require('../assets/success.png')}
                        />
                    </View>
                    <View style={styles.resultContainer}>
                        <BodyText style={styles.titleResult}>Your phone need <Text style={styles.numbers}>{props.numberRounds}</Text> rounds to guess number <Text style={styles.numbers}>{props.userNumber}</Text></BodyText>
                    </View>
                    <MainButton onPress={props.onPress}>Reset Game</MainButton>
                </View>
           </ScrollView>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        borderRadius: (Dimensions.get('window').width * 0.7) / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    numbers: {
        color: colors.principal,
        fontFamily: 'open-sans-bold',
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    titleResult: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }


})

export default GameOver;