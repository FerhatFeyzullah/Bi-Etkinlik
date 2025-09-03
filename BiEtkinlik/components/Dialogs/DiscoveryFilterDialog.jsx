import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  SetCategories,
  SetCities,
  SetEndDate,
  SetFilterDialog,
  SetFilterMode,
  SetStartDate,
} from '../../redux/slices/discoverySlice';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { citiesTwo } from '../../data/MyData';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import { appStyles } from '../../constants/styles';
import { COLORS } from '../../constants/colors';

const DiscoveryFilterDialog = () => {
  const { t: tText } = useTranslation('text');
  const { t: tButton } = useTranslation('button');
  const { t: tCategory } = useTranslation('category');
  const { t: tInput } = useTranslation('input');
  const dispatch = useDispatch();

  const { filterDialog } = useSelector((store) => store.discovery);
  const { allCategory } = useSelector((store) => store.category);

  //City
  const [selectedCities, setSelectedCities] = useState([]);
  const [openCityModal, setOpenCityModal] = useState(false);
  //Category
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategorieNames, setSelectedCategorieNames] = useState([]);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  //Start Date
  const [startDate, setStartDate] = useState(null);
  const [formattedStartDate, setFormattedStartDate] = useState(null);
  const [openStartDateModal, setOpenStartDateModal] = useState(false);

  //End Date
  const [endDate, setEndDate] = useState(null);
  const [formattedEndDate, setFormattedEndDate] = useState(null);
  const [openEndDateModal, setOpenEndDateModal] = useState(false);

  useEffect(() => {
    if (startDate != null) {
      setFormattedStartDate(dayjs(startDate).format('YYYY-MM-DD'));
    } else {
      setFormattedStartDate(null);
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate != null) {
      setFormattedEndDate(dayjs(endDate).format('YYYY-MM-DD'));
    } else {
      setFormattedEndDate(null);
    }
  }, [endDate]);

  const citySelector = (value) => {
    if (selectedCities.includes(value)) {
      setSelectedCities(selectedCities.filter((item) => item !== value));
    } else {
      setSelectedCities([...selectedCities, value]);
    }
  };
  const categoryIdSelector = (value) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };
  const categoryNameSelector = (value) => {
    if (selectedCategorieNames.includes(value)) {
      setSelectedCategorieNames(selectedCategorieNames.filter((item) => item !== value));
    } else {
      setSelectedCategorieNames([...selectedCategorieNames, value]);
    }
  };

  const ClearAllFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedCategories([]);
    setSelectedCategorieNames([]);
    setSelectedCities([]);
    dispatch(SetCategories([]));
    dispatch(SetCities([]));
    dispatch(SetStartDate(null));
    dispatch(SetEndDate(null));
    dispatch(SetFilterMode(false));
    dispatch(SetFilterDialog(false));
  };

  const OpenFilter = () => {
    dispatch(SetCities(selectedCities));
    dispatch(SetCategories(selectedCategories));
    dispatch(SetStartDate(formattedStartDate));
    dispatch(SetEndDate(formattedEndDate));
    dispatch(SetFilterMode(true));
    dispatch(SetFilterDialog(false));
  };

  const CloseFilterDialog = () => {
    dispatch(SetFilterDialog(false));
  };
  return (
    <Portal>
      <Dialog
        visible={filterDialog}
        onDismiss={CloseFilterDialog}
        style={{ backgroundColor: COLORS.background }}
      >
        <Dialog.Title>{tText('filterPanelTitle')}</Dialog.Title>
        <Dialog.Content>
          {/* City */}
          <View style={styles.filterView}>
            <Text style={styles.text}>{tInput('city')}</Text>

            <TouchableOpacity style={styles.selectBox} onPress={() => setOpenCityModal(true)}>
              <Text>{selectedCities.length > 0 ? selectedCities.join(', ') : 'Seçiniz...'}</Text>
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
                          style={styles.option}
                          onPress={() => citySelector(item.value)}
                        >
                          <Text style={{ flex: 1 }}>{item.label}</Text>
                          <Text>{selectedCities.includes(item.value) ? '✅' : '⬜'}</Text>
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

          {/* Category */}
          <View style={styles.filterView}>
            <Text style={styles.text}>{tInput('category')}</Text>

            <TouchableOpacity style={styles.selectBox} onPress={() => setOpenCategoryModal(true)}>
              <Text>
                {selectedCategorieNames.length > 0
                  ? tCategory(selectedCategorieNames.join(', '))
                  : 'Seçiniz...'}
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
                          style={styles.option}
                          onPress={() => {
                            categoryIdSelector(item.categoryId),
                              categoryNameSelector(item.categoryName);
                          }}
                        >
                          <Text style={{ flex: 1 }}>{tCategory(item.categoryName)}</Text>
                          <Text>{selectedCategories.includes(item.categoryId) ? '✅' : '⬜'}</Text>
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

          {/* StartDate */}
          <View style={styles.filterView}>
            <Text style={styles.text}>{tInput('fromDate')}</Text>

            <TouchableOpacity style={styles.selectBox} onPress={() => setOpenStartDateModal(true)}>
              <Text>
                {startDate != null ? startDate.toLocaleDateString('tr-TR') : 'Seçiniz...'}
              </Text>
            </TouchableOpacity>
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
          </View>

          {/* EndDate */}
          <View style={styles.filterView}>
            <Text style={styles.text}>{tInput('toDate')}</Text>

            <TouchableOpacity style={styles.selectBox} onPress={() => setOpenEndDateModal(true)}>
              <Text>{endDate != null ? endDate.toLocaleDateString('tr-TR') : 'Seçiniz...'}</Text>
            </TouchableOpacity>
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
          </View>

          {/* <Text>Şehirler</Text>

          <View style={{ borderWidth: 1, borderColor: '#000000ff' }}>
            <Picker
              selectedValue={selectedCities}
              onValueChange={(itemValue) => setSelectedCities(itemValue)}
              style={{ height: 60, width: '100%' }}
            >
              <Picker.Item label="Şehir Seçiniz" value="" enabled={false} />
              {citiesTwo.map((c) => (
                <Picker.Item key={c.label} label={c.label} value={c.value} />
              ))}
            </Picker>
          </View> */}
        </Dialog.Content>
        <Dialog.Actions style={appStyles.row}>
          <Button style={styles.dialogButtons} onPress={() => OpenFilter()}>
            {tButton('filterOn')}
          </Button>
          <Button style={styles.dialogButtons} onPress={ClearAllFilters}>
            {tButton('removeAllFilters')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DiscoveryFilterDialog;

const styles = StyleSheet.create({
  selectBox: {
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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dialogButtons: {
    borderWidth: 2,
    borderColor: COLORS.border,
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
  text: {
    color: COLORS.text,
  },
  filterView: {
    marginVertical: 10,
  },
});
