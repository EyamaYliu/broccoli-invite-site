import { createContext, useState, useContext } from "react";

export enum supportLanguages {
	"en",
	"zh",
}

interface LanguageContextType {
	language: supportLanguages;
	setLanguage: (lang: supportLanguages) => void;
	toggleLanguage: () => void;
}

const defaultLanguage = supportLanguages.en;

const LanguageContext = createContext<LanguageContextType>({
	language: defaultLanguage,
	setLanguage: () => {},
	toggleLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [language, setLanguage] = useState<supportLanguages>(defaultLanguage);

	const toggleLanguage = () => {
		setLanguage((prev) =>
			prev === supportLanguages.en ? supportLanguages.zh : supportLanguages.en
		);
	};

	return (
		<LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => useContext(LanguageContext);
