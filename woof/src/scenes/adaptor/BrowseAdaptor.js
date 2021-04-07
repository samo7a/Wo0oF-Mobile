import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Icon, Text } from 'native-base';
import { View, Button } from 'react-native';
import { useHistory } from 'react-router';

const BrowseAdaptor = () => {
  const history = useHistory();
  return (
    <View>
      <Text> Home Scene Dogs will be here</Text>
      <Button title="Go back to login" onPress={() => history.push('/login')}>  </Button>
    </View>
  );

}

export default BrowseAdaptor;
