const API_BASE_URL = "http://localhost:5000/api/auth";

export const signup = async (
  name: string,
  contact: string,
  email: string,
  address: string,
  dob: string,
  password: string
) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      name,
      contact,
      email,
      address,
      dob,
      password 
    }),
  });

  return response.json();
};

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
};