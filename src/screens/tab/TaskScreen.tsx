import React, { useCallback, useEffect, useState } from 'react';
import {
  LayoutAnimation,
  ListRenderItemInfo,
  SafeAreaView,
  SectionList,
  SectionListData,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CloseIcon, DeleteIcon } from '../../assets/images';
import AppFocusAwareStatusBar from '../../components/AppFocusAwareStatusBar';
import AppPressable from '../../components/AppPressable';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Route } from '../../navigation/Route';
import StorageService from '../../services/StorageService';
import { Typography } from '../../styles';
import { sw } from '../../styles/Mixins';
import TaskHelper from '../../util/TaskHelper';
import { RenderTaskListItem } from '../task/TaskListItemView';
import { TaskItem, TaskSection } from '../task/TaskModel';

export const TaskScreen = ({ navigation }: any) => {
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const [taskSectionList, setTaskSectionList] = useState<TaskSection[]>([]);
  const [isShowDeleteTaskView, setIsShowDeleteTaskView] =
    useState<boolean>(false);

  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

  useEffect(() => {
    getTaskList();
  }, [taskSectionList]);

  // First Task
  const getTaskList = useCallback(async () => {
    let list = await StorageService.getTaskList();
    setTaskSectionList(TaskHelper.getTaskSectionList(list));
  }, [setTaskSectionList, taskSectionList]);

  const onDeleteTaskPress = () => {
    setIsShowDeleteTaskView(previous => !previous);
  };

  const onPressTaskItem = (taskItem: TaskItem) => {
    navigation.navigate(Route.TASK_CREATE_AND_EDIT_SCREEN, {
      taskItem: taskItem,
      isCreateTask: false,
      headerTitle: 'Task',
      buttonText: 'Save',
    });
  };

  const renderSectionHeader = ({
    section,
  }: {
    section: SectionListData<TaskItem, TaskSection>;
  }) => {
    if (section.title === null) {
      return null;
    }

    return (
      <View style={styles.sectionHeaderView}>
        <Text
          style={styles.groupNameText}
        >{`${section.title} - ${section.data.length}`}</Text>
        {!section.isCompletedList && taskSectionList.length > 0 && (
          <AppPressable onPress={onDeleteTaskPress} disableDelayPress={true}>
            {isShowDeleteTaskView ? (
              <CloseIcon width={sw(16)} height={sw(16)} />
            ) : (
              <DeleteIcon />
            )}
          </AppPressable>
        )}
      </View>
    );
  };

  const renderItem = ({ item }: ListRenderItemInfo<TaskItem>) => {
    return (
      <RenderTaskListItem
        item={item}
        onPressItem={onPressTaskItem}
        isShowDeleteTaskView={isShowDeleteTaskView}
      />
    );
  };

  const renderListFooter = () => {
    return (
      <View
        style={{
          paddingBottom: sw(100),
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppFocusAwareStatusBar barStyle={'light-content'} />
      <View style={styles.mainContainer}>
        <Text style={styles.appNameText}>Tasks</Text>
        <SectionList
          sections={taskSectionList}
          keyExtractor={(item, index) => 'taskitem' + index}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          ListFooterComponent={renderListFooter}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
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
    },
    mainContainer: {
      flex: 1,
      paddingTop: sw(24),
      paddingHorizontal: sw(24),
    },
    appNameText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(36)),
      color: '#FFF',
      marginBottom: sw(12),
      textAlign: 'center',
    },
    groupNameText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(20)),
      color: '#FFF',
      marginBottom: sw(24),
      paddingTop: sw(24),
    },
    sectionHeaderView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
};
