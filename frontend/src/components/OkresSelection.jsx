import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import styled from "styled-components";
import Heading from "../ui/Heading";
const OkresContainer = styled.div`
  width: 100%;
  height: 10vh;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    height: auto;
    padding: 0.5rem;
  }
  @media (max-width: 480px) {
    height: auto;
    gap: 0rem;
  }
`;

const OkresLabel = styled.label`
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  border: 1px solid var(--color-gray-400);
  background-color: ${({ $isSelected }) =>
    $isSelected ? "var(--color-primary-500)" : "var(--color-gray-100)"};
  color: ${({ $isSelected }) =>
    $isSelected ? "var(--color-gray-50)" : "var(--color-gray-700)"};
  white-space: nowrap;

  &:hover {
    background-color: var(--color-primary-200);
  }
  @media (max-width: 768px) {
    padding: 0.5rem 0.8rem;
    margin: 0.4rem;
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem 0.6rem;
    margin: 0.3rem;
    font-size: 1.2rem;
  }
`;

function OkresSelection() {
  const { selectedKraj, selectedOkres, setSelectedOkres } =
    useContext(DataContext);

  if (!selectedKraj) return null;

  function handleSelectOkres(okres) {
    setSelectedOkres(okres);
  }

  return (
    <>
      <Heading level={2}>Vyberte okres</Heading>{" "}
      <OkresContainer>
        {selectedKraj.districts.map((okres) => (
          <OkresLabel
            key={okres._id}
            $isSelected={selectedOkres?._id === okres._id}
          >
            <input
              type="radio"
              value={okres.name}
              checked={selectedOkres?._id === okres._id}
              onChange={() => handleSelectOkres(okres)}
              style={{ display: "none" }}
            />
            {okres.name}
          </OkresLabel>
        ))}
      </OkresContainer>
    </>
  );
}

export default OkresSelection;
