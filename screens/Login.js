import React, { useEffect, useState } from 'react';
import { Image, View, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useMyContextProvider, login } from '../index';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BorderlessButton } from 'react-native-gesture-handler';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controller, dispatch] = useMyContextProvider();
  const { userLogin } = controller;
  const [showPassword, setShowPassword] = useState(false);
  const [disableLogin, setDisableLogin] = useState(true);

  const hasErrorEmail = () => !email.includes("@");
  const hasErrorPassword = () => password.length < 6;

  useEffect(() => {
    setDisableLogin(email.trim() === '' || password.trim() === '' || hasErrorEmail() || hasErrorPassword());
  }, [email, password, hasErrorEmail, hasErrorPassword]);

  const handleLogin = () => {
    login(dispatch, email, password);
    
  };

  useEffect(() => {
    console.log(userLogin)
    if (userLogin != null) {
      if (userLogin.role === "admin")
        navigation.navigate("Admin")
      else if (userLogin.role === "customer")
        navigation.navigate("Customer")
    }
  }, [userLogin])

  return (
    <View style={{ flex: 1, padding: 10,backgroundColor:"orange" }}>
      
      <Image source={require("../assets/transcend_icon.png")}
                style={{
                    alignSelf: "center",
                    marginTop: 80,
                    marginBottom:80,
                    width:200,
                    height:200
                }}
            />
      <TextInput
        label={"Email"}
        value={email}
        onChangeText={setEmail}
        style={{ marginRight:40,marginLeft:40, backgroundColor:"white"}}
      />
      <HelperText style={{marginLeft:35, fontSize:15}} type='error' visible={hasErrorEmail()}>
        Địa chỉ Email không hợp lệ
      </HelperText>
      <TextInput
          label={"Mật khẩu"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={showPassword}
          style={{ marginRight:40,marginLeft:40, backgroundColor:"white"}}
        />
      <HelperText style={{marginLeft:35, fontSize:15}} type='error' visible={hasErrorPassword()}>
        Password có ít nhất 6 ký tự
      </HelperText>
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', marginLeft: 40, marginTop:10 }}>
          <Image
            source={showPassword ? require('../assets/eye.png') : require('../assets/eye-hidden.png')}
            style={{ width: 20, height: 20, marginRight:10}}
          />
          <Text style={{fontSize:18}}>Hiển thị mật khẩu</Text>
        </TouchableOpacity>
      <Button style={styles.buttondn} mode='contained' textColor='black'  buttonColor='white'  onPress={handleLogin} disabled={disableLogin}>
      <Text style={{fontSize:20}}>Đăng nhập</Text>
      </Button>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        
        <Button  onPress={() => navigation.navigate("Register")} >
        
        <Text style={styles.creforgot}>Tạo tài khoản</Text>
        </Button>
        <Button onPress={() => navigation.navigate("ForgotPassword")}>
          
          <Text style={styles.creforgot}>Quên mật khẩu</Text>
        </Button>
      </View>
      
      
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  buttondn:{
    marginRight:40,marginLeft:40, marginTop:20, borderRadius:5
  },
  
  creforgot: {
    paddingTop:10,
    fontSize:18, 
    color:"#0000FF"
  }
});