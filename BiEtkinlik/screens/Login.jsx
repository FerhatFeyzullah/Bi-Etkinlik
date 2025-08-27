import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Login = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShow, setPasswordShow] = useState(false);

    const navigation = useNavigation();

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
            </View>
            <View style={styles.input}>
                <TextInput
                    label="Şifre"
                    mode='outlined'
                    secureTextEntry={!passwordShow}
                    right={<TextInput.Icon
                        icon={passwordShow ? "eye" : "eye-off"}
                        onPress={() => setPasswordShow(!passwordShow)} />}
                    value={password}
                    onChangeText={text => setPassword(text)}

                />
            </View>
            <View>
                <Button
                    textColor='white'
                    mode='contained'
                    buttonColor='green'
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
        marginBottom: 16,
    },
    forgotPassword: {
        color: 'blue'
    }

})