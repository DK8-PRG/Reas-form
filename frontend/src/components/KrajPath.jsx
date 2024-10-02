import styled from "styled-components";
import PropTypes from "prop-types";

const StyledKraj = styled.g`
  fill: ${({ $isSelected, $isHovered }) =>
    $isSelected
      ? "var(--color-primary-500)"
      : $isHovered
      ? "var(--color-primary-200)"
      : "var(--color-gray-100)"};
  stroke: var(--color-gray-500);
  stroke-width: 1px;
  transform-origin: center;
  transform: ${({ $isHovered, $isSelected }) =>
    $isSelected ? "scale(1.009)" : $isHovered ? "scale(1.009)" : "scale(1)"};
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), fill 0.2s ease;
  cursor: pointer;
  z-index: ${({ $isHovered, $isSelected }) =>
    $isHovered || $isSelected ? 100 : 1};
  will-change: transform;
`;

function KrajPath({
  kraj,
  onClick = () => {},
  isSelected = false,
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <StyledKraj
      id={kraj.slug}
      onClick={onClick}
      $isSelected={isSelected}
      $isHovered={isHovered}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path d={kraj.pathData} />
    </StyledKraj>
  );
}

KrajPath.propTypes = {
  kraj: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    pathData: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  isHovered: PropTypes.bool,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default KrajPath;
