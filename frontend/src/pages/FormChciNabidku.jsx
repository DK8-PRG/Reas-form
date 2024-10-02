import { useContext, useState } from "react";
import FormKrokDva from "../components/FormKrokDva";
import FormKrokJedna from "../components/FormKrokJedna";
import { DataContext } from "../context/DataContext";
import PageContainer from "../ui/PageContainer";

function FormChciNabidku() {
  const { formData, setFormData, handleFormSubmit, isSubmitting, error } =
    useContext(DataContext);

  const [step, setStep] = useState(1);

  function handleStepJedna(data) {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep(2);
  }

  function handleZpet() {
    setStep(1);
  }

  return (
    <PageContainer>
      {step === 1 && <FormKrokJedna onNext={handleStepJedna} />}
      {step === 2 && (
        <FormKrokDva
          onSubmit={handleFormSubmit}
          onBack={handleZpet}
          defaultValues={formData}
        />
      )}
      {isSubmitting && <p>Odesílám data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </PageContainer>
  );
}

export default FormChciNabidku;
