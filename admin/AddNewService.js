import React, { useState } from "react"
import { View, Image,StyleSheet } from "react-native"
import { Text, TextInput, Button } from "react-native-paper"
import firestore from '@react-native-firebase/firestore'
import storage from "@react-native-firebase/storage"
import ImagePicker from "react-native-image-crop-picker"
import { useMyContextProvider } from "../index"
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors"

const AddNewService = ({navigation}) => {
    const [controller, dispatch] = useMyContextProvider()
    const {userLogin} = controller
    const [imagePath, setImagePath] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const SERVICES = firestore().collection("Services")
    const handleAddNewService = () => {
        SERVICES
        .add({
            title,
            price,
            create: userLogin.email
        })
        .then(response =>{
            const refImage = storage().ref("/services/" + response.id + ".png")
            refImage.putFile(imagePath)
            .then(
                ()=>
                    refImage.getDownloadURL()
                    .then(link =>
                        {
                            SERVICES.doc(response.id).update({
                                id: response.id, 
                                image: link
                                
                            })
                            navigation.navigate("Services")
                        }
                    )
                )
            .catch(e => console.log(e.message))
        })
    }
        
    const handleUploadImage = () =>{
        ImagePicker.openPicker({
            mediaType: "photo",
            width: 400,
            height: 300
        })
        .then(image =>
            setImagePath(image.path)
        )
        .catch(e=> console.log(e.message))
    }

    return (
        <View style={{ padding: 10, flex:1, backgroundColor:"white" }}>
            
            <Button textColor="black" buttonColor="orange" style={styles.button} mode="contained" onPress={handleUploadImage}>
                Upload Ảnh
            </Button>
            {((imagePath!= "")&&
            <Image source={{uri: imagePath}}
                style={{ width: 120, height: 120, borderRadius: 15, alignSelf:"center" }}
            />
            )}
            <Text style={{ fontSize: 20, fontWeight: 'bold',paddingBottom:15 }}>Tên sản phẩm :</Text>
            <TextInput
                placeholder="Nhập tên sản phẩm"
                value={title}
                onChangeText={setTitle}
                style={styles.textinput}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Giá :</Text>
            <TextInput
                placeholder="0"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                style={styles.textinput}
            />
            <Button style={styles.buttonadd}  textColor="black" mode="contained" onPress={handleAddNewService}>Thêm sản phẩm</Button>
        </View>
    );
};
const styles = StyleSheet.create({
    textinput:{
        marginBottom: 10, borderWidth: 1, borderRadius:10
    },
    buttonadd:{
        margin: 40, 
        backgroundColor:"orange",
    },
    button:{
        margin:20, 
        backgroundColor:"orange",
        marginLeft:80,
        marginRight:80
    }
})
export default AddNewService;

