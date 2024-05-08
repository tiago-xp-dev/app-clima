import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useToast } from "react-native-toast-notifications";
import HourlyForecast from "../components/hourlyForecast"
import Spinner from "../components/spinner"

import useOpenWeatherAPI from "../hook/useOpenweather";
import useLocationServices from "../hook/useLocation";
import FlatListDivider from "../components/flatListDivider";
import { Entypo, EvilIcons, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
    const toast = useToast();
    const owAPI = useOpenWeatherAPI();
    const loc = useLocationServices();

    const gradientColorsMorning = ['#71d2ff', '#85d5fa', '#a8e3ff']

    var [current, setCurrent] = useState({
        city: 'N/A',
        temp: 0.0,
        humd: 0,
        pres: 0,
        feel: 0.0,
        wind: 0.0,
        icon: '03d',
        desc: '...',
        sunr: 0,
        suns: 0
    })
    var [forecast, setForecast] = useState([
        { timestamp: 0, temp: 0.0, desc: '...', icon: '03d' },
        { timestamp: 0, temp: 0.0, desc: '...', icon: '03d' },
        { timestamp: 0, temp: 0.0, desc: '...', icon: '03d' },
        { timestamp: 0, temp: 0.0, desc: '...', icon: '03d' }
    ])
    var [isSpinnerVisible, setIsSpinnerVisible] = useState(false)
    var [refreshColor, setRefreshColor] = useState('black')
    var [coords, setCoords] = useState({ lat: -21.968162794, lon: -46.792163498 })

    useEffect(() => { loadData() }, [])

    async function loadData() {
        setIsSpinnerVisible(true);
        setRefreshColor('red');

        if (!await loc.requestPermission(true))
            navigation.jumpTo('city')

        let location = await loc.getCurrentLocation()
        setCoords({ lat: location.coords.latitude, lon: location.coords.longitude });

        let responseCurr = await owAPI.getCurrentWeather(coords.lat, coords.lon)
        if (responseCurr.cod == 200) {
            setCurrent({
                city: responseCurr.name,
                temp: responseCurr.main.temp,
                humd: responseCurr.main.humidity,
                pres: responseCurr.main.grnd_level,
                feel: responseCurr.main.feels_like,
                wind: responseCurr.wind.speed,
                icon: responseCurr.weather[0].icon,
                desc: responseCurr.weather[0].description.charAt(0).toUpperCase() + responseCurr.weather[0].description.slice(1),
                sunr: responseCurr.sys.sunrise,
                suns: responseCurr.sys.sunset
            })
        }

        let responseForecast = await owAPI.get5DayForescast(coords.lat, coords.lon)

        let processedResponse = []
        if (responseForecast.cod == 200) {
            responseForecast.list.forEach(element => {
                processedResponse.push({
                    timestamp: element.dt,
                    temp: element.main.temp,
                    desc: element.weather[0].description.charAt(0).toUpperCase() + element.weather[0].description.slice(1),
                    icon: element.weather[0].icon
                })
            });
            setForecast(processedResponse)
        }

        setRefreshColor('black')
        setIsSpinnerVisible(false)
    }
    function formatHour(timestamp) {
        var date = new Date(timestamp * 1000);

        var hours = "0" + date.getHours();
        var minutes = "0" + date.getMinutes();

        var formattedTimestamp = hours.substr(-2) + ':' + minutes.substr(-2) + 'h';

        return formattedTimestamp;
    }

    return (
        <LinearGradient colors={gradientColorsMorning} end={{ x: 1, y: 1 }} style={styles.container}>
            {isSpinnerVisible && (<Spinner></Spinner>)}
            <View style={styles.paddingWrapper}>
                <View style={styles.tempWrapper}>
                    <View style={styles.cityWrapper}>
                        <Image style={styles.cityIcon} source={{ uri: 'http://openweathermap.org/img/w/' + current.icon + '.png', }} />
                        <Text style={styles.cityTitle}>{current.city}</Text>
                        <View style={styles.refreshIcon}>
                            <TouchableOpacity onPress={() => { loadData() }}>
                                <Feather name="refresh-cw" color={refreshColor} size={28}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.tempText} >{current.temp}°C</Text>
                        <Text style={styles.tempDescText}>{current.desc}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.paddingWrapper}>
                <View style={styles.infoContainer}>
                    <View style={styles.infoWrapper}>
                        <Feather style={styles.infoIcon} name="sunrise" size={24} />
                        <Text style={styles.infoTitle}>Amanhecer</Text>
                        <Text style={styles.infoText}>{formatHour(current.sunr)}</Text>
                    </View>
                    <View style={styles.infoWrapperMiddle}>
                        <Feather style={styles.infoIcon} name="sunset" size={24} />
                        <Text style={styles.infoTitle}>Anoitecer</Text>
                        <Text style={styles.infoText}>{formatHour(current.suns)}</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <Feather style={styles.infoIcon} name="thermometer" size={24} />
                        <Text style={styles.infoTitle}>Sens. Térmica</Text>
                        <Text style={styles.infoText}>{current.feel}°C</Text>
                    </View>
                </View>
            </View>

            <View style={styles.paddingWrapper}>
                <View style={styles.infoContainer}>
                    <View style={styles.infoWrapper}>
                        <Feather style={styles.infoIcon} name="droplet" size={24} />
                        <Text style={styles.infoTitle}>Umidade</Text>
                        <Text style={styles.infoText}>{current.humd}%</Text>
                    </View>
                    <View style={styles.infoWrapperMiddle}>
                        <Entypo style={styles.infoIcon} name="gauge" size={24} />
                        <Text style={styles.infoTitle}>Pressão</Text>
                        <Text style={styles.infoText}>{current.pres}hPa</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <Feather style={styles.infoIcon} name="wind" size={24} />
                        <Text style={styles.infoTitle}>Vento</Text>
                        <Text style={styles.infoText}>{current.wind}m/s</Text>
                    </View>
                </View>
            </View>
            <View style={styles.tempWrapper2}>
                <Text style={styles.forecastTitle}>Próximas Horas</Text>
                <FlatList
                    horizontal
                    renderItem={HourlyForecast}
                    data={forecast}
                    ItemSeparatorComponent={FlatListDivider}
                    ListEmptyComponent={() => <View></View>}
                    ListHeaderComponent={FlatListDivider}
                    ListFooterComponent={FlatListDivider}
                    contentOffset={{ x: 31, y: 1 }}
                />
            </View>
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'baseline',
    },
    button: {
        backgroundColor: '#dbf3fe',
        borderBottomColor: '#3fa3d1',
        borderBottomWidth: 4,
        borderRightColor: '#3fa3d1',
        borderRightWidth: 4,
        borderLeftColor: '#3fa3d1',
        borderLeftWidth: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 20
    },
    text: {
        fontSize: 18
    },
    paddingWrapper: {
        paddingHorizontal: 10,
        width: '100%',
        alignSelf: "center",
    },
    tempWrapper: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 15
    },
    tempWrapper2: {
        flex: 1,
        width: '100%',
        alignItems: 'stretch'
    },
    controlWrapper: {
        flexDirection: 'row',
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 15
    },
    cityWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    cityTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    cityIcon: {
        height: 40,
        width: 40,
        backgroundColor: '#fff',
        borderRadius: 40
    },
    tempText: {
        textAlign: 'center',
        fontSize: 24
    },
    tempDescText: {
        textAlign: 'center',
        fontSize: 16
    },
    refreshIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    infoWrapper: {
        flex: 1,
        aspectRatio: 1,
        marginTop: 20,
        backgroundColor: '#fff',
        paddingVertical: 20,
        borderRadius: 15,
        elevation: 15,
        justifyContent: 'space-around'
    },
    infoWrapperMiddle: {
        flex: 1,
        aspectRatio: 1,
        marginTop: 20,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        paddingVertical: 20,
        borderRadius: 15,
        elevation: 15,
        justifyContent: 'space-around'
    },
    infoIcon: {
        textAlign: 'center',
    },
    infoTitle: {
        textAlign: 'center',
        fontSize: 10
    },
    infoText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '500'
    },
    forecastTitle: {
        fontSize: 24,
        marginVertical: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    }
});

export default HomeScreen