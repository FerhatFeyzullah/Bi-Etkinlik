import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import qs from 'qs';

const instance = axios.create({
    baseURL: "http://192.168.1.103:5112/api/", // 📌 Android Emulator için localhost
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

// Her istekten önce token ekle
instance.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
