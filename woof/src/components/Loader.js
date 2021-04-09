import React  from "react";
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";

const Loader = (props) => {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={props.isLoading}
      style={{ zIndex: 1100 }}
      onRequestClose={() => {}}
    >
      <View style={styles.modalBackground}>
        <ActivityIndicator animating={true} color="#EF233C" size="large" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    backgroundColor: "blue",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default Loader;
