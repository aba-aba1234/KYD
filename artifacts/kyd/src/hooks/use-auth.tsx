import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type UserRole = "family" | "caregiver";

export interface StoredUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  city: string;
  createdAt: string;
}

export type SafeUser = Omit<StoredUser, "password">;

interface AuthResult {
  success: boolean;
  error?: string;
  user?: SafeUser;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  city: string;
}

interface AuthContextValue {
  user: SafeUser | null;
  loading: boolean;
  login: (email: string, password: string) => AuthResult;
  register: (data: RegisterInput) => AuthResult;
  logout: () => void;
}

const USERS_KEY = "kyd_users";
const SESSION_KEY = "kyd_session";

const DEMO_USERS: StoredUser[] = [
  {
    id: "u-demo-family",
    email: "famiglia@demo.it",
    password: "demo123",
    name: "Marco Rossi",
    role: "family",
    city: "Milano",
    createdAt: new Date("2024-01-01").toISOString(),
  },
  {
    id: "u-demo-caregiver",
    email: "caregiver@demo.it",
    password: "demo123",
    name: "Sara Martinelli",
    role: "caregiver",
    city: "Milano",
    createdAt: new Date("2024-01-01").toISOString(),
  },
];

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toSafe(user: StoredUser): SafeUser {
  const { password: _password, ...rest } = user;
  return rest;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (readUsers().length === 0) {
      writeUsers(DEMO_USERS);
    }
    try {
      const session = localStorage.getItem(SESSION_KEY);
      if (session) {
        setUser(JSON.parse(session) as SafeUser);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string): AuthResult => {
    const users = readUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { success: false, error: "Email o password non validi" };
    }
    const safe = toSafe(found);
    setUser(safe);
    localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
    return { success: true, user: safe };
  };

  const register = (data: RegisterInput): AuthResult => {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: "Esiste già un account con questa email" };
    }
    const newUser: StoredUser = {
      id: `u-${Date.now()}`,
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role,
      city: data.city,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    writeUsers(users);
    const safe = toSafe(newUser);
    setUser(safe);
    localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
    return { success: true, user: safe };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
