import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Button, View } from 'react-native';


const Menu = ({route}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.menu}>
          <Button title={"Show short wheather"} onPress={() => navigation.navigate('ShortWeather', route.params)} />
          <Button title={"Show full wheather JSON"} onPress={() => navigation.navigate('JSONWeather', route.params)} />
          <Button title={"Go to wheather site"} onPress={() => navigation.navigate('ShortWeather')} />
        </View>
    )
}

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        gap: 10,
        paddingTop: 50
    },
});

export default Menu;