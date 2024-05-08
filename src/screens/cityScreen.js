import { Feather } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import CityCurrentForecast from "../components/cityCurrentForecast"
import FlatListDivider from "../components/flatListDivider"
import useOpenWeatherAPI from "../hook/useOpenweather"
import Spinner from "../components/spinner"


const CityScreen = ({ navigation }) => {
    const gradientColorsMorning = ['#71d2ff', '#85d5fa', '#a8e3ff']
    const owAPI = useOpenWeatherAPI();
    const coords = [
        { lat: -21.968162, lon: -46.792163 },
        { lat: -21.835700, lon: -46.880600 },
        { lat: -21.788300, lon:	-46.562500 },
        { lat: -23.454163, lon: -46.534096 },
        { lat: -23.944841, lon:	-46.330376 },
        { lat: 	-3.117034, lon:	-60.025780 }
    ]

    var [isSpinnerVisible, setIsSpinnerVisible] = useState(false)
    var [citiesCurrentForecast, setCitiesCurrentForecast] = useState([])
    var [refreshColor, setRefreshColor] = useState('black')

    useEffect(() => { loadData() }, [])

    async function loadData() {
        setIsSpinnerVisible(true)
        setRefreshColor('red')

        let processedResponse = []

        for (let index = 0; index < coords.length; index++) {
            const coord = coords[index];
            let response = await owAPI.getCurrentWeather(coord.lat, coord.lon)

            if (response.cod == 200) {
                processedResponse.push({
                    city: response.name,
                    temp: response.main.temp,
                    icon: response.weather[0].icon,
                    desc: response.weather[0].description.charAt(0).toUpperCase() + response.weather[0].description.slice(1)
                })
            }
        }

        setCitiesCurrentForecast(processedResponse)
        setRefreshColor('black')
        setIsSpinnerVisible(false)
    }

    return (
        <LinearGradient colors={gradientColorsMorning} end={{ x: 1, y: 1 }} style={styles.container}>
            {isSpinnerVisible && (<Spinner></Spinner>)}
            <View style={styles.paddingWrapper}>
                <View style={styles.contentWrapper}>
                    <View style={styles.cityHeader}>
                        <Text style={styles.cityTitle}>Clima atual nas Cidades</Text>
                        <TouchableOpacity onPress={() => { loadData() }}>
                            <Feather name="refresh-cw" color={refreshColor} size={28}></Feather>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.paddingWrapper}>
                <FlatList
                    style={{marginBottom: 90}}              
                    renderItem={CityCurrentForecast}        
                    data={citiesCurrentForecast}            
                    ItemSeparatorComponent={FlatListDivider}
                    ListEmptyComponent={() => <View></View>}
                    ListHeaderComponent={FlatListDivider}   
                    ListFooterComponent={FlatListDivider}   
                />
            </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
    },
    paddingWrapper: {
        paddingHorizontal: 10,
        width: '100%',
        alignSelf: "center",
    },
    contentWrapper: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 15
    },
    cityHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cityTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    }
})

export default CityScreen