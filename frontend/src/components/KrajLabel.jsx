import styled from "styled-components";
import PropTypes from "prop-types";

const StyledText = styled.text`
  font-size: ${({ $isSmallRegion }) => ($isSmallRegion ? "1.8rem" : "1.4rem")};
  text-anchor: middle;
  fill: ${({ $isSelected }) =>
    $isSelected ? "var(--color-primary-50)" : "var(--color-grey-800)"};
  transition: fill 0.3s ease, transform 0.2s ease;
  transform: ${({ $isHovered }) => ($isHovered ? "scale(1.04)" : "scale(1)")};
  transform-origin: center;
  pointer-events: none;
  z-index: ${({ $isHovered, $isPraha }) => ($isHovered || $isPraha ? 101 : 1)};
`;

function adjustLabelPosition(kraj) {
  switch (kraj.slug) {
    case "olomoucky-kraj":
      return { x: kraj.labelPosition.x - 2, y: kraj.labelPosition.y + 54 };
    case "stredocesky-kraj":
      return { x: kraj.labelPosition.x, y: kraj.labelPosition.y + 50 };
    case "jihomoravsky-kraj":
      return { x: kraj.labelPosition.x, y: kraj.labelPosition.y + 30 };
    case "moravskoslezky-kraj":
      return { x: kraj.labelPosition.x - 50, y: kraj.labelPosition.y + 30 };
    case "hlavni-mesto-praha":
      return {
        x: kraj.labelPosition.x,
        y: kraj.labelPosition.y,
        name: "Praha",
      };
    default:
      return kraj.labelPosition;
  }
}

function KrajLabel({ kraj, isSelected, isHovered }) {
  const labelPosition = adjustLabelPosition(kraj);
  const isPraha = kraj.slug === "hlavni-mesto-praha";

  return (
    <StyledText
      x={labelPosition.x}
      y={labelPosition.y}
      $isSelected={isSelected}
      $isHovered={isHovered}
      $isPraha={isPraha}
    >
      {isPraha ? "Praha" : kraj.name}
    </StyledText>
  );
}

KrajLabel.propTypes = {
  kraj: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    labelPosition: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  isHovered: PropTypes.bool.isRequired,
};

export default KrajLabel;
