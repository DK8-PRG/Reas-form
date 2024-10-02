import { useContext } from "react";
import PropTypes from "prop-types";
import PropertyList from "./PropertyList";
import styled from "styled-components";
import { DataContext } from "../context/DataContext";
import Heading from "../ui/Heading";

const TypNemovitostiContainer = styled.div`
  width: 100%;
  height: 15vh; /* Zabírá 15% výšky viewportu */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;

function TypNemovitostiSelection({ onSelect }) {
  const { typyNemovitosti, selectedTyp, setSelectedTyp } =
    useContext(DataContext);
  const handleSelectType = onSelect || setSelectedTyp;

  return (
    <div>
      <Heading level={2}>Vyberte Typ Nemovitosti</Heading>

      <TypNemovitostiContainer>
        <PropertyList
          propertyTypes={typyNemovitosti}
          onSelectType={handleSelectType}
          selectedType={selectedTyp}
        />
      </TypNemovitostiContainer>
    </div>
  );
}

TypNemovitostiSelection.propTypes = {
  onSelect: PropTypes.func,
};

export default TypNemovitostiSelection;
