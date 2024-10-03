import { useContext } from "react";
import PropTypes from "prop-types";
import PropertyList from "./PropertyList";
import styled from "styled-components";
import { DataContext } from "../context/DataContext";
import Heading from "../ui/Heading";

const TypNemovitostiContainer = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  padding: 0 1rem;
`;

function TypNemovitostiSelection({ onSelect }) {
  const { typyNemovitosti, selectedTyp, setSelectedTyp } =
    useContext(DataContext);
  const handleSelectType = onSelect || setSelectedTyp;

  return (
    <TypNemovitostiContainer>
      <Heading level={2}>Vyberte Typ Nemovitosti</Heading>
      <PropertyList
        propertyTypes={typyNemovitosti}
        onSelectType={handleSelectType}
        selectedType={selectedTyp}
      />
    </TypNemovitostiContainer>
  );
}

TypNemovitostiSelection.propTypes = {
  onSelect: PropTypes.func,
};

export default TypNemovitostiSelection;
