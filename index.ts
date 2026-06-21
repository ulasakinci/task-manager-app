/**
 * useLocalStorage Hook - LocalStorage ile veri saklama
 * 
 * Tasarım: Modern Minimalist Produktivite
 * Temel Prensipler: Veri Kalıcılığı, Tarayıcı Desteği
 */

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State'i başlatma
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // LocalStorage'dan değeri al
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error);
      return initialValue;
    }
  });

  // LocalStorage'a değeri kaydet
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error writing to localStorage for key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
