import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image as RNImage,
  Button,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import React, { useEffect, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { COLORS } from '../constants/colors';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { createEventSchema } from '../schemas/CreateEventSchema';
import { updateEventSchema } from '../schemas/UpdateEventSchema';
import {
  CreateEvent,
  SetCreateAndEditM_AlertFalse,
  SetCreateAndEditS_AlertFalse,
  UpdateEvent,
} from '../redux/slices/eventSlice';
import { appStyles } from '../constants/styles';
import { citiesTwo } from '../data/MyData';
import { SetCategories } from '../redux/slices/discoverySlice';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CreateAndEdit = () => {
  const { t: tButton } = useTranslation('button');
  const { t: tInput } = useTranslation('input');
  const { t: tValidation } = useTranslation('validation');
  const { t: tCategory } = useTranslation('category');
  const { t: tAlert } = useTranslation('alert');

  const createSchema = createEventSchema(tValidation);
  const updateSchema = updateEventSchema(tValidation);
  const { allCategory, cetegoryFilterSkeletonLoaing } = useSelector((store) => store.category);
  const {
    createAndEditS_Alert,
    createAndEditM_Alert,
    createAndEditResponse,
    updateEventProp,
    isUpdateMode,
  } = useSelector((store) => store.event);

  //UserId Async Storage dan Cekme
  useEffect(() => {
    const loadUserId = async () => {
      const id = await AsyncStorage.getItem('UserId');
      if (id) setUserId(id);
    };
    loadUserId();
  }, []);

  //Data States
  const [UserId, setUserId] = useState(null);
  const [image, setImage] = useState(null);
  const [eventName, setEventName] = useState('');
  const [eventId, setEventId] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { latitude, longitude } = useSelector((store) => store.event);

  const [updating, setUpdating] = useState(false);
  const [updatingImageId, setUpdatingImageId] = useState('');
  const [errors, setErrors] = useState({});
  const [imgError, setImgError] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedCategorieNames, setSelectedCategorieNames] = useState('');

  //Modal State
  const [openCityModal, setOpenCityModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openStartDateModal, setOpenStartDateModal] = useState(false);
  const [openEndDateModal, setOpenEndDateModal] = useState(false);

  //Upload Event Image
  const UploadImage = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        alert('Sadece resim dosyası yükleyebilirsin.');
        return;
      }

      setImage(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  //Remove Event Image
  const RemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };
  //Selectors
  const citySelector = (value) => {
    setSelectedCity('');
    setSelectedCity(value);
  };
  const categorySelector = (id, name) => {
    setSelectedCategorieNames('');
    setSelectedCategories([]);
    setSelectedCategorieNames(name);
    setSelectedCategories([id]);
  };

  const ClearAll = () => {
    setEventName('');
    setDescription('');
    setSelectedCity('');
    setSelectedCategories([]);
    setStartDate(null);
    setEndDate(null);
    setImage(null);
    setPreviewUrl(null);
    setUpdating(false);
    dispatch(SetGaveUpUpdating(1));
    setErrors({});
  };

  //Islem Basarili Ise Herseyi Sil
  useEffect(() => {
    if (createAndEditS_Alert) {
      ClearAll();
    }
  }, [createAndEditS_Alert]);

  //#region Alert Closers
  const CloserToastMistake = () => {
    dispatch(SetCreateAndEditM_AlertFalse());
  };
  const CloserToastSuccess = () => {
    dispatch(SetCreateAndEditS_AlertFalse());
  };
  //#endregion

  //#region CreateAndUpdate Schemas
  const Create = async () => {
    try {
      await createSchema.validate(
        {
          eventName,
          description,
          selectedCity,
          selectedCategories,
          startDate,
          endDate,
          image,
          latitude,
        },
        { abortEarly: false },
      );
      setErrors({});
      const data = new FormData();
      const dto = {
        Name: eventName,
        Description: description,
        StartDate: startDate.format('YYYY-MM-DDTHH:mm:ss'),
        EndDate: endDate.format('YYYY-MM-DDTHH:mm:ss'),
        City: selectedCity,
        Latitude: Number(latitude.toFixed(6)),
        Longitude: Number(longitude.toFixed(6)),
        AppUserId: UserId,
      };
      data.append('EventDto', JSON.stringify(dto));
      data.append('EventImage', image);
      data.append('EventCategories', JSON.stringify(selectedCategories));

      await dispatch(CreateEvent(data));
    } catch (error) {
      const errObj = {};
      error.inner.forEach((e) => {
        errObj[e.path] = e.message;
      });
      setErrors(errObj);
    }
  };
  const Update = async () => {
    try {
      await updateSchema.validate(
        {
          eventName,
          description,
          selectedCity,
          selectedCategories,
          startDate,
          endDate,
          latitude,
        },
        { abortEarly: false },
      );
      setErrors({});

      const data = {
        EventDto: {
          EventId: eventId,
          Name: eventName,
          Description: description,
          StartDate: dayjs(startDate).format('YYYY-MM-DDTHH:mm:ss'),
          EndDate: dayjs(endDate).format('YYYY-MM-DDTHH:mm:ss'),
          City: selectedCity,
          Latitude: Number(latitude.toFixed(6)),
          Longitude: Number(longitude.toFixed(6)),
        },
        AppUserId: UserId,
        EventCategories: selectedCategories,
      };

      console.log(data);
      await dispatch(UpdateEvent(data));
    } catch (error) {
      const errObj = {};
      error.inner.forEach((e) => {
        errObj[e.path] = e.message;
      });
      setErrors(errObj);
    }
  };
  //#endregion

  //#region Animasyon İşlemleri
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = ['picture', 'name', 'description', 'city', 'category', 'fromDate', 'toDate'];
  const animations = cards.reduce((acc, key) => {
    const position = useSharedValue(0);
    const opacity = useSharedValue(1);
    const scale = useSharedValue(1);

    const animation = useAnimatedStyle(() => ({
      transform: [{ translateX: position.value }, { scale: scale.value }],
      opacity: opacity.value,
    }));

    acc[key] = { position, opacity, scale, animation };
    return acc;
  }, {});

  const CARD_WIDTH = 170;
  const CARD_MARGIN = 30;
  const OFFSET = CARD_WIDTH + CARD_MARGIN * 2; // 220

  const Show = (key) => {
    animations[key].position.value = withSpring(0); // ortada
    animations[key].opacity.value = withTiming(1, { duration: 1000 });
    animations[key].scale.value = withTiming(1, { duration: 1000 });
  };
  const ToLeft = (key) => {
    animations[key].position.value = withSpring(-OFFSET); // sola kay
    animations[key].opacity.value = withTiming(0.5, { duration: 1000 });
    animations[key].scale.value = withTiming(0.7, { duration: 1000 });
  };
  const ToRight = (key) => {
    animations[key].position.value = withSpring(OFFSET); // sola kay
    animations[key].opacity.value = withTiming(0.5, { duration: 1000 });
    animations[key].scale.value = withTiming(0.7, { duration: 1000 });
  };

  const NextCard = () => {
    if (currentIndex < cards.length - 1) {
      const current = cards[currentIndex];
      const next = cards[currentIndex + 1];

      ToLeft(current);
      Show(next);

      setCurrentIndex(currentIndex + 1);
    }
  };
  const PreviousCard = () => {
    if (currentIndex > 0) {
      const current = cards[currentIndex];
      const prev = cards[currentIndex - 1];

      ToRight(current);
      Show(prev);

      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    setCurrentIndex(0);
    // ilk kart görünsün
    animations.picture.position.value = withSpring(0);
    animations.picture.opacity.value = withTiming(1, { duration: 1000 });
    animations.picture.scale.value = withTiming(1, { duration: 1000 });

    // diğer kartlar gizlensin
    for (let i = 1; i < cards.length; i++) {
      const key = cards[i];
      animations[key].position.value = withSpring(OFFSET);
      animations[key].opacity.value = withTiming(0.5, { duration: 1000 });
      animations[key].scale.value = withTiming(0.7, { duration: 1000 });
    }
  }, []);
  // #endregion

  return (
    <>
      <View style={styles.screenTitleView}>
        <Text style={styles.screenTitle}>Oluştur / Düzenle</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.animationView}>
          <Animated.View style={[styles.card, animations.picture.animation, { height: 214 }]}>
            {updating ? (
              <RNImage />
            ) : !image ? (
              <Button title="Upload"></Button>
            ) : (
              <View>
                <Text>resim</Text>
              </View>
            )}
          </Animated.View>
          {/* Name */}
          <Animated.View style={[styles.card, animations.name.animation, { height: 228 }]}>
            <View style={appStyles.flexColumn}>
              <Text style={styles.inputTitle}>Öncelikle etkinliğine eşsiz bir isim bulalım.</Text>

              <TextInput
                style={styles.textInput}
                value={eventName}
                onChangeText={(text) => setEventName(text)}
              />
            </View>
          </Animated.View>

          {/* Description */}
          <Animated.View style={[styles.card, animations.description.animation, { height: 242 }]}>
            <View style={appStyles.flexColumn}>
              <Text style={styles.inputTitle}>
                Etkinliğini birkaç cümleyle anlat, katılanlar neyle karşılaşacak?
              </Text>
              <TextInput
                style={[styles.textInput, { height: '50%' }]}
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
            </View>
          </Animated.View>

          {/* City */}
          <Animated.View style={[styles.card, animations.city.animation, { height: 256 }]}>
            <View style={appStyles.flexColumn}>
              <Text style={styles.inputTitle}>
                Etkinliğin hangi şehirde gerçekleşeceğini belirt.
              </Text>
              <TouchableOpacity style={styles.selectBox} onPress={() => setOpenCityModal(true)}>
                <Text style={{ textAlign: 'center' }}>
                  {selectedCity.length > 0 ? selectedCity : 'Seçiniz...'}
                </Text>
              </TouchableOpacity>

              <Modal visible={openCityModal} transparent animationType="slide">
                <TouchableWithoutFeedback onPress={() => setOpenCityModal(false)}>
                  <View style={styles.modalBackground}>
                    <View style={styles.modalBox}>
                      <FlatList
                        data={citiesTwo}
                        keyExtractor={(item) => item.value}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.options}
                            onPress={() => citySelector(item.value)}
                          >
                            <Text style={{ flex: 1 }}>{item.label}</Text>
                            <Text>{selectedCity.includes(item.value) ? '✅' : '⬜'}</Text>
                          </TouchableOpacity>
                        )}
                      />
                      <TouchableOpacity onPress={() => setOpenCityModal(false)}>
                        <Text style={styles.selectBoxButton}>{tButton('ok')}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>
          </Animated.View>

          {/* Category */}
          <Animated.View style={[styles.card, animations.category.animation, { height: 270 }]}>
            <View style={appStyles.flexColumn}>
              <Text style={styles.inputTitle}>
                Etkinliğinin kategorisini seç, insanlar kolayca bulabilsin.
              </Text>
              <TouchableOpacity style={styles.selectBox} onPress={() => setOpenCategoryModal(true)}>
                <Text style={{ textAlign: 'center' }}>
                  {selectedCategorieNames.length > 0 ? selectedCategorieNames : 'Seçiniz...'}
                </Text>
              </TouchableOpacity>

              <Modal visible={openCategoryModal} transparent animationType="slide">
                <TouchableWithoutFeedback onPress={() => setOpenCategoryModal(false)}>
                  <View style={styles.modalBackground}>
                    <View style={styles.modalBox}>
                      <FlatList
                        data={allCategory}
                        keyExtractor={(item) => item.categoryId}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.options}
                            onPress={() => categorySelector(item.categoryId, item.categoryName)}
                          >
                            <Text style={{ flex: 1 }}>{tCategory(item.categoryName)}</Text>
                            <Text>
                              {selectedCategories.includes(item.categoryId) ? '✅' : '⬜'}
                            </Text>
                          </TouchableOpacity>
                        )}
                      />
                      <TouchableOpacity onPress={() => setOpenCategoryModal(false)}>
                        <Text style={styles.selectBoxButton}>{tButton('ok')}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>
          </Animated.View>

          {/*From Date*/}
          <Animated.View style={[styles.card, animations.fromDate.animation, { height: 285 }]}>
            <View style={appStyles.flexColumn}>
              <Text style={styles.inputTitle}>Etkinliğin ne zaman başlayacak ?</Text>

              <TouchableOpacity
                style={styles.selectBox}
                onPress={() => setOpenStartDateModal(true)}
              >
                <Text style={{ textAlign: 'center' }}>
                  {startDate != null
                    ? startDate.toLocaleDateString('tr-TR')
                    : 'Başlangıç Tarihi Seçiniz'}
                </Text>
              </TouchableOpacity>
            </View>
            <DateTimePickerModal
              isVisible={openStartDateModal}
              mode="date"
              locale="tr"
              minimumDate={new Date()}
              onConfirm={(date) => {
                setOpenStartDateModal(false);
                setStartDate(date);
              }}
              onCancel={() => setOpenStartDateModal(false)}
            />
          </Animated.View>

          {/*To Date*/}
          <Animated.View style={[styles.card, animations.toDate.animation, { height: 300 }]}>
            <View style={appStyles.flexColumn}>
              <Text style={styles.inputTitle}>Peki ne zaman sona erecek ?</Text>

              <TouchableOpacity style={styles.selectBox} onPress={() => setOpenEndDateModal(true)}>
                <Text style={{ textAlign: 'center' }}>
                  {endDate != null ? endDate.toLocaleDateString('tr-TR') : 'Bitiş Tarihi Seçiniz'}
                </Text>
              </TouchableOpacity>
            </View>
            <DateTimePickerModal
              isVisible={openEndDateModal}
              mode="date"
              locale="tr"
              minimumDate={new Date()}
              onConfirm={(date) => {
                setOpenEndDateModal(false);
                setEndDate(date);
              }}
              onCancel={() => setOpenEndDateModal(false)}
            />
          </Animated.View>
        </View>
        <View style={[appStyles.row, { marginTop: 160 }]}>
          <Pressable style={styles.button} onPress={PreviousCard}>
            <Text style={styles.buttonText}>Önceki</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={NextCard}>
            <Text style={styles.buttonText}>Sonraki</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default CreateAndEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  animationView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 300,
    width: 250,
    backgroundColor: COLORS.card,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.border,
    margin: 10,
    position: 'absolute',
  },
  button: {
    marginTop: 10,
    backgroundColor: COLORS.background,
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'whitesmoke',
    fontWeight: '400',
    color: COLORS.text,
  },
  inputTitle: {
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
    fontSize: 16,
    padding: 15,
  },
  textInput: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
    height: 50,
    width: '85%',
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.text,
    textAlign: 'center',
  },
  selectBox: {
    width: '85%',
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalBox: {
    margin: 20,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    maxHeight: 300, // 👈 açılır listenin boyunu sınırladık
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectBoxButton: {
    marginTop: 15,
    padding: 5,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    color: COLORS.text,
  },
  screenTitle: {
    fontWeight: 'bold',
    fontSize: 27,
    textAlign: 'center',
    paddingTop: 50,
  },
});
