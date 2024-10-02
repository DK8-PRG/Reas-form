import styled from "styled-components";
import PropTypes from "prop-types";

const PropertyOption = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 10rem;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-sm);
  background-color: ${({ $isSelected }) =>
    $isSelected ? "var(--color-primary-500)" : "var(--color-gray-100)"};
  color: ${({ $isSelected }) =>
    $isSelected ? "var(--color-gray-100)" : "var(--color-gray-600)"};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-primary-200);
  }
`;

function PropertyTypeOption({ type, IconComponent, onClick, isSelected }) {
  return (
    <PropertyOption
      onClick={() => onClick(type)}
      $isSelected={isSelected}
      aria-label={`Select ${type}`}
    >
      <IconComponent className="h-5 w-5" />
      <span>{type}</span>
    </PropertyOption>
  );
}

PropertyTypeOption.propTypes = {
  type: PropTypes.string.isRequired,
  IconComponent: PropTypes.elementType.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default PropertyTypeOption;
