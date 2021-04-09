import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Icon,
  Text,
} from "native-base";
import { View, Button } from "react-native";
import { useHistory } from "react-router";
const Storage = require("../../utilities/TokenStorage");

const BrowseAdaptor = () => {
  const history = useHistory();

  const logout = async () => {
    try {
      await Storage.save("isLoggedIn", "false");
      await Storage.remove("accessToken");
    }
    catch (e) {
      alert(e);
    }
    
    history.push("/login");
    
  }

  return (
    <View>
      <Text> Home Scene Dogs will be here</Text>
      <Button title="Go back to login" onPress={logout}></Button>
    </View>
  );
};

export default BrowseAdaptor;
