import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import InviteDialogContainer, {
	IInviteDialogProps,
} from "../component-invite-dialog/requestInviteDialog-container";

// Technically we can wrap mock i18n to be an result of a hook and use it in different files, but save the effort for the challenge
const i18n: Record<string, string> = {
	"request-invite-dialog-title": "Request an invite",
	"form-name-input-placeholder": "Full Name",
	"form-email-input-placeholder": "Email",
	"form-confirm-email-input-placeholder": "Confirm Email",
	"form-send-button-content": "Send",
	"form-pending-state-button-content": "Sending, please wait...",
	"form-confirm-button-content": "OK",
	"form-input-error-incomplete": "All fields are required.",
	"form-input-error-name-too-short":
		"Full name must be more than 3 characters.",
	"form-input-error-email-format-invalid": "Email format is invalid.",
	"form-input-error-confirm-email-mismatch": "Emails do not match.",
	"form-server-error-network": "Network error. Please try again.",
	"form-server-error-default": "Something went wrong.",
	"confirm-request-dialog-title": "All done!",
	"dialog-confirmation-text-content":
		"You will be one of the first to experience Broccoli & Co. when we launch.",
};

const renderContainer = (props?: Partial<IInviteDialogProps>) => {
	const defaultProps = {
		shouldDialogOpen: true,
		onDialogClose: vi.fn(),
		i18n,
	};
	return render(<InviteDialogContainer {...defaultProps} {...props} />);
};

describe("InviteDialogContainer Component", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it("Should properly return the renderer component", () => {
		renderContainer();
		expect(
			screen.getByTestId("request-invite-dialog-container")
		).toBeInTheDocument();
	});

	it("onSend should properly display error message when condition not fullfilled", async () => {
		renderContainer();

		const sendButton = screen.getByRole("button", {
			name: i18n["form-send-button-content"],
		});
		fireEvent.click(sendButton);

		await waitFor(() => {
			expect(
				screen.getByText(i18n["form-input-error-incomplete"])
			).toBeInTheDocument();
		});

		const nameInput = screen.getByTestId("request-invite-dialog-name-input");
		const emailInput = screen.getByTestId("request-invite-dialog-email-input");
		const confirmEmailInput = screen.getByTestId(
			"request-invite-dialog-confirm-email-input"
		);

		fireEvent.change(nameInput, { target: { value: "Mo" } });
		fireEvent.change(emailInput, { target: { value: "InvalidEmail" } });
		fireEvent.change(confirmEmailInput, {
			target: { value: "DifferentEmail" },
		});

		fireEvent.click(sendButton);

		await waitFor(() => {
			expect(
				screen.getByText(i18n["form-input-error-name-too-short"])
			).toBeInTheDocument();
			expect(
				screen.getByText(i18n["form-input-error-email-format-invalid"])
			).toBeInTheDocument();
			expect(
				screen.getByText(i18n["form-input-error-confirm-email-mismatch"])
			).toBeInTheDocument();
		});
	});

	it("Fill proper data and send should call fetch to send request", async () => {
		const fetchMock = vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({}),
			})
		);
		global.fetch = fetchMock as any;

		renderContainer();

		const nameInput = screen.getByTestId("request-invite-dialog-name-input");
		const emailInput = screen.getByTestId("request-invite-dialog-email-input");
		const confirmEmailInput = screen.getByTestId(
			"request-invite-dialog-confirm-email-input"
		);

		fireEvent.change(nameInput, { target: { value: "Mock User" } });
		fireEvent.change(emailInput, {
			target: { value: "mockUser@airwallex.com" },
		});
		fireEvent.change(confirmEmailInput, {
			target: { value: "mockUser@airwallex.com" },
		});

		const sendButton = screen.getByTestId("form-send-request-button");
		fireEvent.click(sendButton);

		await waitFor(() => {
			expect(fetchMock).toHaveBeenCalledTimes(1);
		});

		await waitFor(() => {
			expect(
				screen.getByTestId("success-sent-invite-dialog-wrapper")
			).toBeInTheDocument();
		});
	});
});
