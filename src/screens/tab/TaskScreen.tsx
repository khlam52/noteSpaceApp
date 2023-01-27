import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  SectionList,
  SectionListData,
  SectionListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppFocusAwareStatusBar from '../../components/AppFocusAwareStatusBar';
import { useAppTheme } from '../../hooks/useAppTheme';
import StorageService from '../../services/StorageService';
import { Typography } from '../../styles';
import { sw } from '../../styles/Mixins';
import TaskHelper from '../../util/TaskHelper';
import { RenderTaskListItem } from '../task/TaskListItemView';
import { TaskItem, TaskSection } from '../task/TaskModel';

export const TaskScreen = ({ navigation }: any) => {
  const dummyTaskList = [
    {
      taskName: 'AAA',
      isCompleted: true,
      date: new Date(),
      taskContent: 'sdfsdf',
    },
    {
      taskName: 'BBB',
      isCompleted: false,
      date: new Date(),
      taskContent: null,
    },
    {
      taskName: 'DDD',
      isCompleted: true,
      date: new Date(),
      taskContent: '123',
    },
    {
      taskName: 'CCC',
      isCompleted: false,
      date: new Date(),
      taskContent: null,
    },
  ];
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const [taskSectionList, setTaskSectionList] = useState<TaskSection[]>([]);

  useEffect(() => {
    // StorageService.setTaskList(dummyTaskList);
    getTaskList();
  });

  const getTaskList = useCallback(async () => {
    let list = await StorageService.getTaskList();
    setTaskSectionList(TaskHelper.getTaskSectionList(list));
  }, []);

  const onPressTaskItem = useCallback((taskItem: TaskItem) => {
    console.log('item:', taskItem);
  }, []);

  const renderSectionHeader = useCallback(
    ({ section }: { section: SectionListData<TaskItem, TaskSection> }) => {
      if (section.title === null) {
        return null;
      }

      return (
        <View>
          <Text
            style={styles.groupNameText}
          >{`${section.title} - ${section.data.length}`}</Text>
        </View>
      );
    },
    [],
  );

  const renderItem = useCallback<SectionListRenderItem<TaskItem, TaskSection>>(
    ({ item }) => {
      return <RenderTaskListItem item={item} onPressItem={onPressTaskItem} />;
    },
    [],
  );

  const renderListFooter = useCallback(() => {
    return (
      <View
        style={{
          paddingBottom: sw(100),
        }}
      />
    );
  }, []);

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
  });
};
