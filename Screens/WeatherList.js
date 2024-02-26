import { ScrollView, StyleSheet, Button, Text, View, TouchableOpacity } from "react-native"
import Context from "../context/Context";
import { useContext } from "react";
import { openBrowserAsync } from "expo-web-browser";
import { ref, remove } from "firebase/database";
import { db } from "../db/db";

const WeatherList = () => {
    const { sharedState, updateState } = useContext(Context);

    const MyButton = ({ onPress, title }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.appButtonContainer}
        >
            <Text
                style={styles.appButtonText}
            >{title}</Text>
        </TouchableOpacity>
    );

    const placeTap = async (uri) => {
        await openBrowserAsync(uri);
    }

    const deletePlace = async (place) => {
        const newState = sharedState.weatherList.filter((item) => item !== place);
        updateState({
            weatherList: newState,
        });

    }

    const placeElement = (place) => {
        return (
            <View key={place} style={styles.place}>
                <View style={styles.placeBtn}>
                    <Button title={place} onPress={() => placeTap(place)} />
                </View>
                <MyButton title="delete" onPress={() => deletePlace(place)} />
            </View>
        )
    }

    const Places = () => {
        if (sharedState.weatherList?.length > 0) {
            return (
                <ScrollView contentContainerStyle={styles.places}>
                    {sharedState.weatherList.map(place => placeElement(place))}
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
        gap: 5,
        padding: 5,
        alignContent: "center",
        alignItems: "center",
    },
    place: {
        gap: 5,
        flexDirection: "row",

    },
    placeBtn: {
        maxWidth: 280,
        height: 50,
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "rgb(33, 150, 243);",
        borderRadius: 2,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    appButtonText: {
        flex: 1,
        textAlignVertical: "center",
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
      }
});
export default WeatherList;
