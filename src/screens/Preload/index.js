import React, {useEffect, useContext} from 'react';
import {Container, LoadingIcon} from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import api from '../../utils/api';

import BarberLogo from '../../assets/barber.svg';

import {UserContext} from '../../contexts/UserContext';

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext);

  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        let res = await api.checkToken(token);
        if (res.token) {
          userDispatch({
            type: 'SET_TOKEN',
            payload: {
              token: res.token,
            },
          });

          navigation.reset({
            routes: [{name: 'MainTab'}],
          });
        } else {
          navigation.reset({
            routes: [{name: 'SignIn'}],
          });
        }
      } else {
        navigation.reset({
          routes: [{name: 'SignIn'}],
        });
      }
    };
    checkToken();
  });

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <LoadingIcon size="large" color="white" />
    </Container>
  );
};
