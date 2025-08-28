import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, HelperText, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { schema } from '../schemas/LoginSchema'
import { useDispatch, useSelector } from 'react-redux';
import { LoginTheSystem, SetLoginToastMistake } from '../redux/slices/authSlice';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import MyToast from '../components/Elements/MyToast';
const Login = () => {
    const { t: tAlert } = useTranslation("alert");

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { loginResponse, loginToastMistake } = useSelector(store => store.auth)

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
        dispatch(SetLoginToastMistake(false));
    }

    return (
        <View style={styles.loginContainer}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Bi Etkinlik</Text>
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
                    label="Şifre"
                    mode='outlined'
                    activeOutlineColor='black'
                    secureTextEntry={!passwordShow}
                    right={<TextInput.Icon
                        icon={passwordShow ? "eye" : "eye-off"}
                        onPress={() => setPasswordShow(!passwordShow)} />}
                    value={password}
                    onChangeText={text => setPassword(text)}

                />
                <HelperText type='error'
                    visible={Boolean(errors.password)}>
                    {errors.password}
                </HelperText>
            </View>
            <View>
                <Button
                    style={styles.loginButton}
                    textColor='white'
                    mode='contained'
                    buttonColor='rgba(156, 21, 134, 1)'
                    onPress={Submit}
                >
                    Giriş Yap
                </Button>
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

            {/* Login Mistake */}
            <View>
                <MyToast
                    type={"error"}
                    visible={loginToastMistake}
                    detail={tAlert(loginResponse)}
                    closer={CloseLoginMistake}
                />
            </View>
        </View>

    )
}

export default Login

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        marginBottom: 50
    },
    titleText: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    input: {
        height: 50,
        width: 250,
        margin: 15
    },
    loginButton: {
        marginTop: 20
    },
    forgotPassword: {
        color: 'blue'
    }

})