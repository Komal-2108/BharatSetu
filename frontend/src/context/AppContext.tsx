"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "@/lib/i18n";
import { getWishlist, toggleWishlist as helperToggleWishlist } from "@/lib/wishlist";

export interface UserRoleProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: "customer" | "vendor";
  verified?: boolean;
  trustTier?: string;
  city?: string;
  businessType?: string;
}

interface AppContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  t: typeof translations.en;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  user: UserRoleProfile | null;
  loginUser: (user: UserRoleProfile) => void;
  logoutUser: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<Language>("en");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<UserRoleProfile | null>(null);

  useEffect(() => {
    // 1. Theme initialization
    const savedTheme = localStorage.getItem("bharatsetu_theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // 2. Language initialization
    const savedLang = localStorage.getItem("bharatsetu_lang") as Language;
    if (savedLang) setLanguage(savedLang);

    // 3. Wishlist initialization
    setWishlist(getWishlist());

    // 4. User profile initialization
    try {
      const savedUser = localStorage.getItem("bharatsetu_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        const savedVendor = localStorage.getItem("bharatsetu_vendor");
        if (savedVendor) {
          const v = JSON.parse(savedVendor);
          setUser({
            id: v.id,
            name: v.name,
            phone: v.phone,
            email: v.email || `${v.id}@bharatsetu.in`,
            role: "vendor",
            verified: v.verified,
            trustTier: v.trustTier || v.trust_tier,
            city: v.city,
            businessType: v.businessType || v.business_type
          });
        }
      }
    } catch (e) {
      console.warn("Failed to load user session");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("bharatsetu_theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "hi" : "en";
    setLanguage(nextLang);
    localStorage.setItem("bharatsetu_lang", nextLang);
  };

  const toggleWishlist = (id: string) => {
    const updated = helperToggleWishlist(id);
    setWishlist(updated);
  };

  const isWishlisted = (id: string) => wishlist.includes(id);

  const loginUser = (userProfile: UserRoleProfile) => {
    setUser(userProfile);
    localStorage.setItem("bharatsetu_user", JSON.stringify(userProfile));
    if (userProfile.role === "vendor") {
      localStorage.setItem("bharatsetu_vendor", JSON.stringify(userProfile));
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("bharatsetu_user");
    localStorage.removeItem("bharatsetu_vendor");
    localStorage.removeItem("bharatsetu_token");
  };

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        toggleLanguage,
        t,
        wishlist,
        toggleWishlist,
        isWishlisted,
        user,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
