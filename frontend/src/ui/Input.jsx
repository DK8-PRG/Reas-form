import PropTypes from "prop-types";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-sm);
  font-size: 1.6rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  color: var(--color-gray-600);
`;

const ErrorMessage = styled.p`
  color: var(--color-danger);
  font-size: 1.2rem;
`;

function InputField({ label, id, error, register, ...props }) {
  return (
    <InputContainer>
      <Label htmlFor={id}>{label}</Label>
      <StyledInput id={id} {...register} {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  error: PropTypes.string,
  register: PropTypes.object.isRequired,
};

export default InputField;
