import { useState, useContext } from "react";
import styled from "styled-components";
import CheckDataForm from "../components/CheckDataForm";
import Heading from "../ui/Heading";
import { PrimaryButton, SecondaryButton } from "../ui/Button";
import { DataContext } from "../context/DataContext";

const ThankYouContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background-color: var(--color-gray-50);
  color: var(--color-gray-900);
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem; /* Větší mezera mezi tlačítky */
  margin-top: 3rem; /* Větší mezera nad tlačítky */
`;

const SubText = styled.p`
  font-size: var(--font-size-md);
  color: var(--color-gray-700);
  margin-bottom: 2rem;
`;

const Message = styled.p`
  font-size: var(--font-size-md);
  color: var(--color-primary-500);
  margin-bottom: 1rem;
`;

function ThankYouPage() {
  const { goToHome } = useContext(DataContext);
  const [showCheckForm, setShowCheckForm] = useState(false);

  function handleCheckDataClick() {
    setShowCheckForm(true);
  }

  return (
    <ThankYouContainer>
      <Message>Úspěšně odesláno!</Message>
      <Heading level={1}>Děkujeme za vaši poptávku!</Heading>
      <SubText>
        Vaše údaje byly úspěšně odeslány a my se vám brzy ozveme.
      </SubText>

      <ButtonGroup>
        {!showCheckForm && (
          <PrimaryButton onClick={handleCheckDataClick}>
            Zkontrolovat data
          </PrimaryButton>
        )}
        <SecondaryButton onClick={goToHome}>Domů</SecondaryButton>
      </ButtonGroup>

      {showCheckForm && <CheckDataForm />}
    </ThankYouContainer>
  );
}

export default ThankYouPage;
