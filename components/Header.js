
import React from "react"
import {View, Text, StyleSheet} from 'react-native'
import {colors} from '../constants/colors'

const Header = (props) => {
    return (
        <View style={styles.Header
        }>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    Header: {
        backgroundColor: colors.principal,
        height: 90,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: 'black',
        fontSize: 18
    }

})

export default Header;