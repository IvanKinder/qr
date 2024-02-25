import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { CameraView, Camera } from "expo-camera/next";
import * as Location from 'expo-location';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const Scanner = () => {
  const navigation = useNavigation();
  const [hasPerm, setHasPerm] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const checkGeoPerms = async () => {
    let status = await Location.requestForegroundPermissionsAsync();
    status = status?.status;

    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      setLatitude('55.743679');
      setLongitude(' 37.625496');
    } else {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
  }

  useEffect(() => {
    const getPermissions = async () => {
      let {status} = await Camera.requestCameraPermissionsAsync();
      setHasPerm(status === 'granted');
      await checkGeoPerms();
    }
    getPermissions();
  }, [])

  if (hasPerm === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPerm === false) {
    return <Text>No access to camera</Text>;
  }

  if (errorMsg) {
    alert(`${errorMsg} - set default location Moscow`);
  } else if (location) {
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  }

  const getWeather = async (APIKey) => {
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: {q: `${latitude},${longitude}`},
      headers: {
        'X-RapidAPI-Key': APIKey,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      return <Text>{error}</Text>;
    }
  }

  const handleQrCodeScanned = async ({type, data}) => {
    setScanned(data);
    const weather = await getWeather(data);

    navigation.navigate('Menu', weather);
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleQrCodeScanned}
        barcodeScannerSettings={{
          barCodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.btn}>
          <Button title={"Tap to Scan Again!"} onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginTop: 600
  }
});

export default Scanner;