import { StyleSheet, Text, View, Button } from "react-native";
import { useContext, useEffect, useState } from "react";
import { CameraView, Camera } from "expo-camera/next";
import { useNavigation } from "@react-navigation/native";
import { openBrowserAsync } from "expo-web-browser";
import Context from "../context/Context";


const Scanner = () => {
  const navigation = useNavigation();
  const [hasPerm, setHasPerm] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { sharedState, updateState } = useContext(Context);

  useEffect(() => {
    const getPermissions = async () => {
      let {status} = await Camera.requestCameraPermissionsAsync();
      setHasPerm(status === "granted");
    }
    getPermissions();
  }, [])

  if (hasPerm === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPerm === false) {
    return <Text>No access to camera</Text>;
  }

  const handleQrCodeScanned = async ({type, data}) => {
    setScanned(data);
    if (!sharedState.weatherList.includes(data)) {
      updateState({
        ...sharedState,
        weatherList: [...sharedState.weatherList, data],
      });
    }
    await openBrowserAsync(data);
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
      <View style={styles.btns}>
        <Button title="Weather list" onPress={() => navigation.navigate("WeatherList")} />
        {scanned && (
          <Button title={"Tap to Scan!"} onPress={() => setScanned(false)} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btns: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginTop: 600,
  },
  container: {
    flex: 1,
  }
});

export default Scanner;