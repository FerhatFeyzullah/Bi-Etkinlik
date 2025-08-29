import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { schema } from '../schemas/RegisterSchema'
import { useTranslation } from 'react-i18next';
import { Button, HelperText, TextInput } from 'react-native-paper';
import dayjs from 'dayjs';
import { citiesTwo } from '../data/MyData'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper';


const Register = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { t: tCategory } = useTranslation("category");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [city, setCity] = useState("");
    const [birthDate, setBirthDate] = useState();
    const [gender, setGender] = useState("");
    const [areas, setAreas] = useState([]);
    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [showConfPass, setShowConfPass] = useState(false);

    const [phaseStatus, setPhaseStatus] = useState("Category");

    const formattedBirthDate = dayjs(birthDate).format("YYYY-MM-DD");
    const [birthDatePicker, setBirthDatePicker] = useState(false);


    const toggleCategory = (catId) => {
        setAreas((prev) =>
            prev.includes(catId)
                ? prev.filter((id) => id !== catId)
                : [...prev, catId]
        );
    };

    const FormClear = () => {
        setFirstName("");
        setLastName("");
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setCity("");
        setBirthDate(null);
        setGender("");
        setAreas([]);
    };

    const Submit = async () => {
        try {
            await schema.validate(
                {
                    firstName,
                    lastName,
                    userName,
                    email,
                    password,
                    confirmPassword,
                    city,
                    birthDate,
                    gender,
                },
                { abortEarly: false }
            );
            setErrors({});
            const data = {
                RegisterDto: {
                    FirstName: firstName,
                    LastName: lastName,
                    UserName: userName,
                    Email: email,
                    Password: password,
                    ConfirmPassword: confirmPassword,
                    City: city,
                    BirthDate: formattedBirthDate,
                    Gender: gender,
                },
                AreasOfInterest: areas,
            };

            console.log(data)
            setPhaseStatus("Category")
        } catch (error) {
            const errObj = {};
            error.inner.forEach((e) => {
                errObj[e.path] = e.message;
            });
            setErrors(errObj);
        }
    };

    return (
        <View style={styles.registerContainer}>
            <View style={[styles.flexColumn, styles.titlePhase]}>
                <Text style={styles.titleText}>Bi Etkinlik</Text>
                <Text style={styles.slogan}>Zamanını Değerlendir, Bi Etkinlik Seç</Text>
            </View>
            {
                phaseStatus == "Information" ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Isim */}
                        <View style={[styles.input, { marginTop: 5 }]}>
                            <TextInput
                                mode='outlined'
                                label="İsim"
                                activeOutlineColor='black'
                                value={firstName}
                                onChangeText={text => setFirstName(text)}
                            />

                        </View>
                        <HelperText type='error'
                            style={{ marginTop: 20, marginBottom: -3 }}
                            visible={Boolean(errors.firstName)}>
                            {errors.firstName}
                        </HelperText>

                        {/* Soyisim */}

                        <View style={styles.input}>
                            <TextInput
                                mode='outlined'
                                label="Soyisim"
                                activeOutlineColor='black'
                                value={lastName}
                                onChangeText={text => setLastName(text)}

                            />

                        </View>
                        <HelperText type='error'
                            style={{ marginTop: 20, marginBottom: -3 }}
                            visible={Boolean(errors.lastName)}>
                            {errors.lastName}
                        </HelperText>

                        {/* UserName */}

                        <View style={styles.input}>
                            <TextInput
                                mode='outlined'
                                label="Kullanıcı Adı"
                                activeOutlineColor='black'
                                value={userName}
                                onChangeText={text => setUserName(text)}
                            />
                        </View>
                        <HelperText type='error'
                            style={{ marginTop: 20, marginBottom: -3 }}
                            visible={Boolean(errors.userName)}>
                            {errors.userName}
                        </HelperText>

                        {/* Email */}

                        <View style={styles.input}>
                            <TextInput
                                mode='outlined'
                                label="E-posta"
                                activeOutlineColor='black'
                                value={email}
                                onChangeText={text => setEmail(text)}

                            />

                        </View>
                        <HelperText type='error'
                            style={{ marginTop: 20, marginBottom: -3 }}
                            visible={Boolean(errors.email)}>
                            {errors.email}
                        </HelperText>

                        {/* Password */}

                        <View style={styles.input}>
                            <TextInput
                                mode='outlined'
                                label="Şifre"
                                activeOutlineColor='black'
                                value={password}
                                onChangeText={text => setPassword(text)}
                            />
                        </View>
                        <HelperText type='error'
                            style={{ marginTop: 20, marginBottom: -3 }}
                            visible={Boolean(errors.password)}>
                            {errors.password}
                        </HelperText>

                        {/* ConfirmPassword */}

                        <View style={styles.input}>
                            <TextInput
                                mode='outlined'
                                label="Şifre Tekrarı"
                                activeOutlineColor='black'
                                value={confirmPassword}
                                onChangeText={text => setConfirmPassword(text)}
                            />
                        </View>
                        <HelperText type='error'
                            style={{ marginTop: 20, marginBottom: -3 }}
                            visible={Boolean(errors.confirmPassword)}>
                            {errors.confirmPassword}
                        </HelperText>

                        {/* Dogum Tarihi */}

                        <View style={styles.input}>
                            <TouchableOpacity onPress={() => setBirthDatePicker(true)}>
                                <TextInput
                                    mode='outlined'
                                    label="Doğum Tarihi"
                                    value={formattedBirthDate}
                                    editable={false}
                                />
                            </TouchableOpacity>

                            <DateTimePickerModal
                                isVisible={birthDatePicker}
                                mode="date"
                                locale="tr"
                                onConfirm={(date) => {
                                    setBirthDatePicker(false);
                                    setBirthDate(date);
                                }}
                                onCancel={() => setBirthDatePicker(false)}
                            />
                        </View>
                        <HelperText type='error'
                            style={{ marginTop: 20, marginBottom: -3 }}
                            visible={Boolean(errors.birthDate)}>
                            {errors.birthDate}
                        </HelperText>

                        {/* City */}

                        <View style={styles.input}>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                data={citiesTwo}
                                search
                                maxHeight={250}
                                labelField="label"
                                valueField="value"
                                placeholder="Şehir Seç"
                                searchPlaceholder="Ara..."
                                value={city}
                                onChange={item => {
                                    setCity(item.value);
                                }}
                            />

                        </View>
                        <HelperText type='error'
                            style={{ marginTop: 20, marginBottom: -3 }}
                            visible={Boolean(errors.city)}>
                            {errors.city}
                        </HelperText>

                        {/* Gender */}

                        <View style={styles.input}>
                            <RadioButton.Group
                                onValueChange={newValue => setGender(newValue)}
                                value={gender}

                            >
                                <View style={styles.genderView}>
                                    <Text style={{ fontSize: 16 }}>Cinsiyet</Text>

                                    <View style={styles.flexRow}>
                                        <Text>Erkek</Text>
                                        <RadioButton value="Erkek" color='black' />
                                    </View>
                                    <View style={styles.flexRow}>
                                        <Text>Kadın</Text>
                                        <RadioButton value="Kadın" color='black' />
                                    </View>
                                </View>

                            </RadioButton.Group>
                        </View>
                        <HelperText type='error'
                            style={{ marginTop: 20 }}
                            visible={Boolean(errors.gender)}>
                            {errors.gender}
                        </HelperText>

                    </ScrollView>
                    :
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <Text>Kategoriler</Text>
                        </View>

                    </ScrollView>
            }

            <View style={[styles.flexColumn, styles.buttonPhase]} >

                <View style={{ width: '70%', marginTop: 10 }}>
                    <Button
                        mode='contained'
                        buttonColor='rgba(21, 57, 124, 1)'
                        onPress={Submit}
                    >Kaydol</Button>
                </View>

                <View>
                    <Button
                        textColor='grey'
                        onPress={() => navigation.navigate("ForgotPassword")}

                    >
                        Şifreni mi unuttun ?
                    </Button>
                </View>
                <View>
                    <Button
                        textColor='grey'
                        onPress={() => navigation.navigate("Register")}
                    >
                        Hesabın yok mu ? <Text style={{ color: "black" }}>Kaydol</Text>
                    </Button>
                </View>
            </View>



        </View >
    )
}

export default Register

const styles = StyleSheet.create({
    registerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titlePhase: {
        width: '100%',
        height: 130,
        borderBottomWidth: 0.5,
    },
    buttonPhase: {
        width: '100%',
        height: 150,
        borderTopWidth: 0.5,
    },
    titleText: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    slogan: {
        fontSize: 15,
        color: 'grey',
        fontWeight: "bold"
    },
    input: {
        height: 40,
        width: 250,
    },
    dropdown: {
        marginTop: 5,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    placeholderStyle: {
        fontSize: 16,
        marginLeft: 15
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 15

    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    genderView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "grey",
        backgroundColor: 'white',
        height: 50
    },

})