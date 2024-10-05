import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  margin: 3.2rem auto 1.6rem;
  width: 60px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid var(--color-primary-900);
  border-right-color: var(--color-primary-200);
  animation: ${rotate} 1s infinite linear;
`;

export default function Spinner() {
  return <StyledSpinner />;
}
