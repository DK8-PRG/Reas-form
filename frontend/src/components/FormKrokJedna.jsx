import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import PropTypes from "prop-types";
import styled from "styled-components";
import TypNemovitostiSelection from "./TypNemovitostiSelection";
import MapaCesko from "./MapaCesko";
import OkresSelection from "./OkresSelection";
import { PrimaryButton } from "../ui/Button";
import Spinner from "../ui/Spinner"; // Import spinneru

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 800px;
  height: 100vh;
  margin-top: 4rem;
  margin-bottom: 4rem;
  gap: 0;
`;

function FormKrokJedna({ onNext }) {
  const {
    selectedTyp,
    selectedKraj,
    selectedOkres,
    loadingKraje,
    loadingTypyNemovitosti,
  } = useContext(DataContext);

  function handleNext() {
    onNext({
      estateType: selectedTyp,
      region: selectedKraj?.name,
      district: selectedOkres?.name,
    });
  }

  return (
    <Container>
      {loadingKraje || loadingTypyNemovitosti ? (
        <Spinner />
      ) : (
        <>
          <TypNemovitostiSelection />
          <MapaCesko />
          {selectedKraj && <OkresSelection />}
          {selectedTyp && selectedKraj && selectedOkres && (
            <PrimaryButton onClick={handleNext}>Pokračovat</PrimaryButton>
          )}
        </>
      )}
    </Container>
  );
}

FormKrokJedna.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default FormKrokJedna;
