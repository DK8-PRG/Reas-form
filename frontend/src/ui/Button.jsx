import PropTypes from "prop-types";
import styled from "styled-components";

// Základní komponenta tlačítka
const StyledButton = styled.button`
  background-color: var(--color-primary-50);
  color: var(--color-primary-900);
  border: 1px solid var(--color-primary-900);
  padding: 10px 20px;
  font-size: var(--font-size-medium);
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-grey-800);
  }

  &:disabled {
    background-color: var(--color-grey-300);
    cursor: not-allowed;
  }
`;

// Tlačítko pro primární akce jako "Chci nabídku", "Pokračovat", "Poslat"
export const PrimaryButton = styled(StyledButton)`
  margin-top: 3rem;
  background-color: var(--color-primary-300);
  &:hover {
    background-color: var(--color-primary-400);
    color: var(--color-primary-50);
  }
`;

// Tlačítko pro sekundární akce jako "Home" a "Zpět"
export const SecondaryButton = styled(StyledButton)`
  margin-top: 3rem;
  background-color: var(--color-grey-500);
  &:hover {
    background-color: var(--color-grey-700);
  }
`;

// Tlačítko pro výběr typu nemovitosti nebo výběr okresu
export const PropertyOption = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7rem;
  gap: 1rem;
  padding: 20px;
  border: 1px solid var(--color-grey-500);
  border-radius: var(--border-radius-sm);
  background-color: ${({ $isSelected }) =>
    $isSelected ? "var(--color-primary)" : "var(--color-grey-100)"};
  color: ${({ $isSelected }) =>
    $isSelected ? "var(--color-grey-100)" : "var(--color-grey-600)"};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

// Základní tlačítková komponenta
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
