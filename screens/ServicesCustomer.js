import React, { useState, useEffect } from "react";
import { Image, TextInput, View, FlatList, TouchableOpacity, Alert,StyleSheet, ImageBackground,  } from "react-native";
import { IconButton, Text } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { ScrollView } from 'react-native';

const ServicesCustomer = ({ navigation }) => {
    const [initialServices, setInitialServices] = useState([]);
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]); // State to hold categories
        
    const filterByCategory = (category) => {
        if (category === 'all') {
            setServices(initialServices); // Hiển thị tất cả sản phẩm
        } else {
            const result = initialServices.filter(service => service.type === category);
            setServices(result);
            
        }
    };

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Services')
            .onSnapshot(querySnapshot => {
                const services = [];
                querySnapshot.forEach(documentSnapshot => {
                    services.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
                });
                setServices(services);
                setInitialServices(services);
            });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            const categorySnapshot = await firestore().collection('Type').get();
            const categoryList = categorySnapshot.docs.map(doc => doc.data().type); // Assuming 'type' is the field name
            setCategories(categoryList);
           
        };

        fetchCategories();
    }, []);

    const [name, setName] = useState('')
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleAppointment(item)} style={styles.serviceItem}>
            <View style={styles.imageContainer}>
                {item.image !== "" && (
                    <Image
                        source={{ uri: item.image }}
                        style={styles.serviceImage}
                        resizeMode="cover"
                    />
                )}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.serviceTitle}>{item.title}</Text>
                <Text style={styles.servicePrice}>
                    {Number(item.price).toLocaleString()} vnđ
                </Text>
            </View>
        </TouchableOpacity>
    );
    

    const handleAppointment = (service) => {
        navigation.navigate("Appointment", { service });
    }

    
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ backgroundColor:"white"}}>
            {/* SwiperFlatList with adjusted size */}
            <SwiperFlatList
                style={{ width: '100%', height: 150 }} // Điều chỉnh chiều cao nhỏ hơn
                autoplay
                autoplayDelay={2}
                autoplayLoop
                index={0}
                showPagination
            >
                <View style={styles.Viewimg}>
                    <Image style={styles.image} source={require("../assets/3-Fishsticks.jpg")}></Image>
                </View>
                <View style={styles.Viewimg}>
                    <Image style={styles.image} source={require("../assets/3-taro.jpg")}></Image>
                </View>
                <View style={styles.Viewimg}>
                    <Image style={styles.image} source={require("../assets/ga_2_mieng.png")}></Image>
                </View>
            </SwiperFlatList>
            <View style={{paddingLeft:20,paddingRight:20, marginTop: 20,marginBottom: 20 }} >
            <TextInput
                value={name}
                placeholder="Tìm kiếm"
                onChangeText={(text) => {
                    setName(text);
                    const result = initialServices.filter(service => service.title.toLowerCase().includes(text.toLowerCase()));
                    setServices(result);
                }}
                style={styles.searchInput}
            />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 10 }}>
                <TouchableOpacity style={[styles.categoryButton, { backgroundColor: '#f0f0f0' }]} onPress={() => filterByCategory('all')}>
                    <Text style={styles.categoryText}>Tất cả</Text>
                </TouchableOpacity>
                {categories.map((category, index) => (
                    <TouchableOpacity key={index} style={[styles.categoryButton, { backgroundColor: 'white' }]} onPress={() => filterByCategory(category)}>
                        <Text style={styles.categoryText}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Text style={{
                    padding: 15,
                    fontSize: 25,
                    fontWeight: "bold",
                }}>
                    Danh sách dịch vụ</Text>
            </View>
            <FlatList
                data={services}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2} 
                columnWrapperStyle={{ justifyContent: 'space-between' }} 
            />
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    rowitem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: "#F0F0F1"
    },
    Viewimg: {
        paddingLeft:15,
        justifyContent:"center", 
        alignSelf:"center",
        
    },
    image: {
        width:390,
        height:220,
        
    },
    categoryButton: {
        backgroundColor: 'white', // Đặt màu nền là trắng
        width: 100, // Đặt chiều rộng cho nút
        height: 50, // Đặt chiều cao cho nút
        borderRadius: 10, // Bo tròn góc
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1, // Thêm viền nếu cần
        borderColor: '#ccc', // Màu viền
    },
    categoryText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    serviceItem: {
        flex: 1,
        margin: 10,
        padding: 15,
        borderRadius: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
    },
    imageContainer: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    serviceImage: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    serviceTitle: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: 'center',
    },
    servicePrice: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
        marginTop: 5,
    },
    searchInput: {
        borderColor: "#0066cc",
        borderWidth: 1,
        borderRadius: 50,
        paddingHorizontal: 16,
        height: 60,
        fontSize: 20,
        marginVertical: 10,
        backgroundColor: '#f9f9f9', // Light background for input
    },
    categoryButton: {
        backgroundColor: '#f0f0f0', // Lighter background for buttons
        width: 100,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
})

export default ServicesCustomer;
