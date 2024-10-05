import PropTypes from "prop-types";
import styled from "styled-components";

// Určení velikosti pro h1
const headingSizes = {
  desktop: "3rem",
  tablet: "2.5rem",
  mobile: "2rem",
};

const StyledHeading = styled.h1`
  font-size: ${headingSizes.desktop};
  color: var(--color-grey-900);
  margin-top: ${(props) => props.marginTop || "2rem"};
  margin-bottom: ${(props) => props.marginBottom || "2rem"};

  /* Responzivní velikost pro různé obrazovky */
  @media (max-width: 768px) {
    font-size: ${headingSizes.tablet};
  }

  @media (max-width: 480px) {
    font-size: ${headingSizes.mobile};
  }
`;

function Heading({ children, marginTop, marginBottom }) {
  return (
    <StyledHeading marginTop={marginTop} marginBottom={marginBottom}>
      {children}
    </StyledHeading>
  );
}

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
};

export default Heading;
