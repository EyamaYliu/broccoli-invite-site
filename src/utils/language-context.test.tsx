import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
	LanguageProvider,
	useLanguage,
	supportLanguages,
} from "./language-context";

const TestComponent: React.FC = () => {
	const { language, toggleLanguage, setLanguage } = useLanguage();
	return (
		<div>
			<span data-testid="language">{language}</span>
			<button data-testid="toggle-button" onClick={toggleLanguage} />
			<button
				data-testid="set-btn"
				onClick={() => {
					setLanguage(supportLanguages.zh);
				}}
			/>
		</div>
	);
};

describe("LanguageContext", () => {
	it("should provide default language (supportLanguages.en)", () => {
		render(
			<LanguageProvider>
				<TestComponent />
			</LanguageProvider>
		);
		const languageValue = screen.getByTestId("language");
		expect(languageValue).toHaveTextContent(String(supportLanguages.en));
	});

	it("should toggle language when toggleLanguage is called", () => {
		render(
			<LanguageProvider>
				<TestComponent />
			</LanguageProvider>
		);
		const languageValue = screen.getByTestId("language");
		const toggleButton = screen.getByTestId("toggle-button");

		expect(languageValue).toHaveTextContent(String(supportLanguages.en));
		fireEvent.click(toggleButton);
		expect(languageValue).toHaveTextContent(String(supportLanguages.zh));
		fireEvent.click(toggleButton);
		expect(languageValue).toHaveTextContent(String(supportLanguages.en));
	});

	it("should update language when setLanguage is called", () => {
		render(
			<LanguageProvider>
				<TestComponent />
			</LanguageProvider>
		);
		const languageValue = screen.getByTestId("language");
		const setButton = screen.getByTestId("set-btn");

		expect(languageValue).toHaveTextContent(String(supportLanguages.en));
		fireEvent.click(setButton);
		expect(languageValue).toHaveTextContent(String(supportLanguages.zh));
	});
});
