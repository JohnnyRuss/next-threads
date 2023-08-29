import React from "react";
import {
  FormField as Field,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control, ControllerRenderProps } from "react-hook-form";

interface FormFieldT {
  formControl: Control<any, any>;
  name: string;
  formItemClasses?: string;
  formLabelClasses?: string;
  formControlClasses?: string;
  label: (params: ControllerRenderProps) => React.ReactNode;
  controlledField: (params: ControllerRenderProps) => React.ReactNode;
}

const FormField: React.FC<FormFieldT> = ({
  formControl,
  name,
  formItemClasses,
  formLabelClasses,
  formControlClasses,
  label,
  controlledField,
}) => {
  return (
    <Field
      name={name}
      control={formControl}
      render={({ field }) => (
        <FormItem
          className={
            formItemClasses ? formItemClasses : "flex flex-col gap-3 w-full"
          }
        >
          <FormLabel
            className={
              formLabelClasses
                ? formLabelClasses
                : "text-base-semibold text-light-2"
            }
          >
            {label(field)}
          </FormLabel>
          <FormControl className={formControlClasses || ""}>
            {controlledField(field)}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;
