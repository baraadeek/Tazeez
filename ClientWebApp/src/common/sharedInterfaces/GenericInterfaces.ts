export interface Dictionary<T> {
  [Key: string]: T;
}

export type onChangeCheckBoxEvent = (
  event: React.ChangeEvent<HTMLInputElement>,
  checked: boolean
) => void;
