import {
  FieldValues,
  useController,
  UseControllerProps,
  useForm,
} from "react-hook-form";

export function Textarea<FormValues extends FieldValues>({
  controllerProps,
  placeholder,
  id,
}: {
  controllerProps: UseControllerProps<FormValues>;
  id?: string;
  placeholder?: string;
}) {
  const { field, fieldState, formState } = useController(controllerProps);

  return (
    <textarea
      {...field}
      rows={1}
      name={field.name}
      className="resize-none w-full"
      placeholder={placeholder}
      id={id}
    />
  );
}
