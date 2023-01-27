import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { AddNoteIcon, AddTaskIcon, PlusIcon } from '../../assets/images';
import AppFocusAwareStatusBar from '../../components/AppFocusAwareStatusBar';
import AppPressable from '../../components/AppPressable';
import AppSquircleButtonView from '../../components/AppSquircleButtonView';
import { AppConfig } from '../../config';
import colors from '../../constants/colors';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from '../../styles';
import { sw } from '../../styles/Mixins';
import { ts } from '../../styles/Typography';

interface CreateItemProps {
  title: string;
  icon: React.FC<SvgProps> | any;
  callback: () => void;
}

const RenderCreateItemView: React.FC<CreateItemProps> = props => {
  const { title, icon, callback } = props;
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();

  const styles = getStyle(theme);
  return (
    <AppSquircleButtonView style={styles.itemView} fillColor={'#29282D'}>
      {icon}
      <View>
        <AppPressable onPress={callback}>
          <View style={styles.btnView}>
            <PlusIcon fill={'#FFF'} width={sw(25)} height={sw(25)} />
            <Text style={styles.btnTitleText}>{title}</Text>
          </View>
        </AppPressable>
      </View>
    </AppSquircleButtonView>
  );
};

export const HomeScreen = ({ navigation }: any) => {
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const goTaskCreateScreen = () => {
    // navigation.navigate(Route.TASK_CREATE_SCREEN);
  };

  const goNoteCreateScreen = () => {
    // navigation.navigate(Route.CREATE_AND_EDIT_NOTE_SCREEN, {
    //   isCreateNote: true,
    // });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppFocusAwareStatusBar barStyle={'light-content'} />
      <View style={styles.mainContainer}>
        <Text style={styles.appNameText}>Note Space</Text>
        <Text style={styles.versionText}>
          {`v ${
            Platform.OS === 'ios'
              ? AppConfig.IOS_APP_VERSION
              : AppConfig.AOS_APP_VERSION
          }`}
        </Text>
        <RenderCreateItemView
          title={'Create task'}
          icon={<AddTaskIcon />}
          callback={goTaskCreateScreen}
        />
        <RenderCreateItemView
          title={'Create Note'}
          icon={<AddNoteIcon />}
          callback={goNoteCreateScreen}
        />
      </View>
    </SafeAreaView>
  );
};

const getStyle = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1B191E',
      alignItems: 'center',
    },
    mainContainer: {
      flex: 1,
      paddingTop: sw(60),
    },
    appNameText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(36)),
      color: '#FFF',
      marginBottom: sw(12),
      textAlign: 'center',
    },
    versionText: {
      ...ts(theme.fonts.weight.regular, sw(18)),
      color: '#B6B6B6',
      marginBottom: sw(60),
      textAlign: 'center',
    },
    itemView: {
      width: sw(332),
      alignItems: 'center',
      borderRadius: sw(12),
      paddingTop: sw(26),
      marginVertical: Platform.OS === 'ios' ? sw(24) : sw(20),
      shadowOpacity: 0.5,
      shadowRadius: 30,
      shadowColor: '#000',
      elevation: 10,
    },
    btnView: {
      width: sw(332),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#424450',
      borderRadius: sw(10),
      justifyContent: 'center',
      paddingVertical: sw(8),
      marginTop: sw(18),
    },
    btnTitleText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(20)),
      color: '#FFF',
      paddingLeft: sw(18),
    },
  });
};
