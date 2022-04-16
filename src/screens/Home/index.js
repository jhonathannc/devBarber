import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {Platform} from 'react-native';

import api from '../../utils/api';

import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
  LoadingIcon,
} from './styles';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

export default () => {
  const navigation = useNavigation();

  const [locationText, setLocationText] = useState('');
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [barberList, setBarberList] = useState([]);

  const onPressSearchButton = () => {
    navigation.navigate('Search');
  };

  const handleLocationFinder = async () => {
    setCoords(null);
    let result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (result === 'granted') {
      setLoading(true);
      setLocationText('');
      setBarberList([]);

      Geolocation.getCurrentPosition(info => {
        setCoords(info.coords);
        getBarbers();
      });
    }
  };

  const getBarbers = async () => {
    setLoading(true);
    setBarberList([]);

    let res = await api.getBarbers();

    if (res.error == '') {
      if (res.loc) setLocationText(res.loc);
      setBarberList(res.data);
    } else {
      alert(`Erro: ${res.error}`);
    }

    setLoading(false);
  };

  useEffect(() => {
    getBarbers();
  }, []);

  return (
    <Container>
      <Scroller>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>
            Encontre seu barbeiro favorito
          </HeaderTitle>
          <SearchButton onPress={onPressSearchButton}>
            <SearchIcon width="26" height="26" fill="white" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput
            placeholder="Onde você está?"
            placeholderTextColor="white"
            value={locationText}
            onChangeText={text => setLocationText(text)}
          />

          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="24" height="24" fill="white" />
          </LocationFinder>
        </LocationArea>

        {loading && <LoadingIcon size="large" color="white" />}
      </Scroller>
    </Container>
  );
};
