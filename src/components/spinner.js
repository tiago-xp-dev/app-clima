import { Image, View, StyleSheet, Text } from "react-native";

const Spinner = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.background} />
            <Image style={styles.spinnerIcon} source={require('./../../assets/loading.gif')} />            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100
    },
    background: {
        position: 'absolute',
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: '#000',
        opacity: 0.7
    },
    spinnerIcon: {
        height: 60,
        width: 60
    }
})

export default Spinner