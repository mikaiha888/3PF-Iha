export interface DataInput {
  name: string;
  type: string;
  iconName: string;
  placeholder: string;
  errors: {
    [key: string]: string;
  };
}
