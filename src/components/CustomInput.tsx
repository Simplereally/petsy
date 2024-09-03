"use client";
import { type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { FloatingLabelInput } from "./ui/floating-input";
import { FormControl, FormField, FormMessage } from "./ui/form";

interface CustomInputProps<T extends FieldValues> {
  id: string;
  control: Control<T>;
  name: FieldPath<T>;
  type?: string;
  label: string;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
}

const CustomInput = <T extends FieldValues>({ id, control, name, type, label, inputMode }: CustomInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <div className="flex w-full flex-col">
            <FormControl>
              <FloatingLabelInput
                id={id}
                className="input-class"
                type={type === "password" ? "password" : "text"}
                label={label}
                inputMode={inputMode}
                {...field}
              />
            </FormControl>

            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
