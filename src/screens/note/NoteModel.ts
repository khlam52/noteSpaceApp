export type NoteContentType = 'TEXT' | 'IMAGE';

export type FontStyle = 'italic' | 'normal';

export type TextDecorationLine = 'none' | 'underline' | 'line-through';

export type TextAlign = 'left' | 'center' | 'right';

export interface NoteTextContent {
  type: NoteContentType;
  value: string | null;
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
