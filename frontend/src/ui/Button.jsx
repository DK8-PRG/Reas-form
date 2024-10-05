import PropTypes from "prop-types";
import styled from "styled-components";

// Základní styly tlačítka
const StyledButton = styled.button`
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "var(--color-primary-50)"};
  color: ${({ color }) => color || "var(--color-primary-900)"};
  border: 1px solid var(--color-primary-900);
  padding: 10px 20px;
  font-size: 1.4rem;
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  transition: background-color 0.3s ease, font-size 0.3s ease;

  &:hover {
    background-color: var(--color-grey-800);
    color: var(--color-primary-50);
  }

  &:disabled {
    background-color: var(--color-grey-300);
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
  }
`;

export const PrimaryButton = styled(StyledButton)`
  background-color: var(--color-primary-300);
  margin-top: 3rem;
  margin-bottom: 2rem;

  &:hover {
    background-color: var(--color-primary-400);
  }

  @media (max-width: 768px) {
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    margin-top: 1rem;
  }
`;

export const SecondaryButton = styled(StyledButton)`
  background-color: var(--color-grey-500);
  margin-top: 3rem;
  margin-bottom: 2rem;

  &:hover {
    background-color: var(--color-grey-700);
  }

  @media (max-width: 768px) {
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    margin-top: 1rem;
  }
`;

export const PropertyOption = styled(StyledButton)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7rem;
  gap: 1rem;
  padding: 20px;
  border: 1px solid var(--color-grey-500);
  background-color: ${({ $isSelected }) =>
    $isSelected ? "var(--color-primary)" : "var(--color-grey-100)"};
  color: ${({ $isSelected }) =>
    $isSelected ? "var(--color-grey-100)" : "var(--color-grey-600)"};

  @media (max-width: 768px) {
    width: 6rem;
    padding: 15px;
    gap: 0.8rem;
  }

  @media (max-width: 480px) {
    width: 5rem;
    padding: 10px;
    gap: 0.5rem;
  }
`;

const Button = ({ onClick, children, className = "", disabled = false }) => {
  return (
    <StyledButton onClick={onClick} className={className} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
