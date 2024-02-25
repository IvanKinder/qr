import { View, Image, Text, StyleSheet } from "react-native";

const ShortWeather = ({route}) => {
    const description = route.params.current?.condition?.text;
    const icon = `https:${route.params.current?.condition?.icon}`;
    const humidity = route.params.current?.humidity;
    const pressure = route.params.current?.pressure_mb;
    const temperature = route.params.current?.temp_c;

    console.log(icon);
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={{uri: icon}} />
            <Text>description: {description}</Text>
            <Text>humidity: {humidity}</Text>
            <Text>pressure: {pressure} </Text>
            <Text>temperature: {temperature} C</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 15
    },
    img: {
        width: 66,
        height: 58,
    },
});

export default ShortWeather;
