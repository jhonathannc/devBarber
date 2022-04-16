import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
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
import PersonIcon from '../../assets/person.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
  const navigation = useNavigation();

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [nameField, setNameField] = useState('');

  const handleSignClick = async () => {
    if (emailField != '' && passwordField != '' && nameField != '') {
      let response = await api.signUp(nameField, emailField, passwordField);

      if (response.token) {
        alert('Cadastro efetuado com sucesso!');
        navigation.navigate('SignIn');
      } else {
        alert('Erro ao realizar o cadastro');
      }
    } else {
      alert('Preencha todos os campos');
    }
  };

  const handleMessageButtonClick = () => {
    navigation.navigate('SignIn');
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput
          IconSvg={PersonIcon}
          placeholder="Seu Nome"
          value={nameField}
          onChangeText={text => setNameField(text)}
        />

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
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
