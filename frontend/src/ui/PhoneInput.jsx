import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PhoneRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Predvolba = styled.select`
  padding: 0.5rem;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-sm);
  font-size: 1.6rem;
  width: 100px;
`;

const TelCislo = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-sm);
  font-size: 1.6rem;
  flex: 1;
`;

const TelCisloCely = styled.input`
  visibility: hidden;
  height: 0px;
  padding: 0;
  margin: 0;
`;

const ErrorMessage = styled.p`
  color: var(--color-danger);
  font-size: 1.2rem;
`;

function PhoneInput({ label, register, setValue, error }) {
  const [countryCode, setCountryCode] = useState("+420");
  const [telefon, setTelefon] = useState("");
  const [fullPhoneNumber, setFullPhoneNumber] = useState("");

  useEffect(() => {
    const combinedPhone = `${countryCode}${telefon}`;
    setFullPhoneNumber(combinedPhone);
    setValue("phone", combinedPhone);
  }, [countryCode, telefon, setValue]);

  return (
    <InputContainer>
      <label>{label}</label>
      <PhoneRow>
        <Predvolba
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        >
          <option value="+420">+420</option>
          <option value="+421">+421</option>
        </Predvolba>

        <TelCislo
          type="tel"
          placeholder="Zadejte telefonní číslo"
          pattern="[0-9]{9}"
          title="Musí obsahovat 9 číslic"
          value={telefon}
          onChange={(e) => setTelefon(e.target.value)}
        />
      </PhoneRow>

      <TelCisloCely
        type="text"
        value={fullPhoneNumber}
        {...register("phone", {
          required: "Telefonní číslo je povinné",
          validate: (value) => {
            if (value.length === 13) {
              return true;
            }
            return "Telefonní číslo musí mít přesně 9 číslic";
          },
        })}
        readOnly
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
}

PhoneInput.propTypes = {
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default PhoneInput;
