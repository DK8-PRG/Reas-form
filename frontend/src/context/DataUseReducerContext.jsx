import { createContext, useEffect, useReducer } from "react";
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
  kraje: [],
  typyNemovitosti: [],
  selectedTyp: null,
  selectedKraj: null,
  selectedOkres: null,
  isSubmitting: false,
  loadingKraje: true,
  loadingTypyNemovitosti: true,
  error: null,
};

// Definujeme reducer pro různé akce
function dataReducer(state, action) {
  switch (action.type) {
    case "setKraje":
      return { ...state, kraje: action.payload, loadingKraje: false };
    case "setTypNemovitosti":
      return {
        ...state,
        typyNemovitosti: action.payload,
        loadingTypyNemovitosti: false,
      };
    case "selectedTypNemovitosti":
      return { ...state, selectedTyp: action.payload };
    case "selectedKraj":
      return { ...state, selectedKraj: action.payload };
    case "selectedOkres":
      return { ...state, selectedOkres: action.payload };
    case "setFormData":
      return { ...state, formData: action.payload };
    case "setSubmitting":
      return { ...state, isSubmitting: action.payload };
    case "setError":
      return { ...state, error: action.payload };
    case "resetForm":
      return {
        ...state,
        ...initialState,
        kraje: state.kraje,
        typyNemovitosti: state.typyNemovitosti,
      };
    default:
      return state;
  }
}

function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchKraje() {
      try {
        const { regions } = await getKraje();
        dispatch({ type: "setKraje", payload: regions });
      } catch (error) {
        dispatch({ type: "setError", payload: "Chyba při načítání krajů" });
      }
    }

    async function fetchTypyNemovitosti() {
      try {
        const types = await getTypNemovitosti();
        dispatch({ type: "setTypNemovitosti", payload: types });
      } catch (error) {
        dispatch({
          type: "setError",
          payload: "Chyba při načítání typů nemovitostí",
        });
      }
    }

    fetchKraje();
    fetchTypyNemovitosti();
  }, []);

  function handleFormSubmit(data) {
    dispatch({ type: "setSubmitting", payload: true });
    dispatch({ type: "setError", payload: null });

    const finalData = {
      ...state.formData,
      ...data,
      estateType: state.selectedTyp,
      region: state.selectedKraj?.name,
      district: state.selectedOkres?.name,
    };

    async function submit() {
      try {
        await submitFormData(finalData);
        navigate("/thankyou");
        dispatch({ type: "resetForm" });
      } catch (error) {
        dispatch({ type: "setError", payload: error.message });
      } finally {
        dispatch({ type: "setSubmitting", payload: false });
      }
    }

    submit();
  }

  function resetForm() {
    dispatch({ type: "resetForm" });
  }

  function goToHome() {
    resetForm();
    navigate("/");
  }

  async function handleCheckData(email) {
    dispatch({ type: "setError", payload: null });
    try {
      const data = await getLeadByEmail(email);
      return data;
    } catch (err) {
      dispatch({ type: "setError", payload: "Uživatel není registrován." });
    }
  }

  const value = {
    ...state,
    setSelectedTyp: (typ) =>
      dispatch({ type: "selectedTypNemovitosti", payload: typ }),
    setSelectedKraj: (kraj) =>
      dispatch({ type: "selectedKraj", payload: kraj }),
    setSelectedOkres: (okres) =>
      dispatch({ type: "selectedOkres", payload: okres }),
    setFormData: (data) => dispatch({ type: "setFormData", payload: data }),
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

export { DataContext, DataProvider };
