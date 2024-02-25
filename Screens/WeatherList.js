import { ScrollView, StyleSheet, Button } from "react-native"
import Context from "../context/Context";
import { useContext } from "react";
import { openBrowserAsync } from "expo-web-browser";

const WeatherList = () => {
    const { sharedState, updateState } = useContext(Context);
    console.log(sharedState.weatherList);

    const placeTap = async (uri) => {
        await openBrowserAsync(uri);
    }

    const Places = () => {
        return (
            <ScrollView contentContainerStyle={styles.places}>
                {sharedState.weatherList.map(place => <Button title={place} key={place} onPress={() => placeTap(place)} />)}
            </ScrollView>
        )
    }

    return (
        <Places />
    )
}

const styles = StyleSheet.create({
    places: {
        flex: 1,
        gap: 5,
        padding: 5,
        alignContent: "center",
        alignItems: "center",
    }
});
export default WeatherList;
