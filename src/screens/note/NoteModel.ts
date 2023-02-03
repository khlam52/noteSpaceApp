import { SvgProps } from 'react-native-svg';
import { StringLiteral } from 'typescript';

export type NoteContentType = 'TEXT' | 'IMAGE';

export type FontStyle = 'italic' | 'normal';

export type TextDecorationLine = 'none' | 'underline' | 'line-through';

export type TextAlign = 'left' | 'center' | 'right';

export interface NoteTextContent {
  type: NoteContentType;
  value: string;
  fontStyle: FontStyle;
  fontSize: number;
  fontWeight: string | number;
  textDecorationLine: TextDecorationLine;
  textAlign: TextAlign;
  paddingLeft: number | null;
  paddginRight: number | null;
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
}

export interface FontStyleItem {
  title: string;
  style: string;
}

export interface FontAlignItem {
  icon: React.FC<SvgProps>;
  style: string;
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
  textDecorationLine: string | null;
}
