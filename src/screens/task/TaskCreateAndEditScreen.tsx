import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BackIcon, TickIcon, UnTickIcon } from '../../assets/images';
import AppFocusAwareStatusBar from '../../components/AppFocusAwareStatusBar';
import AppPressable from '../../components/AppPressable';
import AppSquircleButtonView from '../../components/AppSquircleButtonView';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Route } from '../../navigation/Route';
import { ScreenProp } from '../../navigation/type';
import { Typography } from '../../styles';
import { sw } from '../../styles/Mixins';
import CommonUtils from '../../util/CommonUtils';
import TaskHelper from '../../util/TaskHelper';

type Props = ScreenProp<Route.TASK_CREATE_AND_EDIT_SCREEN>;

export const TaskCreateAndEditScreen: React.FC<Props> = props => {
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const {
    navigation,
    route: {
      params: { taskItem, isCreateTask, headerTitle, buttonText },
    },
  } = props;

  const [title, setTitle] = useState<string>();
  const [date, setDate] = useState<Date>(new Date());
  const [content, setContent] = useState<string>();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    console.log('taskItem:', taskItem);
    if (!isCreateTask) {
      onEditTaskInitParams();
    }
  }, []);

  // First Task
  const onEditTaskInitParams = () => {
    if (taskItem) {
      setTitle(taskItem?.taskName);
      setDate(taskItem?.date);
      setContent(taskItem?.taskContent ?? '');
      setIsCompleted(taskItem?.isCompleted);
    }
  };

  const onBackIconPress = () => {
    navigation.goBack();
  };

  const onButtonPress = () => {
    if (isCreateTask) {
      TaskHelper.createTask(title ?? '', content ?? '');
    } else if (taskItem) {
      TaskHelper.editTask(
        title ?? '',
        content ?? '',
        isCompleted,
        taskItem.uuid,
      );
    }
    navigation.goBack();
  };

  // Task Handle
  const onChangeTitle = (val: string | undefined) => {
    setTitle(val);
  };

  const onChangeContent = (val: string | undefined) => {
    setContent(val);
  };

  const onCompletedPress = () => {
    setIsCompleted(previous => !previous);
  };
  ////

  return (
    <SafeAreaView style={styles.container}>
      <AppFocusAwareStatusBar barStyle={'light-content'} />
      <View style={styles.header}>
        <AppPressable style={styles.container} onPress={onBackIconPress}>
          <BackIcon />
        </AppPressable>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        <View style={styles.container} />
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
          placeholder={'Task Title'}
          style={styles.inputTitleText}
          placeholderTextColor={'#B6B6B6'}
        />
        <Text style={styles.dateText}>{CommonUtils.getMomentDate(date)}</Text>
        <View style={styles.contentView}>
          <TextInput
            value={content}
            onChangeText={onChangeContent}
            placeholder={'Add description'}
            style={styles.inputContentText}
            multiline={true}
            placeholderTextColor={'#B6B6B6'}
          />
        </View>
        {!isCreateTask && (
          <AppPressable onPress={onCompletedPress} disableDelayPress={true}>
            <View style={styles.completedView}>
              {isCompleted ? (
                <TickIcon width={sw(25)} height={sw(25)} />
              ) : (
                <UnTickIcon width={sw(25)} height={sw(25)} />
              )}

              <Text style={styles.completedText}>Completed</Text>
            </View>
          </AppPressable>
        )}

        <AppPressable
          onPress={onButtonPress}
          disabled={!title}
          hvDisabledStyle={!title}
        >
          <AppSquircleButtonView
            fillColor={'#424450'}
            style={styles.buttonView}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </AppSquircleButtonView>
        </AppPressable>
      </KeyboardAwareScrollView>
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
    },
    headerTitle: {
      ...Typography.ts(theme.fonts.weight.bold, sw(24)),
      color: '#FFF',
      textAlign: 'center',
      flex: 2,
    },
    inputContainer: {
      flex: 1,
      paddingHorizontal: sw(24),
      paddingTop: sw(24),
      marginTop: sw(12),
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
    inputContentText: {
      ...Typography.ts(theme.fonts.weight.light, sw(16)),
      color: '#B6B6B6',
      lineHeight: sw(30),
    },
    contentView: {
      borderBottomColor: '#FFF',
      borderTopColor: '#FFF',
      borderTopWidth: sw(0.5),
      borderBottomWidth: sw(0.5),
      //   paddingTop: sw(12),
      marginTop: sw(24),
      height: sw(230),
    },
    completedView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: sw(24),
    },
    completedText: {
      ...Typography.ts(theme.fonts.weight.light, sw(20)),
      color: '#FFEAA1',
      paddingLeft: sw(12),
    },
    buttonView: {
      flex: 1,
      marginHorizontal: sw(60),
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: sw(12),
      marginVertical: sw(48),
    },
    buttonText: {
      ...Typography.ts(theme.fonts.weight.light, sw(18)),
      color: '#FFEAA1',
    },
  });
};
