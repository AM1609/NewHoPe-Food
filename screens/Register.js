import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { createAccount } from '../index';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Register = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [disableCreate, setDisableCreate] = useState(true);

  const hasErrorFullName = () => fullName === "";
  const hasErrorEmail = () => !email.includes('@');
  const hasErrorPassword = () => password.length < 6;
  const hasErrorPasswordConfirm = () => confirmPassword !== password;

  useEffect(() => {
    setDisableCreate(
      hasErrorFullName() ||
      hasErrorEmail() ||
      hasErrorPassword() ||
      hasErrorPasswordConfirm() ||
      phone.trim() === '' ||
      address.trim() === ''
    );
  }, [fullName, email, password, confirmPassword, phone, address, hasErrorFullName, hasErrorEmail, hasErrorPassword, hasErrorPasswordConfirm]);

  const handleRegister = () => {
    createAccount(email, password, fullName, phone, address, role, navigation);
  };

  return (
    <View style={{ flex: 1, padding: 10 , backgroundColor:"white"}}>
      <Text style={styles.header}
      > ĐĂNG KÍ TÀI KHOẢN </Text>
      <TextInput
        label={"Họ và tên"}
        value={fullName}
        onChangeText={setFullname}
        style={styles.textinput}
      />
      <HelperText style={{marginLeft:25 }} type='error' visible={hasErrorFullName()} >
        Full name không được phép để trống
      </HelperText>
      <TextInput
        label={"Email"}
        value={email}
        onChangeText={setEmail}
        style={styles.textinput}
      />
      <HelperText style={{marginLeft:25 }} type='error' visible={hasErrorEmail()}>
        Địa chỉ email không hợp lệ
      </HelperText>
      <View style={{ flexDirection: "row",marginLeft:25 }}>
        <TextInput
          label={"Mật khẩu"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={showPassword}
          style={{ flex: 1 }}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={showPassword ? require('../assets/eye.png') : require('../assets/eye-hidden.png')}
            style={{ width: 20, height: 20,marginTop:20, marginLeft:5}}
          />
        </TouchableOpacity>
      </View>
      <HelperText style={{marginLeft:25 }} type='error' visible={hasErrorPassword()}>
        Password ít nhất 6 kí tự
      </HelperText>
      <View style={{ flexDirection: "row",marginLeft:25 }}>
        <TextInput
          label={"Nhập lại mật khẩu"}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={showConfirmPassword}
          style={{ flex: 1 }}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Image
            source={showConfirmPassword ? require('../assets/eye.png') : require('../assets/eye-hidden.png')}
            style={{ width: 20, height: 20,marginTop:20, marginLeft:5}}
          />
        </TouchableOpacity>
      </View>
      
      <HelperText style={{marginLeft:40}} type='error' visible={hasErrorPasswordConfirm()}>
        Confirm Password phải giống với Password
      </HelperText>
      <TextInput
        label={"Địa chỉ"}
        value={address}
        onChangeText={setAddress}
        style={styles.textinput}
      />
      <TextInput
        label={"Điện thoại"}
        value={phone}
        onChangeText={setPhone}
        style={styles.textinput1}
      />
      <Button style={styles.button} textColor='black' buttonColor='orange' mode='contained' onPress={handleRegister} disabled={disableCreate}>
        Tạo tài khoản
      </Button>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Text style={{fontSize:16}}>Bạn đã có tài khoản ?</Text>
        <Button onPress={() => navigation.navigate("Login")}>
          <Text style={{fontSize:16, color:"blue"}}>Đăng nhập</Text>
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header:{
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    color: "orange",
    marginTop: 70,
    marginBottom: 70
  },
  textinput:{
    borderRadius: 10, marginRight:25,marginLeft:25
  },
  textinput1:{
    borderRadius: 10, marginRight:25,marginLeft:25, marginTop:25, marginBottom:25
  },
  button:{
    marginRight:40,marginLeft:40, borderRadius:5
  }
})
export default Register;
