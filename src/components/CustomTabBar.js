import React from 'react';
import styled from 'styled-components/native';

import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';

const TabArea = styled.View`
  height: 60px;
  background-color: #4eadbe;
  flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default ({state, navigation}) => {
  const goTo = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <TabArea>
      <TabItem onPress={() => goTo('Home')}>
        <HomeIcon
          style={{opacity: state.index === 0 ? 1 : 0.5}}
          width="24"
          height="24"
          fill="white"
        />
      </TabItem>
      <TabItem onPress={() => goTo('Search')}>
        <SearchIcon
          style={{opacity: state.index === 1 ? 1 : 0.5}}
          width="24"
          height="24"
          fill="white"
        />
      </TabItem>
      <TabItem onPress={() => goTo('Appointments')}>
        <TodayIcon
          style={{opacity: state.index === 2 ? 1 : 0.5}}
          width="24"
          height="24"
          fill="white"
        />
      </TabItem>
      <TabItem onPress={() => goTo('Favorites')}>
        <FavoriteIcon
          style={{opacity: state.index === 3 ? 1 : 0.5}}
          width="24"
          height="24"
          fill="white"
        />
      </TabItem>
      <TabItem onPress={() => goTo('Profile')}>
        <AccountIcon
          style={{opacity: state.index === 4 ? 1 : 0.5}}
          width="24"
          height="24"
          fill="white"
        />
      </TabItem>
    </TabArea>
  );
};
