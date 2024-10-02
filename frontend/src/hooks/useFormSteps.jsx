import { useState } from "react";
import { useForm } from "react-hook-form";

export function useFormSteps(initialData) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData);
  const { reset } = useForm({ defaultValues: formData });

  const handleNextStep = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleReset = () => {
    reset();
    setStep(1);
  };

  const handleSubmit = (data) => {
    const finalData = { ...formData, ...data };
    console.log("Submitted data:", finalData);
    // Odeslat data na API nebo jinou logiku zde
    handleReset();
  };

  return {
    step,
    formData,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    handleReset,
  };
}
