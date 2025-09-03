import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterEvent, SetEventRegisterDialog } from '../../redux/slices/eventRegisterSlice';
import { MarkEventAsRegistered } from '../../redux/slices/discoverySlice';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventRegisterDialog = () => {
  const { t: tButton } = useTranslation('button');
  const { t: tText } = useTranslation('text');
  const dispatch = useDispatch();

  const [UserId, setUserId] = useState(null);

  useEffect(() => {
    const loadUserId = async () => {
      const id = await AsyncStorage.getItem('UserId');
      if (id) setUserId(id);
    };
    loadUserId();
  }, []);

  const { eventRegisterDialog, registeredEvent } = useSelector((store) => store.eventRegister);

  const RegisterThisEvent = async () => {
    const data = {
      AppUserId: Number(UserId),
      EventId: registeredEvent.eventId,
    };
    var result = await dispatch(RegisterEvent(data)).unwrap();
    if (result) {
      dispatch(MarkEventAsRegistered(registeredEvent.eventId));
    }
    dispatch(SetEventRegisterDialog(false));
  };
  const CloseDialog = () => {
    dispatch(SetEventRegisterDialog(false));
  };

  return (
    <Portal>
      <Dialog visible={eventRegisterDialog} onDismiss={CloseDialog}>
        <Dialog.Title>{tText('registerEventTitle')}</Dialog.Title>
        <Dialog.Content>
          <Text>
            "{registeredEvent?.name}" {tText('registerEventInfo')}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={RegisterThisEvent}>{tButton('yes')}</Button>
          <Button onPress={CloseDialog}>{tButton('no')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default EventRegisterDialog;

const styles = StyleSheet.create({});
