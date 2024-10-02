import styled from "styled-components";
import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import InputField from "../ui/Input";
import { PrimaryButton } from "../ui/Button";
import Heading from "../ui/Heading";

const CheckDataContainer = styled.div`
  margin-top: 3rem;
  text-align: center;
  padding: 2rem; /* Přidání paddingu kolem celého formuláře */
`;

const FormWrapper = styled.div`
  margin-bottom: 2rem; /* Přidání prostoru mezi formulářem a výsledkem */
`;

const ButtonWrapper = styled.div`
  margin-top: 1.5rem; /* Přidání prostoru mezi vstupním polem a tlačítkem */
`;

const DataDetails = styled.div`
  margin-top: 2rem;
  text-align: left;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ErrorText = styled.p`
  color: var(--color-danger);
  font-size: var(--font-size-sm);
  margin-top: 1rem; /* Přidání prostoru mezi chybovou zprávou a vstupem */
`;

function CheckDataForm() {
  const { handleCheckData } = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [leadData, setLeadData] = useState(null);
  const [error, setError] = useState("");

  async function checkDataByEmail() {
    if (!email) {
      setError("Musíte zadat email.");
      return;
    }

    try {
      const data = await handleCheckData(email);
      if (data) {
        setLeadData(data);
        setError(""); // Vymaže chybu, pokud data existují
      } else {
        setError("Email není registrován. Prosím, zaregistrujte se.");
      }
    } catch (error) {
      console.error("Nepodařilo se načíst data podle emailu.");
      setError("Došlo k chybě při kontrole emailu.");
    }
  }

  return (
    <CheckDataContainer>
      <Heading level={3}>Zkontrolujte data podle emailu:</Heading>

      <FormWrapper>
        <InputField
          type="email"
          label="Zadejte email"
          id="email-check"
          placeholder="neco@tam.je"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <ErrorText>{error}</ErrorText>}
        <ButtonWrapper>
          <PrimaryButton onClick={checkDataByEmail}>
            Zkontrolovat data
          </PrimaryButton>
        </ButtonWrapper>
      </FormWrapper>

      {leadData && (
        <DataDetails>
          <h4>Data z databáze:</h4>
          <p>
            <strong>Jméno:</strong> {leadData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {leadData.email}
          </p>
          <p>
            <strong>Telefon:</strong> {leadData.phone}
          </p>
          <p>
            <strong>Typ nemovitosti:</strong> {leadData.estateType}
          </p>
          <p>
            <strong>Kraj:</strong> {leadData.region}
          </p>
          <p>
            <strong>Okres:</strong> {leadData.district}
          </p>
        </DataDetails>
      )}
    </CheckDataContainer>
  );
}

export default CheckDataForm;
