import { Image, View, Text, StyleSheet } from "react-native"

const HourlyForecast = ({ item }) => {

    function formatTimestamp(timestamp) {
        var date = new Date(timestamp * 1000);

        var hours = "0" + date.getHours();

        var year = date.getFullYear();
        var month = "0" + date.getMonth();
        var day = "0" + date.getDate();

        var formattedTimestamp = day.substring(-2) + '/' + month.substring(-2) + '/' + year + ' ' + hours.substr(-2) + 'h';

        return formattedTimestamp;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleText}>{item.timestamp != 0 ? formatTimestamp(item.timestamp) : ''}</Text>
                <Image style={styles.icon} source={{ uri: 'http://openweathermap.org/img/w/' + item.icon + '.png', }} />
            </View>
            <Text style={styles.tempText}>{item.temp}°C</Text>
            <Text>{item.desc}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 145,
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        flexDirection: "column",
        borderRadius: 15,
        alignItems: "center",
        padding: 10,
        elevation: 10,
        marginBottom: 40
    },
    header:{
        alignItems: "center",
    },
    icon: {
        height: 40,
        width: 40
    },
    titleText: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    tempText: {
        textAlign: 'center',
        fontSize: 24,
    }
})

export default HourlyForecast