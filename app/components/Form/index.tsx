import { useField, useIsSubmitting } from 'remix-validated-form';
import { Button } from '@chakra-ui/react';

type MyInputProps = {
  name: string;
  label: string;
};

const FormInput = ({ name, label }: MyInputProps) => {
  const { error, getInputProps } = useField(name);
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input {...getInputProps({ id: name })} />
      {error && <span className="my-error-class">{error}</span>}
    </div>
  );
};

const SubmitButton = () => {
  const isSubmitting = useIsSubmitting();
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      loadingText="Submitting"
      isLoading={isSubmitting}
      colorScheme="teal"
    >
      submit
    </Button>
  );
};

export { FormInput, SubmitButton };
