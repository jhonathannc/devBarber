import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../contexts/UserContext';

import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';
import api from '../../utils/api';

import SignInput from '../../components/SignInput';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext);

  const navigation = useNavigation();

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSignClick = async () => {
    if (emailField != '' && passwordField != '') {
      let res = await api.signIn(emailField, passwordField);

      if (res.token) {
        userDispatch({
          type: 'SET_TOKEN',
          payload: {
            token: res.token,
          },
        });

        userDispatch({
          type: 'SET_AVATAR',
          payload: {
            avatar: res.data.avatar,
          },
        });

        navigation.reset({
          routes: [{name: 'MainTab'}],
        });
      } else {
        alert('Email e/ou senha incorretos');
      }
    } else {
      alert('Preencha todos os campos');
    }
  };

  const handleMessageButtonClick = () => {
    navigation.navigate('SignUp');
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput
          IconSvg={EmailIcon}
          placeholder="E-mail"
          value={emailField}
          onChangeText={text => setEmailField(text)}
        />

        <SignInput
          IconSvg={LockIcon}
          placeholder="Senha"
          value={passwordField}
          onChangeText={text => setPasswordField(text)}
          isPassword={true}
        />

        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>
          Ainda não possui uma conta?
        </SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
