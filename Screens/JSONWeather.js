import { ScrollView } from "react-native";
import JSONTree from 'react-native-json-tree'

const JSONWeather = ({route}) => {
    const expandNodes = (keyName, data, level) => {
        return level === 1;
    }
    return (
        <ScrollView>
            <JSONTree data={route.params} hideRoot shouldExpandNode={expandNodes} />
        </ScrollView>
    )
}

export default JSONWeather;
