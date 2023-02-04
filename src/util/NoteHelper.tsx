import ImagePicker from 'react-native-image-crop-picker';
import {
  NoteContent,
  NoteImageContent,
  NoteTextContent,
} from '../screens/note/NoteModel';
import { sw } from '../styles/Mixins';

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
      fontSizeOption: 'T',
      fontSize: sw(18),
      fontWeight: '300',
      textDecorationLine: null,
      align: 'center',
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

export default {
  accessImagePickerFunc,
  accessCameraPickerFunc,
  onPenIconPress,
  deletePhotoItem,
  onChangeTextInputContent,
  onBackspaceTextInputHandle,
};
