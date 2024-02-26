import { StyleSheet, Text, View, Button, Modal, Pressable } from "react-native";
import { useContext, useEffect, useState } from "react";
import { CameraView, Camera } from "expo-camera/next";
import { useNavigation } from "@react-navigation/native";
import { openBrowserAsync } from "expo-web-browser";
import Context from "../context/Context";
import { db } from "../db/db";
import { ref, get, child } from "firebase/database";



const Scanner = () => {
  const navigation = useNavigation();
  const [hasPerm, setHasPerm] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { sharedState, updateState } = useContext(Context);

  useEffect(() => {
    const getPermissions = async () => {
      let {status} = await Camera.requestCameraPermissionsAsync();
      setHasPerm(status === "granted");
    }
    getPermissions();

    const getLocations = () => {
      get(child(ref(db), "locations")).then((snapshot) => {
          if (snapshot.exists()) {
            updateState({
              ...sharedState,
              weatherList: snapshot.val(),
            });
          }
        }).catch((error) => {
          console.error(null);
        });
    }
    getLocations();
  }, [])

  if (hasPerm === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPerm === false) {
    return <Text>No access to camera</Text>;
  }

  const handleQrCodeScanned = async ({type, data}) => {
    setScanned(data);
    await openBrowserAsync(data);
    setTimeout(() => setModalVisible(!modalVisible), 500);
  }

  const savePlace = () => {
    if (!sharedState.weatherList.includes(scanned)) {
      updateState({
        ...sharedState,
        weatherList: [...sharedState.weatherList, scanned],
      });
    }
    setModalVisible(!modalVisible)
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Do you want to save the last location?</Text>
            <View style={styles.modalBtns}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => savePlace()}>
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  modalBtns: {
    flexDirection: "row",
    gap: 10,
  },
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 3,
    padding: 10,
    elevation: 2,
    width: 100,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Scanner;