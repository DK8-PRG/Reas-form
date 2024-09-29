const apiUrl = "http://localhost:5000";
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
      throw new Error("Server error");
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Nepodařilo se odeslat data", error);
    throw error;
  }
}
