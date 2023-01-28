import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { CameraIcon, PenIcon, PhotoIcon } from '../assets/images';

export const BOTTOM_BTN_LIST = [
  {
    icon: <PhotoIcon />,
    onPress: () => {
      accessImagePickerFunc();
    },
  },
  {
    icon: <CameraIcon />,
    onPress: () => {
      accessCameraPickerFunc();
    },
  },
  {
    icon: <PenIcon />,
    onPress: () => {
      onPenIconPress();
    },
  },
];

const accessImagePickerFunc = () => {
  ImagePicker.openPicker({
    width: 1000,
    height: 1000,
    cropping: true,
    freeStyleCropEnabled: true,
    multiple: false,
    includeBase64: true,
  }).then(images => {
    //   if (images) {
    //     getNoteContentLayoutList = [
    //       ...noteContentLayoutList,
    //       {
    //         type: 'IMAGE',
    //         image: images,
    //       },
    //     ];
    //     setNoteContentLayoutList(getNoteContentLayoutList);
    //   }
  });
};

const accessCameraPickerFunc = () => {
  ImagePicker.openCamera({
    width: 1000,
    height: 1000,
    cropping: true,
    freeStyleCropEnabled: true,
    includeBase64: true,
  }).then(images => {
    //   if (images) {
    //     getNoteContentLayoutList = [
    //       ...noteContentLayoutList,
    //       {
    //         type: 'IMAGE',
    //         image: images,
    //       },
    //     ];
    //     setNoteContentLayoutList(getNoteContentLayoutList);
    //   }
  });
};

const onPenIconPress = () => {};

export default {
  accessImagePickerFunc,
  accessCameraPickerFunc,
  onPenIconPress,
};
