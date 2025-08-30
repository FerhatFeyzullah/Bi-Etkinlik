import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { schema } from '../schemas/LoginSchema'
import { useDispatch, useSelector } from 'react-redux';
import { LoginTheSystem, SetLoginMistakeAlert } from '../redux/slices/authSlice';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import MyToast from '../components/Elements/MyToast';
import Loading from '../components/Elements/Loading';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants/colors'

const Login = () => {
    const insets = useSafeAreaInsets();

    const { t: tAlert } = useTranslation("alert");

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { loginResponse, loginMistakeAlert, loginLoading } = useSelector(store => store.auth)

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShow, setPasswordShow] = useState(false);
    const [errors, setErrors] = useState({});


    const ClearState = () => {
        setErrors({});
        setUserName("");
        setPassword("");
    }

    const Submit = async () => {
        try {
            await schema.validate({ userName, password }, { abortEarly: false });

            const loginData = {
                UserName: userName,
                Password: password
            };
            var response = await dispatch(LoginTheSystem(loginData)).unwrap();
            if (response.success) {
                const payload = jwtDecode(response.message)
                const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                const userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                ClearState();

                if (role === "User") {
                    navigation.navigate("ForgotPassword");
                    AsyncStorage.setItem("UserId", userId);
                }
            }
            setErrors({})
        }
        catch (error) {
            const errObj = {};
            if (error.inner) {
                error.inner.forEach((e) => {
                    errObj[e.path] = e.message;
                });
                setErrors(errObj);
            } else {
                setErrors({ general: error.message || "Bir hata oluştu" });
            }
        }
    }

    const CloseLoginMistake = () => {
        dispatch(SetLoginMistakeAlert(false));
    }

    return (

        <View style={[styles.loginContainer, { paddingBottom: insets.bottom }]}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Bi Etkinlik</Text>
            </View>

            <View style={styles.viewInput}>
                <Text style={{ fontWeight: '500', margin: 5, color: COLORS.text }}>Kullanıcı Adı</Text>
                <View style={styles.inputContainer}>
                    <TextInput
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
            <View style={styles.viewInput}>
                <Text style={{ fontWeight: '500', margin: 5, color: COLORS.text }}>Şifre</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={!passwordShow}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />

                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => setPasswordShow(prevState => !prevState)}
                    >
                        <Icon name={passwordShow ? 'eye-slash' : 'eye'} size={20} color={COLORS.textLight} />
                    </TouchableOpacity>
                </View>

                <HelperText type="error" visible={Boolean(errors.password)}>
                    {errors.password}
                </HelperText>
            </View>
            <View style={{ margin: 10 }}>
                <Pressable
                    style={styles.loginButton}
                    onPress={Submit}
                >
                    <Text style={styles.loginButtonText}>
                        Giriş Yap
                    </Text>
                </Pressable>
            </View>
            <View>
                <Button
                    textColor='grey'
                    onPress={() => navigation.navigate("ForgotPassword")}
                >
                    <Text>Şifreni mi unuttun ?</Text>
                </Button>
            </View>
            <View>
                <Button
                    textColor='grey'
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text> Hesabın yok mu ? <Text style={{ color: COLORS.text }}>Kaydol</Text></Text>

                </Button>
            </View>



            {/* Login Mistake */}
            <View>
                <MyToast
                    type={"error"}
                    visible={loginMistakeAlert}
                    detail={tAlert(loginResponse)}
                    closer={CloseLoginMistake}
                />
            </View>

            {/* Login Loading */}
            <Loading status={loginLoading} />

        </View >


    )
}

export default Login

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background
    },
    title: {
        marginBottom: 50
    },
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: COLORS.text
    },
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
    loginButton: {
        marginTop: 20,
        backgroundColor: COLORS.primary,
        width: 250,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
    loginButtonText: {

        color: 'whitesmoke',
        fontWeight: '400',
        color: COLORS.white
    },
    bottomButtonText: {
        color: 'grey',
    },



})