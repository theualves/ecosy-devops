import Cookies from "js-cookie";

const API_URL = "http://localhost:8080/api/usuarios/login";

export interface LoginResponse {
  success: boolean;
  user?: {
    name: string;
    email: string;
    role: "gestor" | "tecnico";
    token: string;
  };
  error?: string;
}

export const login = async (email: string, senha: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      return { success: false, error: "Email ou senha incorretos." };
    }

    const data = await response.json();

    return {
      success: true,
      user: {
        name: data.nome,
        email: data.email,
        role: data.role, 
        token: data.token,
      },
    };

  } catch (error) {
    console.error("Erro de conexão:", error);
    return { success: false, error: "Erro ao conectar com o servidor." };
  }
};

export const logout = async (): Promise<void> => {
  Cookies.remove("ecosy_token");
  Cookies.remove("ecosy_user");
};