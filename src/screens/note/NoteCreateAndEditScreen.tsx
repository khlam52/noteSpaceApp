import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BackIcon, FontIcon } from '../../assets/images';
import AppFocusAwareStatusBar from '../../components/AppFocusAwareStatusBar';
import AppPressable from '../../components/AppPressable';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Route } from '../../navigation/Route';
import { ScreenProp } from '../../navigation/type';
import { Typography } from '../../styles';
import { sw } from '../../styles/Mixins';
import CommonUtils from '../../util/CommonUtils';
import { BOTTOM_BTN_LIST } from '../../util/NoteHelper';

type Props = ScreenProp<Route.TASK_CREATE_AND_EDIT_SCREEN>;

export const NoteCreateAndEditScreen: React.FC<Props> = props => {
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const { navigation } = props;

  const [title, setTitle] = useState<string>();
  const [date, setDate] = useState<Date>(new Date());

  const [contentLayoutList, setContentLayoutList] = useState();

  const onBackIconPress = () => {
    navigation.goBack();
  };

  // Note Handle
  const onChangeTitle = (val: string | undefined) => {
    setTitle(val);
  };
  ////

  const renderBottomView = () => {
    return (
      <View style={styles.bottomBtnView}>
        {BOTTOM_BTN_LIST &&
          BOTTOM_BTN_LIST.map((item, index: number) => {
            return (
              <AppPressable onPress={item.onPress} key={index}>
                <View style={styles.btnView}>{item.icon}</View>
              </AppPressable>
            );
          })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppFocusAwareStatusBar barStyle={'light-content'} />
      <View style={styles.header}>
        <AppPressable onPress={onBackIconPress}>
          <BackIcon />
        </AppPressable>
        <View style={styles.headerRightcontainer}>
          <FontIcon />
          <Text style={styles.saveText}>Save</Text>
        </View>
      </View>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        scrollEnabled={true}
        enableOnAndroid={true}
        style={styles.inputContainer}
      >
        <TextInput
          value={title}
          onChangeText={onChangeTitle}
          placeholder={'Note Title'}
          style={styles.inputTitleText}
          placeholderTextColor={'#B6B6B6'}
        />
        <Text style={styles.dateText}>{CommonUtils.getMomentDate(date)}</Text>
      </KeyboardAwareScrollView>
      {renderBottomView()}
    </SafeAreaView>
  );
};

const getStyle = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1B191E',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: sw(24),
      justifyContent: 'space-between',
    },
    headerRightcontainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputContainer: {
      flex: 1,
      paddingHorizontal: sw(24),
      paddingTop: sw(24),
      marginTop: sw(12),
    },
    saveText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(20)),
      color: '#FFEAA1',
      paddingLeft: sw(12),
    },
    inputTitleText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(28)),
      color: '#FFF',
    },
    dateText: {
      ...Typography.ts(theme.fonts.weight.regular, sw(16)),
      color: '#B6B6B6',
      marginTop: sw(24),
    },
    bottomBtnView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: sw(32),
      marginBottom: sw(45),
      marginTop: sw(18),
    },
    btnView: {
      borderRadius: sw(100),
      backgroundColor: '#000',
      width: sw(60),
      height: sw(60),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
