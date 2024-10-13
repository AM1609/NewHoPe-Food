import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import firestore from "@react-native-firebase/firestore";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [disableGetPassword, setDisableGetPassword] = useState(true);

  const hasErrorEmail = () => !email.includes('@');

  const handleGetPassword = () => {
    firestore()
      .collection('USERS')
      .doc(email)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const userData = documentSnapshot.data();
          setPassword(userData.password);
          setError('');
        } else {
          setPassword('');
          setError('Email không tồn tại trong hệ thống.');
        }
      })
      .catch((error) => {
        console.error("Error fetching document: ", error);
        setPassword('');
        setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
      });
  };
  useEffect(() => {
    setDisableGetPassword(email.trim() === '' || !!error || hasErrorEmail());
  }, [email, error, hasErrorEmail]);

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor:"white" }}>
      <Text style={{
        fontSize: 30,
        fontWeight: "bold",
        alignSelf: "center",
        color: "orange",
        marginTop: 100,
        marginBottom: 50
      }}>
        Forgot Password
      </Text>
      <TextInput
        label={"Email"}
        value={email}
        onChangeText={setEmail}
        style={styles.textinput}
      />
      <HelperText style={{paddingLeft:30}} type='error' visible={hasErrorEmail()}>
        Địa chỉ email không hợp lệ
      </HelperText>
      {password ? (
        <View style={{flexDirection: "row"}}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Your Password: </Text>
          <Text style={{fontSize: 18}}>{password}</Text>
        </View>
      ) : null}
      <Button style={styles.button} mode='contained' textColor='black' buttonColor='orange' onPress={handleGetPassword} disabled={disableGetPassword}>
        Get Password
      </Button>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Button onPress={() => navigation.navigate("Login")}>
          Back to Login
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
    borderRadius: 10, marginRight:25,marginLeft:25, marginBottom:10, marginTop:150
  },
  
  button:{
    marginRight:40,marginLeft:40, borderRadius:5, marginTop:20
  }
})
export default ForgotPassword;
