import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import InputField from "../ui/Input";
import PhoneInput from "../ui/PhoneInput";
import Heading from "../ui/Heading";
import { PrimaryButton, SecondaryButton } from "../ui/Button";
import styled from "styled-components";
import { useState } from "react";

const FormContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;

  height: 80vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

function FormKrokDva({ onSubmit, onBack, defaultValues }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const [odesilam, setOdesilam] = useState(false);

  async function onFormSubmit(data) {
    setOdesilam(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Chyba při odesílání formuláře", error);
    } finally {
      setOdesilam(false);
    }
  }

  return (
    <FormContainer>
      <Heading level={1}>Vaše kontaktní údaje</Heading>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <InputField
          label="Jméno"
          id="firstName"
          placeholder="Zadejte vaše jméno"
          error={errors.firstName?.message}
          register={register("firstName", { required: "Jméno je povinné" })}
        />

        <InputField
          label="Příjmení"
          id="lastName"
          placeholder="Zadejte vaše příjmení"
          error={errors.lastName?.message}
          register={register("lastName", { required: "Příjmení je povinné" })}
        />

        <PhoneInput
          label="Telefon"
          register={register}
          setValue={setValue}
          error={errors.phone?.message}
        />

        <InputField
          label="Email"
          id="email"
          placeholder="neco@tam.je"
          error={errors.email?.message}
          register={register("email", {
            required: "Email je povinný",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Neplatný formát emailu",
            },
          })}
        />

        <ButtonContainer>
          <SecondaryButton type="button" onClick={onBack} disabled={odesilam}>
            Zpět
          </SecondaryButton>
          <PrimaryButton type="submit" disabled={odesilam}>
            {odesilam ? "Odesílám" : "Odeslat"}
          </PrimaryButton>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
}

FormKrokDva.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  defaultValues: PropTypes.object.isRequired,
};

export default FormKrokDva;
