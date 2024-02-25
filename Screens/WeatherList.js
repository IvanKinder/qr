import { ScrollView, StyleSheet, Button, Text, View } from "react-native"
import Context from "../context/Context";
import { useContext } from "react";
import { openBrowserAsync } from "expo-web-browser";

const WeatherList = () => {
    const { sharedState, updateState } = useContext(Context);

    const placeTap = async (uri) => {
        await openBrowserAsync(uri);
    }

    const Places = () => {
        if (sharedState.weatherList.length > 0) {
            return (
                <ScrollView contentContainerStyle={styles.places}>
                    {sharedState.weatherList.map(place => <Button title={place} key={place} onPress={() => placeTap(place)} />)}
                </ScrollView>
            )
        }
        return (
            <View style={styles.empty}>
                <Text>Empty list</Text>
            </View>
        )
    }

    return (
        <Places />
    )
}

const styles = StyleSheet.create({
    empty: {
        alignItems: "center",
    },
    places: {
        flex: 1,
        gap: 5,
        padding: 5,
        alignContent: "center",
        alignItems: "center",
    }
});
export default WeatherList;
