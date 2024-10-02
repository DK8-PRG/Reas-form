const apiUrl = "https://reas-form-xnl3.onrender.com";

// Zpracování odpovědí a chyb
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json();
    const errorMessage = errorData.message || "Server error";
    throw new Error(errorMessage);
  }
  return res.json();
};

// Získání typů nemovitostí
export async function getTypNemovitosti() {
  try {
    const res = await fetch(`${apiUrl}/api/v1/enums/typ-nemovitosti`);
    const { data } = await handleResponse(res);
    return data;
  } catch (error) {
    console.error("Nepodařilo se získat typy nemovitostí", error.message);
    throw error;
  }
}

// Získání krajů
export async function getKraje() {
  try {
    const res = await fetch(`${apiUrl}/api/v1/enums/kraje`);
    const { data } = await handleResponse(res);
    return data;
  } catch (error) {
    console.error("Nepodařilo se získat kraje", error.message);
    throw error;
  }
}

// Získání okresů podle kraje
export async function getOkresyPodleKraje(slug) {
  try {
    const res = await fetch(`${apiUrl}/api/v1/enums/kraje/${slug}`);
    const { data } = await handleResponse(res);
    return data;
  } catch (error) {
    console.error(
      `Nepodařilo se získat okresy pro kraj ${slug}`,
      error.message
    );
    throw error;
  }
}

// Kontrola emailu a telefonu
export async function checkEmailAndPhone(email, phone) {
  try {
    const res = await fetch(`${apiUrl}/api/v1/leads/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, phone }),
    });

    const result = await handleResponse(res);
    return result;
  } catch (error) {
    console.error("Kontrola emailu a telefonu selhala", error.message);
    throw error;
  }
}
export async function getLeadByEmail(email) {
  try {
    const res = await fetch(`${apiUrl}/api/v1/leads/${email}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Nepodařilo se načíst data.");
    }
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("Nepodařilo se načíst data", error);
    throw error;
  }
}
// Odeslání formuláře
export async function submitFormData(data) {
  try {
    const res = await fetch(`${apiUrl}/api/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || "Něco se pokazilo při odesílání formuláře"
      );
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Nepodařilo se odeslat data:", error.message);
    throw error;
  }
}
