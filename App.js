import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { CameraView, Camera } from "expo-camera/next";


export default function App() {
  const [hasPerm, setHasPerm] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPerm(status === 'granted');
    }
    getCameraPermissions();
  }, [])

  if (hasPerm === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPerm === false) {
    return <Text>No access to camera</Text>;
  }


  const handleQrCodeScanned = ({type, data}) => {
    setScanned(data);
    alert(`type: ${type}; data: ${data}`);
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
    marginTop: 700
  }
});
