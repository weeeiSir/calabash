export interface optionWithChild {
  title: string;
  key: string;
  children: optionWithChild[];
}
export interface vModel {
  onChange: (value: string) => string;
  value: string;
}
