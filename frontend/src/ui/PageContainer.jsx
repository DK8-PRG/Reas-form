import styled from "styled-components";
import PropTypes from "prop-types";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-100);
  /* aspect-ratio: 1 / 1.414; */
  width: 100%;
  max-width: 90vw;
  max-height: 90vh; /* Přidáme maximální výšku, aby obsah nepřetýkal */
  overflow: hidden; /* Přidáme overflow, aby přetékající obsah nebyl viditelný */
  margin: 3rem auto;
  padding: 10rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15), 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;
function PageContainer({ children }) {
  return <StyledPage>{children}</StyledPage>;
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageContainer;
