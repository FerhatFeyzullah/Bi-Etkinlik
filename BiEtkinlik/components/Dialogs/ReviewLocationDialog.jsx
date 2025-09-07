import { StyleSheet, Text, View } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ReviewLocation from '../Map/ReviewLocation';
import { appStyles } from '../../constants/styles';
import React, { useEffect } from 'react';
import {
  SetIsMapReviewed,
  SetReviewLatitude,
  SetReviewLongitude,
} from '../../redux/slices/mapSlice';
import { COLORS } from '../../constants/colors';

const ReviewLocationDialog = () => {
  const { t: tButton } = useTranslation('button');

  const dispatch = useDispatch();
  const { isMapReviewed } = useSelector((store) => store.map);

  const CloseDialog = () => {
    dispatch(SetIsMapReviewed(false));
    dispatch(SetReviewLatitude(''));
    dispatch(SetReviewLongitude(''));
  };
  return (
    <Portal>
      <Dialog visible={isMapReviewed} onDismiss={CloseDialog}>
        <Dialog.Title style={{ textAlign: 'center' }}>Etkinlik Konumu</Dialog.Title>
        <Dialog.Content style={{ height: 'auto' }}>
          <>
            <Text style={{ textAlign: 'center' }}>
              Etkinliğin konumunu görüntülemek ve yol tarifi almak için, uygulamamız sizi
              telefonunuzdaki harita uygulamasına yönlendirecektir
            </Text>
            <ReviewLocation />
          </>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default ReviewLocationDialog;

const styles = StyleSheet.create({
  dialogButtons: {
    borderWidth: 2,
    borderColor: COLORS.border,
  },
});
