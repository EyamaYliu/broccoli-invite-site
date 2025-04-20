import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";

const toggleLanguageMock = vi.fn();
vi.mock("./utils/language-context", () => ({
	useLanguage: () => ({
		toggleLanguage: toggleLanguageMock,
		language: "en",
	}),
}));

vi.mock("./utils/i18n", () => ({
	getI18nStrings: (lang: string) => {
		switch (lang) {
			default:
				return {
					"request-invite-form-title": "Request Invite",
					"form-name-input-placeholder": "Enter name",
					"form-email-input-placeholder": "Enter email",
					"form-confirm-email-input-placeholder": "Confirm email",
					"form-send-button-content": "Send",
					"form-pending-state-button-content": "Sending...",
					"dialog-confirmation-text-content": "Your request has been sent!",
					"home-page-main-title": "Welcome to HomePage",
					"home-page-sub-title": "Experience the best",
					"request-invite-button-content": "Request Invite",
					"switch-lang-button": "Switch Language",
					"footer-message": "Footer message",
					"footer-legal-claim-message": "Legal claims",
					"form-input-error-incomplete": "Incomplete input",
					"form-input-error-name-too-short": "Name too short",
					"form-input-error-email-format-invalid": "Invalid email format",
					"form-input-error-confirm-email-mismatch": "Emails do not match",
					"form-server-error-network": "Network error, please try again",
				};
		}
	},
}));

import HomePage from "./homePage";

describe("HomePage Integration Tests", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders header, main content, and footer correctly", () => {
		render(<HomePage />);

		// Header content
		expect(screen.getByTestId("homepage-header-container")).toBeInTheDocument();
		expect(screen.getByTestId("header-corp-name")).toBeInTheDocument();

		// Main content
		expect(
			screen.getByTestId("homepage-main-content-container")
		).toBeInTheDocument();
		expect(screen.getByTestId("home-page-main-title")).toBeInTheDocument();
		expect(screen.getByTestId("home-page-sub-title")).toBeInTheDocument();
		expect(screen.getByTestId("switch-lang-button")).toBeInTheDocument();

		// Footer content
		expect(screen.getByTestId("homepage-footer-container")).toBeInTheDocument();
		expect(screen.getByTestId("footer-message")).toBeInTheDocument();
		expect(
			screen.getByTestId("footer-legal-claim-message")
		).toBeInTheDocument();
	});

	it("calls toggleLanguage when clicking the switch language button", () => {
		render(<HomePage />);
		const switchLangButton = screen.getByTestId("switch-lang-button");
		fireEvent.click(switchLangButton);
		expect(toggleLanguageMock).toHaveBeenCalled();
	});

	it("clicking request invite button should open invite dialog", async () => {
		render(<HomePage />);
		const requestInviteButton = screen.getByTestId("request-invite-button");
		expect(requestInviteButton).toBeInTheDocument();

		fireEvent.click(requestInviteButton);

		await waitFor(() => {
			expect(
				screen.getByTestId("request-invite-dialog-container")
			).toBeInTheDocument();
		});
	});
});
