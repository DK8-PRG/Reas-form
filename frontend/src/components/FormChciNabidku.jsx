import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FormKrokDva from "./FormKrokDva";
import FormKrokJedna from "./FormKrokJedna";
import { submitFormData } from "../api";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

function FormChciNabidku() {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      estateType: "",
      region: "",
      district: "",
      fullName: "",
      phone: "",
      email: "",
    },
  });
  function handleStepJedna() {
    setStep(2);
  }
  async function handleStepDva() {
    const finalData = getValues();
    console.log(finalData);
    try {
      const result = await submitFormData(finalData);
      alert("Požadavek byl odeslán", result);
      reset();
      setStep(1);
    } catch (error) {
      console.error("Chyba při odesílání formuláře:", error);
    }
  }
  return (
    <FormContainer>
      {step === 1 && (
        <FormKrokJedna
          register={register}
          errors={errors}
          onSubmit={handleSubmit(handleStepJedna)}
        />
      )}
      {step === 2 && (
        <FormKrokDva
          register={register}
          errors={errors}
          onSubmit={handleSubmit(handleStepDva)}
        />
      )}
    </FormContainer>
  );
}

export default FormChciNabidku;
