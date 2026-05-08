"use client";

import { Role } from "@/generated/prisma/browser";
import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
} from "react";



export interface ClientSessionUser {
  userId: string;
  email: string;
  role: Role;
}

interface SessionContextValue {
  user: ClientSessionUser | null;
  isAuthenticated: boolean;
}

const SessionContext = createContext<SessionContextValue | undefined>(
  undefined
);

interface SessionProviderProps {
  user: ClientSessionUser | null;
  children: ReactNode;
}

export function SessionProvider({
  user,
  children,
}: SessionProviderProps) {
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
    }),
    [user]
  );

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error(
      "useSession must be used inside SessionProvider"
    );
  }

  return context;
}

export function useRequiredSession() {
  const { user } = useSession();

  if (!user) {
    throw new Error("User is not authenticated");
  }

  return user;
}

export function useRole(role: Role) {
  const { user } = useSession();

  return user?.role === role;
}

export function useIsAdmin() {
  return useRole(Role.ADMIN);
}

export function useIsMarketing() {
  return useRole(Role.MARKETING);
}