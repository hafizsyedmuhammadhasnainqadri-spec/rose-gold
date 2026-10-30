import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, CurrencyConfig } from '../types';

interface CurrencyContextType {
  currentCurrency: CurrencyCode;
  currencyConfig: CurrencyConfig;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (pkrAmount: number) => string;
  convertPrice: (pkrAmount: number) => number;
  availableCurrencies: CurrencyConfig[];
  ratesLastUpdated: string;
  isLiveRates: boolean;
}

const DEFAULT_RATES: Record<CurrencyCode, number> = {
  PKR: 1,
  USD: 1 / 278.5,
  CAD: 1 / 202.4,
  GBP: 1 / 355.8,
  AED: 1 / 75.8,
  EUR: 1 / 302.2
};

const CURRENCY_CONFIGS: Record<CurrencyCode, Omit<CurrencyConfig, 'rateFromPKR'>> = {
  PKR: {
    code: 'PKR',
    name: 'Pakistani Rupee',
    symbol: 'Rs. ',
    format: (amt) => `Rs. ${Math.round(amt).toLocaleString()}`
  },
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    format: (amt) => `$${amt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  },
  CAD: {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'CA$',
    format: (amt) => `CA$${amt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    format: (amt) => `£${amt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  },
  AED: {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'AED ',
    format: (amt) => `AED ${amt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    format: (amt) => `€${amt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(DEFAULT_RATES);
  const [isLiveRates, setIsLiveRates] = useState(false);
  const [ratesLastUpdated, setRatesLastUpdated] = useState('Standard Institutional Reference');

  // Auto-detect country/currency preference on initial load
  const [currentCurrency, setCurrentCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('rg_selected_currency') as CurrencyCode;
    if (saved && DEFAULT_RATES[saved]) return saved;

    // Detect browser locale hint
    try {
      const lang = navigator.language || '';
      if (lang.includes('PK') || lang.includes('ur')) return 'PKR';
      if (lang.includes('AE') || lang.includes('ar-AE')) return 'AED';
      if (lang.includes('GB') || lang.includes('en-GB')) return 'GBP';
      if (lang.includes('CA') || lang.includes('en-CA')) return 'CAD';
      if (lang.includes('FR') || lang.includes('DE') || lang.includes('IT') || lang.includes('ES')) return 'EUR';
      if (lang.includes('US') || lang.includes('en-US')) return 'USD';
    } catch {
      // ignore
    }
    return 'PKR';
  });

  const setCurrency = (code: CurrencyCode) => {
    setCurrentCurrencyState(code);
    localStorage.setItem('rg_selected_currency', code);
  };

  // Gracefully fetch live exchange rates from open api with fallback
  useEffect(() => {
    const controller = new AbortController();
    const fetchRates = async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/PKR', { signal: controller.signal });
        if (res.ok) {
          const data = await res.json();
          if (data && data.rates) {
            setRates({
              PKR: 1,
              USD: data.rates.USD || DEFAULT_RATES.USD,
              CAD: data.rates.CAD || DEFAULT_RATES.CAD,
              GBP: data.rates.GBP || DEFAULT_RATES.GBP,
              AED: data.rates.AED || DEFAULT_RATES.AED,
              EUR: data.rates.EUR || DEFAULT_RATES.EUR
            });
            setIsLiveRates(true);
            setRatesLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          }
        }
      } catch {
        // Fall back gracefully to preset accurate rates
      }
    };

    fetchRates();
    return () => controller.abort();
  }, []);

  const convertPrice = (pkrAmount: number): number => {
    const rate = rates[currentCurrency] || DEFAULT_RATES[currentCurrency] || 1;
    return pkrAmount * rate;
  };

  const formatPrice = (pkrAmount: number): string => {
    const converted = convertPrice(pkrAmount);
    const config = CURRENCY_CONFIGS[currentCurrency];
    return config ? config.format(converted) : `Rs. ${pkrAmount}`;
  };

  const currentConfig: CurrencyConfig = {
    ...CURRENCY_CONFIGS[currentCurrency],
    rateFromPKR: rates[currentCurrency] || DEFAULT_RATES[currentCurrency]
  };

  const availableCurrencies: CurrencyConfig[] = (Object.keys(CURRENCY_CONFIGS) as CurrencyCode[]).map(code => ({
    ...CURRENCY_CONFIGS[code],
    rateFromPKR: rates[code] || DEFAULT_RATES[code]
  }));

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency,
        currencyConfig: currentConfig,
        setCurrency,
        formatPrice,
        convertPrice,
        availableCurrencies,
        ratesLastUpdated,
        isLiveRates
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};
