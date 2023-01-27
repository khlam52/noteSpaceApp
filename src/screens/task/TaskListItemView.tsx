import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ArrowRightIcon, TickIcon, UnTickIcon } from '../../assets/images';
import AppPressable from '../../components/AppPressable';
import AppSquircleButtonView from '../../components/AppSquircleButtonView';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from '../../styles';
import { sw } from '../../styles/Mixins';
import TaskHelper from '../../util/TaskHelper';
import { TaskItem } from './TaskModel';

interface TaskItemProps {
  item: TaskItem;
  onPressItem: (item: TaskItem) => void;
}

export const RenderTaskListItem: React.FC<TaskItemProps> = props => {
  const { item, onPressItem } = props;
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const onPress_ = () => {
    onPressItem(item);
  };

  const onTickIconPress = () => {
    TaskHelper.editTask(
      item.taskName,
      item.taskContent ?? '',
      !item.isCompleted,
      item.uuid,
    );
  };

  return (
    <View>
      <AppSquircleButtonView style={styles.container} fillColor={'#424450'}>
        <AppPressable style={styles.itemView} onPress={onPress_}>
          <View style={styles.itemLeftView}>
            <AppPressable onPress={onTickIconPress}>
              {item.isCompleted ? (
                <TickIcon width={sw(25)} height={sw(25)} />
              ) : (
                <UnTickIcon width={sw(25)} height={sw(25)} />
              )}
            </AppPressable>

            <Text style={styles.taskName}>{item?.taskName}</Text>
          </View>

          <ArrowRightIcon />
        </AppPressable>
      </AppSquircleButtonView>
    </View>
  );
};

const getStyle = (theme: any) => {
  return StyleSheet.create({
    container: {
      borderRadius: sw(12),
      marginBottom: sw(12),
    },
    itemView: {
      padding: sw(12),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemLeftView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    taskName: {
      ...Typography.ts(theme.fonts.weight.bold, sw(16)),
      color: '#FFF',
      paddingLeft: sw(8),
    },
  });
};
