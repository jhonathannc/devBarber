import AsyncStorage from '@react-native-community/async-storage';

export const initialState = {
  avatar: '',
  favorites: [],
  appointments: [],
};

export const UserReducer = async (state, action) => {
  switch (action.type) {
    case 'SET_AVATAR':
      return {
        ...state,
        avatar: action.payload.avatar,
      };
    case 'SET_TOKEN':
      const token = action.payload.token;
      await AsyncStorage.setItem('token', token);
      return {
        ...state,
        token,
      };
    default:
      return state;
  }
};
