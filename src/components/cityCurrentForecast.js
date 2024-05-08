import { Ionicons } from "@expo/vector-icons"
import { View, Text, StyleSheet, Image } from "react-native"

const CityCurrentForecast = ({ item }) => {

    return (
        <View style={styles.container}>
            <View style={styles.cityDataWrapper}>                
                <Text style={styles.cityTitle}>{item.city}</Text>
                <Text style={styles.tempText} >{item.temp}°C</Text>
                <Text style={styles.tempDescText}>{item.desc}</Text>
            </View>
            <View style={styles.cityIconWrapper}>
                <Image style={styles.cityIcon} source={{ uri: 'http://openweathermap.org/img/w/' + item.icon + '.png', }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        alignSelf: "center",
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    cityDataWrapper: {
        
    },
    cityIconWrapper:{
        justifyContent: 'center',
        alignContent: 'center'
    },
    cityTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cityIcon: {
        height: 80,
        width: 80,
    },
    tempText: {
        fontSize: 24
    },
    tempDescText: {
        fontSize: 16
    }
})

export default CityCurrentForecast