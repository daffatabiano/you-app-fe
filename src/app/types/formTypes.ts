interface InputType {
  type?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string | boolean | undefined;
  placeholder?: string;
  disabled?: boolean;
  value?: string | number | readonly string[] | undefined;
}
