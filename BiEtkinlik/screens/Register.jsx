import { StyleSheet, Text, View, TouchableOpacity, ScrollView, BackHandler, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { schema } from '../schemas/RegisterSchema'
import { useTranslation } from 'react-i18next';
import { Button, HelperText } from 'react-native-paper';
import dayjs from 'dayjs';
import { citiesTwo } from '../data/MyData'
import { genders } from '../data/MyData'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper';
import { GetAllCategory, SetLoadedCount } from '../redux/slices/categorySlice';
import CategoryCard from '../components/Register/CategoryCard';
import { RegisterTheSystem, SetRegisterMistakeAlert, SetRegisterSuccessAlert } from '../redux/slices/authSlice';
import MyToast from '../components/Elements/MyToast'
import Loading from '../components/Elements/Loading';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants/colors';



const Register = () => {
    const insets = useSafeAreaInsets();

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { t: tAlert } = useTranslation("alert");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [city, setCity] = useState("");
    const [birthDate, setBirthDate] = useState();
    const formattedBirthDate = dayjs(birthDate).format("YYYY-MM-DD");
    const [birthDatePicker, setBirthDatePicker] = useState(false);
    const [gender, setGender] = useState("");
    const [areas, setAreas] = useState([]);
    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [showConfPass, setShowConfPass] = useState(false);

    const [phaseStatus, setPhaseStatus] = useState("Information");


    const { allCategory, loadedCount } = useSelector(store => store.category)
    const [categoryLoading, setCategoryLoading] = useState(true)
    const totalCount = 37;

    useEffect(() => {
        if (loadedCount == totalCount) {
            setCategoryLoading(false);
        }
    }, [loadedCount])


    useEffect(() => {
        dispatch(GetAllCategory())
    }, [])

    useEffect(() => {
        if (registerSuccessAlert) {
            FormClear();
            navigation.navigate("Login");
        }
    }, [registerSuccessAlert])

    //Phase Degisim
    useEffect(() => {
        const backAction = () => {
            // Burada navigasyonu engelliyoruz ve state değiştiriyoruz
            if (phaseStatus == 'Category') {
                setPhaseStatus('Information');
                return true;
            }
            else {
                return false;
            }

        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove(); // cleanup
    }, [phaseStatus]);

    const toggleCategory = (catId) => {
        setAreas((prev) =>
            prev.includes(catId)
                ? prev.filter((id) => id !== catId)
                : [...prev, catId]
        );
        console.log(areas)
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

    const Next = () => {
        setPhaseStatus("Category")
        dispatch(SetLoadedCount())
    }

    const InfoCheck = async () => {
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
            setPhaseStatus("Category")
        } catch (error) {
            const errObj = {};
            error.inner.forEach((e) => {
                errObj[e.path] = e.message;
            });
            setErrors(errObj);
        }
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

    //Alerts
    const { registerResponse, registerMistakeAlert, registerSuccessAlert, registerLoading } = useSelector(store => store.auth)

    const CloseRegisterMistake = () => {
        dispatch(SetRegisterMistakeAlert(false));
    }
    const CLoseRegisterSuccess = () => {
        dispatch(SetRegisterSuccessAlert(false));
    }

    return (

        <View style={[styles.registerContainer, { paddingBottom: insets.bottom }]}>
            <View style={[styles.flexColumn, styles.titlePhase, { boxShadow: '0px 10px 20px -5px rgba(0, 0, 0, 0.2);}' }]}>
                <Text style={styles.titleText}>Bi Etkinlik</Text>
                <Text style={styles.slogan}>Zamanını Değerlendir, Bi Etkinlik Seç</Text>
            </View>
            {
                phaseStatus == "Information" ?
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior='height'

                    >
                        <ScrollView showsVerticalScrollIndicator={false} >

                            {/* Isim */}
                            <View style={styles.viewInput}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder='İsim'
                                        placeholderTextColor={COLORS.textLight}
                                        style={styles.textInput}
                                        value={firstName}
                                        onChangeText={text => setFirstName(text)}

                                    />
                                </View>
                                <HelperText type='error'
                                    visible={Boolean(errors.firstName)}>
                                    {errors.firstName}
                                </HelperText>
                            </View>

                            {/* Soyisim */}

                            <View style={styles.viewInput}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder='Soyisim'
                                        placeholderTextColor={COLORS.textLight}
                                        style={styles.textInput}
                                        value={lastName}
                                        onChangeText={text => setLastName(text)}

                                    />
                                </View>
                                <HelperText type='error'
                                    visible={Boolean(errors.lastName)}>
                                    {errors.lastName}
                                </HelperText>
                            </View>
                            {/* UserName */}

                            <View style={styles.viewInput}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder='Kullanıcı Adı'
                                        placeholderTextColor={COLORS.textLight}
                                        style={styles.textInput}
                                        value={userName}
                                        onChangeText={text => setUserName(text)}

                                    />
                                </View>
                                <HelperText type='error'
                                    visible={Boolean(errors.userName)}>
                                    {errors.userName}
                                </HelperText>
                            </View>

                            {/* Email */}

                            <View style={styles.viewInput}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder='E-posta'
                                        placeholderTextColor={COLORS.textLight}
                                        style={styles.textInput}
                                        value={email}
                                        onChangeText={text => setEmail(text)}

                                    />
                                </View>
                                <HelperText type='error'
                                    visible={Boolean(errors.email)}>
                                    {errors.email}
                                </HelperText>
                            </View>

                            {/* Password */}

                            <View style={styles.viewInput}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder='Şifre'
                                        placeholderTextColor={COLORS.textLight}
                                        style={styles.textInput}
                                        secureTextEntry={!showPass}
                                        value={password}
                                        onChangeText={text => setPassword(text)}
                                    />

                                    <TouchableOpacity
                                        style={styles.iconContainer}
                                        onPress={() => setShowPass(prevState => !prevState)}
                                    >
                                        <Icon name={showPass ? 'eye-slash' : 'eye'} size={20} color={COLORS.textLight} />
                                    </TouchableOpacity>
                                </View>

                                <HelperText type="error" visible={Boolean(errors.password)}>
                                    {errors.password}
                                </HelperText>
                            </View>

                            {/* ConfirmPassword */}

                            <View style={styles.viewInput}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder='Şifre Tekrarı'
                                        placeholderTextColor={COLORS.textLight}
                                        style={styles.textInput}
                                        secureTextEntry={!showConfPass}
                                        value={confirmPassword}
                                        onChangeText={text => setConfirmPassword(text)}
                                    />

                                    <TouchableOpacity
                                        style={styles.iconContainer}
                                        onPress={() => setShowConfPass(prevState => !prevState)}
                                    >
                                        <Icon name={showConfPass ? 'eye-slash' : 'eye'} size={20} color={COLORS.textLight} />
                                    </TouchableOpacity>
                                </View>

                                <HelperText type="error" visible={Boolean(errors.confirmPassword)}>
                                    {errors.confirmPassword}
                                </HelperText>
                            </View>

                            {/* Dogum Tarihi */}

                            <View style={styles.viewInput}>
                                <View style={styles.inputContainer}>
                                    <TouchableOpacity onPress={() => setBirthDatePicker(true)} style={styles.textInput}>
                                        <TextInput
                                            placeholder='Doğum Tarihi'
                                            placeholderTextColor={COLORS.textLight}
                                            value={birthDate}
                                            editable={false}
                                        />
                                    </TouchableOpacity>
                                </View>
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
                                <HelperText type='error'
                                    visible={Boolean(errors.birthDate)}>
                                    {errors.birthDate}
                                </HelperText>
                            </View>

                            {/* City */}

                            <View style={styles.viewInput}>
                                <View style={styles.inputContainer}>
                                    <Dropdown
                                        style={styles.textInput}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        data={citiesTwo}
                                        search
                                        maxHeight={250}
                                        labelField="label"
                                        valueField="value"
                                        placeholder="Şehirler"
                                        searchPlaceholder="Ara..."
                                        value={city}
                                        onChange={item => {
                                            setCity(item.value);
                                        }}
                                    />
                                </View>

                                <HelperText type='error'
                                    visible={Boolean(errors.city)}>
                                    {errors.city}
                                </HelperText>
                            </View>


                            {/* Gender */}

                            <View style={styles.viewInput}>
                                <View style={styles.inputContainer}>
                                    <Dropdown
                                        style={styles.textInput}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        data={genders}
                                        maxHeight={250}
                                        labelField="label"
                                        valueField="value"
                                        placeholder="Cinsiyet"
                                        value={gender}
                                        onChange={item => {
                                            setGender(item.value);
                                        }}
                                    />
                                </View>

                                <HelperText type='error'
                                    visible={Boolean(errors.gender)}>
                                    {errors.gender}
                                </HelperText>
                            </View>


                            <View style={styles.flexColumn}>
                                <View style={{ width: '70%', marginTop: 30 }}>
                                    <Button
                                        mode='contained'
                                        buttonColor={COLORS.primary}
                                        onPress={Next}
                                    >
                                        <Text style={{ color: COLORS.white }}>
                                            İlerle
                                        </Text>
                                    </Button>
                                </View>

                                <View style={{ marginTop: 10 }}>
                                    <Button
                                        textColor='grey'
                                        onPress={() => navigation.navigate("Login")}
                                    >
                                        <Text>Zaten bir hesabın var mı ? <Text style={{ color: COLORS.text }}> Giriş Yap</Text></Text>
                                    </Button>
                                </View>
                            </View>



                        </ScrollView>
                    </KeyboardAvoidingView>
                    :
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={[styles.container, styles.flexRow]}>
                            {allCategory.map(c => {
                                const isSelected = areas.includes(c.categoryId);
                                return (
                                    <CategoryCard key={c.categoryId}
                                        name={c.categoryName}
                                        isSelected={isSelected}
                                        onToggle={() => toggleCategory(c.categoryId)} />
                                )
                            })}

                            {/* Category Loading */}
                            <Loading status={categoryLoading} />
                        </View>
                        <HelperText type='error'
                            style={{ marginTop: 20, textAlign: 'center' }}
                            visible={Boolean(errors.areas)}>
                            {errors.areas}
                        </HelperText>
                        <View style={styles.flexColumn}>
                            <View style={{ width: '70%', marginTop: 10 }}>
                                <Button
                                    mode='contained'
                                    buttonColor={COLORS.primary}
                                    onPress={Submit}
                                >
                                    <Text style={{ color: COLORS.white }}>Kaydol</Text>
                                </Button>

                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Button
                                    textColor='grey'
                                    onPress={() => navigation.navigate("Login")}
                                >
                                    <Text>Zaten bir hesabın var mı ? <Text style={{ color: COLORS.text }}> Giriş Yap</Text></Text>
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
            }

            {/* Register Mistake */}
            <View>
                <MyToast
                    type={"error"}
                    visible={registerMistakeAlert}
                    detail={tAlert(registerResponse)}
                    closer={CloseRegisterMistake}
                />
            </View>

            {/* Register Success */}
            <View>
                <MyToast
                    type={"success"}
                    visible={registerSuccessAlert}
                    detail={tAlert(registerResponse)}
                    closer={CLoseRegisterSuccess}
                />
            </View>

            {/* Register Loading */}
            <Loading status={registerLoading} />



        </View >




    )
}

export default Register

const styles = StyleSheet.create({
    registerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.background
    },
    titlePhase: {
        width: '100%',
        height: 130,
    },
    buttonPhase: {
        width: '100%',
        height: 150,
    },
    titleText: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        color: COLORS.text
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
        fontSize: 15,
        marginLeft: 5,
        color: COLORS.textLight
    },
    selectedTextStyle: {
        fontSize: 15,
        marginLeft: 5,
        color: COLORS.textLight

    },
    inputSearchStyle: {
        height: 40,
        fontSize: 15,
        color: COLORS.textLight
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexColumnJustifyStart: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
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
    },
    container: { flexWrap: 'wrap' },
    viewInput: {
        height: 50,
        width: 250,
        margin: 15
    },
    textInput: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.border
    },
    iconContainer: {
        position: 'absolute',
        right: 20,

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },




})