import 'react-native-get-random-values';
import uuid from 'react-native-uuid';
import ImagePicker from 'react-native-image-crop-picker';
import {
  NoteContent,
  NoteItem,
  NoteSelectItem,
  NoteTextContent,
} from '../screens/note/NoteModel';
import StorageService from '../services/StorageService';
import { sw } from '../styles/Mixins';
import _ from 'lodash';

const getNoteFlatListWithIndex = (
  noteList: NoteItem[],
  isOddIndex: boolean = true,
) => {
  let flatList: NoteItem[] = [];
  if (noteList) {
    if (isOddIndex) {
      flatList = noteList.filter(function (v, i) {
        return !(i % 2);
      });
    } else {
      flatList = noteList.filter(function (v, i) {
        return i % 2;
      });
    }
  }
  return flatList;
};

const createNote = async (title: string, content: NoteContent[]) => {
  let currentList = await StorageService.getNoteList();
  let newNoteList = currentList ? [...currentList] : [];
  let createNoteItem = {
    title: title,
    date: new Date(),
    content: content,
    uuid: uuid.v4(),
  };
  newNoteList.push(createNoteItem);
  StorageService.setNoteList(newNoteList);
};

const editNote = async (
  title: string,
  content: NoteContent[],
  uuid: string,
) => {
  let currentList = await StorageService.getNoteList();
  let newNoteList = currentList ? [...currentList] : [];
  newNoteList.forEach((item: NoteItem) => {
    if (item.uuid == uuid) {
      item.title = title;
      item.content = content;
      item.date = new Date();
    }
  });
  console.log('newNoteList:', newNoteList);
  StorageService.setNoteList(newNoteList);
};

const accessImagePickerFunc = (
  contentLayoutList: NoteContent[] | any,
  updateContentLayoutList: (updatedList: NoteContent[]) => void,
) => {
  ImagePicker.openPicker({
    width: 1000,
    height: 1000,
    cropping: true,
    freeStyleCropEnabled: true,
    multiple: false,
    includeBase64: true,
    mediaType: 'photo',
  }).then(images => {
    if (images) {
      console.log('contentLayoutList:', contentLayoutList);
      console.log('images:', images);
      let getNoteContentLayoutList = [
        ...contentLayoutList,
        {
          type: 'IMAGE',
          imgBase64: `data:${images.mime};base64,${images.data}`,
        },
      ];
      updateContentLayoutList(getNoteContentLayoutList);
    }
  });
};

const accessCameraPickerFunc = (
  contentLayoutList: NoteContent[] | any,
  updateContentLayoutList: (updatedList: NoteContent[]) => void,
) => {
  ImagePicker.openCamera({
    width: 1000,
    height: 1000,
    cropping: true,
    freeStyleCropEnabled: true,
    includeBase64: true,
    mediaType: 'photo',
  }).then(images => {
    if (images) {
      let getNoteContentLayoutList = [
        ...contentLayoutList,
        {
          type: 'IMAGE',
          imgBase64: `data:${images.mime};base64,${images.data}`,
        },
      ];
      updateContentLayoutList(getNoteContentLayoutList);
    }
  });
};

const onPenIconPress = (
  contentLayoutList: NoteContent[] | any,
  updateContentLayoutList: (updatedList: NoteContent[]) => void,
) => {
  let getNoteContentLayoutList = [
    ...contentLayoutList,
    {
      type: 'TEXT',
      value: '',
      fontStyle: 'normal',
      fontSizeOption: 'B',
      fontSize: sw(16),
      fontWeight: '300',
      textDecorationLine: null,
      align: 'left',
      paddingLeft: sw(0),
      paddingRight: sw(0),
    },
  ];
  updateContentLayoutList(getNoteContentLayoutList);
};

const deletePhotoItem = (
  contentLayoutList: NoteContent[] | any,
  updateContentLayoutList: (updatedList: NoteContent[]) => void,
  index: number,
) => {
  let newNoteContentLayoutList = [...contentLayoutList];
  newNoteContentLayoutList.splice(index, 1);
  updateContentLayoutList(newNoteContentLayoutList);
};

const onChangeTextInputContent = (
  val: string,
  contentLayoutList: NoteContent[] | any,
  updateContentLayoutList: (updatedList: NoteContent[]) => void,
  index: number,
) => {
  let newNoteContentLayoutList = [...contentLayoutList];
  (newNoteContentLayoutList[index] as NoteTextContent).value = val;
  updateContentLayoutList(newNoteContentLayoutList);
};

const onBackspaceTextInputHandle = (
  contentLayoutList: NoteContent[] | any,
  updateContentLayoutList: (updatedList: NoteContent[]) => void,
  index: number,
) => {
  let newNoteContentLayoutList = [...contentLayoutList];
  newNoteContentLayoutList.splice(index, 1);
  updateContentLayoutList(newNoteContentLayoutList);
};

const getSelectedList = (noteList: NoteItem[]) => {
  let tempList: NoteSelectItem[] = [];
  noteList.forEach((item: NoteItem) => {
    tempList.push({
      uuid: item.uuid,
      isSelected: false,
    });
  });
  return tempList;
};

const onSelectAllPressedFunc = (
  selectedList: NoteSelectItem[],
  setSelectedList: React.Dispatch<React.SetStateAction<NoteSelectItem[]>>,
) => {
  let newValue =
    selectedList.filter(item => item.isSelected).length === selectedList.length;
  let temp = selectedList.map(item => {
    return { ...item, isSelected: !newValue };
  });
  setSelectedList(temp);
};

const onNoteItemSelectedFunc = (
  item: NoteItem,
  selectedList: NoteSelectItem[],
  setSelectedList: React.Dispatch<React.SetStateAction<NoteSelectItem[]>>,
) => {
  let selectedIndex = _.findIndex(selectedList, {
    uuid: item.uuid,
  });
  let temp = selectedList.map(subItem => {
    return item.uuid === subItem.uuid
      ? {
          ...subItem,
          isSelected: !selectedList[selectedIndex].isSelected,
        }
      : subItem;
  });
  setSelectedList(temp);
};

const deleteNoteFunc = async (selectedList: NoteSelectItem[]) => {
  let deletedList = _.filter(selectedList, { isSelected: true });
  let deletedUidList = _.map(deletedList, item => {
    return item.uuid;
  });
  let currentList = await StorageService.getNoteList();
  let newNoteList = currentList ? [...currentList] : [];
  currentList.map((item: NoteItem) => {
    if (deletedUidList.includes(item.uuid)) {
      newNoteList = _.reject(newNoteList, { uuid: item.uuid });
    }
  });
  StorageService.setNoteList(newNoteList);
};

export default {
  getNoteFlatListWithIndex,
  createNote,
  editNote,
  accessImagePickerFunc,
  accessCameraPickerFunc,
  onPenIconPress,
  deletePhotoItem,
  onChangeTextInputContent,
  onBackspaceTextInputHandle,
  getSelectedList,
  onSelectAllPressedFunc,
  onNoteItemSelectedFunc,
  deleteNoteFunc,
};
