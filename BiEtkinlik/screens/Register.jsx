import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { schema } from '../schemas/RegisterSchema'
import { useTranslation } from 'react-i18next';
import { HelperText, TextInput } from 'react-native-paper';
import dayjs from 'dayjs';

import { cities } from '../data/MyData'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Picker from 'react-native-picker-select';


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
    const [city, setCity] = useState("Sehir Sec");
    const [birthDate, setBirthDate] = useState(new Date());
    const [gender, setGender] = useState("");
    const [areas, setAreas] = useState([]);
    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [showConfPass, setShowConfPass] = useState(false);

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
                    areas,
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

            dispatch(RegisterTheSystem(data));
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
            <View style={styles.title}>
                <Text style={styles.titleText}>Bi Etkinlik</Text>
                <Text style={styles.slogan}>Zamanını Değerlendir, Bi Etkinlik Seç</Text>
            </View>
            <View style={styles.input}>
                <TextInput

                    mode='outlined'
                    label="İsim"
                    activeOutlineColor='black'
                    value={firstName}
                    onChangeText={text => setFirstName(text)}


                />
                <HelperText type='error'
                    visible={Boolean(errors.firstName)}>
                    {errors.firstName}
                </HelperText>
            </View>
            <View style={styles.input}>
                <TextInput
                    mode='outlined'
                    label="Soyisim"
                    activeOutlineColor='black'
                    value={lastName}
                    onChangeText={text => setLastName(text)}

                />
                <HelperText type='error'
                    visible={Boolean(errors.lastName)}>
                    {errors.lastName}
                </HelperText>
            </View>
            <View style={styles.input}>
                <TextInput
                    mode='outlined'
                    label="Kullanıcı Adı"
                    activeOutlineColor='black'
                    value={userName}
                    onChangeText={text => setUserName(text)}

                />
                <HelperText type='error'
                    visible={Boolean(errors.userName)}>
                    {errors.userName}
                </HelperText>
            </View>
            <View style={styles.input}>
                <TextInput
                    mode='outlined'
                    label="E-posta"
                    activeOutlineColor='black'
                    value={email}
                    onChangeText={text => setEmail(text)}

                />
                <HelperText type='error'
                    visible={Boolean(errors.email)}>
                    {errors.email}
                </HelperText>
            </View>
            <View style={styles.input}>
                <TextInput
                    mode='outlined'
                    label="Şifre"
                    activeOutlineColor='black'
                    value={password}
                    onChangeText={text => setPassword(text)}

                />
                <HelperText type='error'
                    visible={Boolean(errors.password)}>
                    {errors.password}
                </HelperText>
            </View>
            <View style={styles.input}>
                <TextInput
                    mode='outlined'
                    label="Şifre Tekrarı"
                    activeOutlineColor='black'
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}

                />
                <HelperText type='error'
                    visible={Boolean(errors.confirmPassword)}>
                    {errors.confirmPassword}
                </HelperText>
            </View>
            <View style={styles.input}>

                <Picker

                    onValueChange={(val) => setCity(val)}
                    items={[
                        { label: 'Java', value: 'java' },
                        { label: 'JavaScript', value: 'js' }
                    ]}
                    value={city}
                />

            </View>
            <View style={styles.input}>

                <TouchableOpacity onPress={() => setBirthDatePicker(true)}>
                    <TextInput
                        mode='outlined'
                        label="Doğum Tarihi"
                        value={formattedBirthDate}
                        editable={false}
                        style={{ backgroundColor: "#fff" }}
                    />
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={birthDatePicker}
                    mode="date"
                    locale="tr-TR"
                    onConfirm={(date) => {
                        setBirthDatePicker(false);
                        setBirthDate(date);
                    }}
                    onCancel={() => setBirthDatePicker(false)}
                />
            </View>
        </View>
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
    title: {
        marginTop: 50,
        marginBottom: 20
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
        height: 50,
        width: 250,
        margin: 5,
        backgroundColor: 'whitesmoke'
    },
})