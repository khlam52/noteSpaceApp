import { SvgProps } from 'react-native-svg';

export type NoteContentType = 'TEXT' | 'IMAGE';

export type FontStyle = 'italic' | 'normal';

export type TextDecorationLine =
  | 'none'
  | 'underline'
  | 'line-through'
  | 'underline line-through';

export type TextAlign = 'left' | 'center' | 'right' | 'auto';

export interface NoteTextContent {
  type: NoteContentType;
  value: string;
  fontStyle: string;
  fontSizeOption: string;
  fontSize: number;
  fontWeight: string | number;
  textDecorationLine: TextDecorationLine;
  align: TextAlign;
  paddingLeft: number;
  paddingRight: number;
}

export interface NoteImageContent {
  type: NoteContentType;
  imgBase64: string;
}

export type NoteContent = NoteTextContent | NoteImageContent;

export interface NoteItem {
  title: string;
  date: Date;
  content: NoteContent[];
  uuid: string;
}

export interface FontSizeItem {
  option: string;
  title: string;
  size: number;
  style: any;
  weight: string;
}

export interface FontStyleItem {
  title: string;
  style: string;
}

export interface FontAlignItem {
  icon: React.FC<SvgProps>;
  style: TextAlign;
}

export interface FontPaddingItem {
  title: string;
  icon: React.FC<SvgProps>;
  style: number;
}

export interface FontFormatStyle {
  fontSizeOption: string | null;
  fontWeight: string | null;
  fontStyle: string | null;
  textDecorationLine: TextDecorationLine;
  align: TextAlign;
  paddingRight: number;
  paddingLeft: number;
}
