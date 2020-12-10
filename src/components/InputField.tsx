import {
  ComponentWithAs,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconProps,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  placeholder?: string;
  icon?: any;
  lefttext?: string;
  name: string;

};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      
      {!label? null : <FormLabel htmlFor={field.name}> {label} </FormLabel>}
      <InputGroup>
      {!props.icon ? null : (
        <InputLeftElement pointerEvents="none" children={props.icon} />
      )}
      {!props.lefttext ? null : (
        <InputLeftAddon children={props.lefttext} />
      )}
 
      <Input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      </InputGroup>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
