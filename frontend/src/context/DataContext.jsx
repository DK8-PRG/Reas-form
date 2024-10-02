import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getKraje,
  getLeadByEmail,
  getTypNemovitosti,
  submitFormData,
} from "../api";
import { useNavigate } from "react-router-dom";

const DataContext = createContext();
const initialState = {
  estateType: "",
  region: "",
  district: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};

function DataProvider({ children }) {
  const [kraje, setKraje] = useState([]);
  const [typyNemovitosti, setTypyNemovitosti] = useState([]);
  const [selectedTyp, setSelectedTyp] = useState(null);
  const [selectedKraj, setSelectedKraj] = useState(null);
  const [selectedOkres, setSelectedOkres] = useState(null);

  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetching regions and property types
  useEffect(() => {
    async function fetchKraje() {
      try {
        const { regions } = await getKraje();
        setKraje(regions);
      } catch (error) {
        setError("Chyba při načítání krajů");
      }
    }

    async function fetchTypyNemovitosti() {
      try {
        const types = await getTypNemovitosti();
        setTypyNemovitosti(types);
      } catch (error) {
        setError("Chyba při načítání typů nemovitostí");
      }
    }

    fetchKraje();
    fetchTypyNemovitosti();
  }, []);

  function handleFormSubmit(data) {
    setIsSubmitting(true);
    setError(null);

    const finalData = {
      ...formData,
      ...data,
      estateType: selectedTyp,
      region: selectedKraj?.name,
      district: selectedOkres?.name,
    };

    async function submit() {
      try {
        await submitFormData(finalData);
        navigate("/thankyou");
        resetForm();
      } catch (error) {
        console.error("Odeslání formuláře selhalo:", error.message);
        setError(error.message);
      } finally {
        setIsSubmitting(false);
      }
    }

    submit();
  }

  function resetForm() {
    setFormData(initialState);
    setSelectedTyp(null);
    setSelectedKraj(null);
    setSelectedOkres(null);
  }

  function goToHome() {
    resetForm();
    navigate("/");
  }

  async function handleCheckData(email) {
    setError(null);
    try {
      const data = await getLeadByEmail(email);
      return data;
    } catch (err) {
      setError("Uživatel není registrován.");
    }
  }

  const value = {
    kraje,
    typyNemovitosti,
    selectedTyp,
    setSelectedTyp,
    selectedKraj,
    setSelectedKraj,
    selectedOkres,
    setSelectedOkres,
    formData,
    setFormData,
    isSubmitting,
    error,
    handleFormSubmit,
    resetForm,
    goToHome,
    handleCheckData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DataContext };
export default DataProvider;
