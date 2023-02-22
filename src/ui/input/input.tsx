import {
  FieldValues,
  useController,
  UseControllerProps,
  useForm,
} from "react-hook-form";

export function Input<FormValues extends FieldValues>({
  controllerProps,
  placeholder,
  id,
  readonly,
}: {
  controllerProps: UseControllerProps<FormValues>;
  id?: string;
  placeholder?: string;
  readonly?: boolean;
}) {
  const { field, fieldState, formState } = useController(controllerProps);

  return (
    <input
      {...field}
      readOnly={readonly}
      name={field.name}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      id={id}
    />
  );
}
