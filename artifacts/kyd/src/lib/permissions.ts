import type { SafeUser } from "@/hooks/use-auth";

export type Action =
  | "book"
  | "chat"
  | "see_book_button"
  | "see_chat_button"
  | "become_caregiver"
  | "see_received_bookings"
  | "see_my_bookings"
  | "appear_on_map"
  | "edit_caregiver_profile"
  | "family_dashboard"
  | "caregiver_dashboard";

type Role = SafeUser["role"] | "guest";

const RULES: Record<Action, Role[]> = {
  book: ["family"],
  chat: ["family", "caregiver", "caregiver_pending"],
  see_book_button: ["family"],
  see_chat_button: ["family", "caregiver", "caregiver_pending"],
  become_caregiver: ["guest", "family"],
  see_received_bookings: ["caregiver", "caregiver_pending"],
  see_my_bookings: ["family"],
  appear_on_map: ["caregiver"],
  edit_caregiver_profile: ["caregiver", "caregiver_pending"],
  family_dashboard: ["family"],
  caregiver_dashboard: ["caregiver", "caregiver_pending"],
};

export function canDo(user: SafeUser | null, action: Action): boolean {
  const role: Role = user?.role ?? "guest";
  return RULES[action].includes(role);
}

const MESSAGES: Partial<Record<Action, Partial<Record<Role, string>>>> = {
  book: {
    guest: "Accedi o registrati per prenotare un caregiver",
    caregiver: "I caregiver non possono prenotare altri caregiver",
    caregiver_pending: "Completa la verifica per accedere a questa funzione",
  },
  chat: {
    guest: "Accedi per usare la chat",
  },
  become_caregiver: {
    caregiver: "Sei già registrato come caregiver",
    caregiver_pending: "Il tuo profilo è già in fase di verifica",
  },
};

export function getBlockedMessage(
  user: SafeUser | null,
  action: Action
): string {
  const role: Role = user?.role ?? "guest";
  return (
    MESSAGES[action]?.[role] ?? "Non hai i permessi per accedere a questa funzione"
  );
}
