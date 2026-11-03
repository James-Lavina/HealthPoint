export type ScreenId =
'welcome' |
'info' |
'dashboard' |
'instruction' |
'results' |
'summary' |
'print';

export type MeasurementId = 'bloodPressure' | 'heartRate' | 'temperature' | 'height' | 'weight';

export type MeasurementStatus = 'not_started' | 'measuring' | 'completed';

export type ReadingLevel = 'normal' | 'attention' | 'outside' | 'recorded';

export type Sex = 'female' | 'male' | 'unspecified';

export type EndMode = 'exit' | 'new';

export interface UserInfo {
  fullName: string;
  age: string;
  sex: Sex | null;
}