import PropTypes from "prop-types";
import styled from "styled-components";

// Určení velikosti nadpisu podle úrovně
const headingSizes = {
  1: "var(--font-size-xl)",
  2: "var(--font-size-lg)",
  3: "var(--font-size-md)",
  4: "var(--font-size-sm)",
};

const StyledHeading = styled.h1`
  font-size: ${(props) => headingSizes[props.level] || headingSizes[1]};
  color: var(--color-grey-900);
`;

function Heading({ level = 1, children }) {
  return <StyledHeading as={`h${level}`}>{children}</StyledHeading>;
}

Heading.propTypes = {
  level: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default Heading;
