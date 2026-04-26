import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type UserRole = "family" | "caregiver" | "caregiver_pending";

export interface StoredUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  city: string;
  caregiverId: string | null;
  previousRole: UserRole | null;
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
  role: "family" | "caregiver";
  city: string;
}

interface AuthContextValue {
  user: SafeUser | null;
  loading: boolean;
  login: (email: string, password: string) => AuthResult;
  register: (data: RegisterInput) => AuthResult;
  logout: () => void;
  upgradeToCaregiver: () => AuthResult;
  linkCaregiverProfile: (caregiverId: string) => void;
  isGuest: boolean;
  isFamily: boolean;
  isCaregiver: boolean;
  isPending: boolean;
  isAnyCaregiver: boolean;
}

const USERS_KEY = "kyd_users_v2";
const SESSION_KEY = "kyd_session_v2";

const DEMO_USERS: StoredUser[] = [
  {
    id: "u-demo-family",
    email: "famiglia@demo.it",
    password: "demo123",
    name: "Marco Rossi",
    role: "family",
    city: "Milano",
    caregiverId: null,
    previousRole: null,
    createdAt: new Date("2024-01-01").toISOString(),
  },
  {
    id: "u-demo-caregiver",
    email: "caregiver@demo.it",
    password: "demo123",
    name: "Sara Martinelli",
    role: "caregiver",
    city: "Milano",
    caregiverId: "giulia-rossi",
    previousRole: null,
    createdAt: new Date("2024-01-01").toISOString(),
  },
  {
    id: "u-demo-pending",
    email: "pending@demo.it",
    password: "demo123",
    name: "Luca Bianchi",
    role: "caregiver_pending",
    city: "Roma",
    caregiverId: null,
    previousRole: null,
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

function persistSession(user: SafeUser | null) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
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
    persistSession(safe);
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
      role: data.role === "caregiver" ? "caregiver_pending" : "family",
      city: data.city,
      caregiverId: null,
      previousRole: null,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    writeUsers(users);
    const safe = toSafe(newUser);
    setUser(safe);
    persistSession(safe);
    return { success: true, user: safe };
  };

  const upgradeToCaregiver = (): AuthResult => {
    if (!user) return { success: false, error: "Non sei autenticato" };
    if (user.role !== "family") {
      return { success: false, error: "Sei già un caregiver" };
    }
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx === -1) return { success: false, error: "Utente non trovato" };
    users[idx].previousRole = user.role;
    users[idx].role = "caregiver_pending";
    writeUsers(users);
    const updated: SafeUser = { ...user, role: "caregiver_pending", previousRole: user.role };
    setUser(updated);
    persistSession(updated);
    return { success: true, user: updated };
  };

  const linkCaregiverProfile = (caregiverId: string): void => {
    if (!user) return;
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      users[idx].caregiverId = caregiverId;
      if (users[idx].role === "family") {
        users[idx].previousRole = "family";
        users[idx].role = "caregiver_pending";
      }
      writeUsers(users);
    }
    const updated: SafeUser = {
      ...user,
      caregiverId,
      role: user.role === "family" ? "caregiver_pending" : user.role,
      previousRole:
        user.role === "family" ? "family" : user.previousRole,
    };
    setUser(updated);
    persistSession(updated);
  };

  const logout = () => {
    setUser(null);
    persistSession(null);
  };

  const value = useMemo<AuthContextValue>(() => {
    const isGuest = !user;
    const isFamily = user?.role === "family";
    const isCaregiver = user?.role === "caregiver";
    const isPending = user?.role === "caregiver_pending";
    const isAnyCaregiver = isCaregiver || isPending;
    return {
      user,
      loading,
      login,
      register,
      logout,
      upgradeToCaregiver,
      linkCaregiverProfile,
      isGuest,
      isFamily,
      isCaregiver,
      isPending,
      isAnyCaregiver,
    };
  }, [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
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
