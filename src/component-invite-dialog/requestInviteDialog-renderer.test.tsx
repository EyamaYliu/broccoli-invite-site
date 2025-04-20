import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import InviteDialogRenderer, {
	DialogState,
	IInviteDialogRendererProps,
} from "./requestInviteDialog-renderer";
import "@testing-library/jest-dom";

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

const defaultDialogState: DialogState = {
	name: "",
	email: "",
	confirmEmail: "",
	loading: false,
	success: false,
};

describe("InviteDialogRenderer Component", () => {
	let onDialogClose = vi.fn();
	let onFieldChange = vi.fn();
	let onSend = vi.fn();
	let onDialogExited = vi.fn();

	beforeEach(() => {
		vi.restoreAllMocks();
	});

	const renderComponent = (props?: Partial<IInviteDialogRendererProps>) => {
		const combinedProps: IInviteDialogRendererProps = {
			shouldDialogOpen: true,
			onDialogClose,
			onFieldChange,
			onSend,
			onDialogExited,
			i18n,
			inputError: [],
			serverError: "",
			dialogState: { ...defaultDialogState },
			...props,
		};
		return render(<InviteDialogRenderer {...combinedProps} />);
	};

	it("Ensure form components are properly rendered", () => {
		renderComponent();
		expect(
			screen.getByTestId("request-invite-dialog-title")
		).toBeInTheDocument();

		expect(
			screen.getByTestId("request-invite-dialog-name-input")
		).toBeInTheDocument();
		expect(
			screen.getByTestId("request-invite-dialog-email-input")
		).toBeInTheDocument();
		expect(
			screen.getByTestId("request-invite-dialog-confirm-email-input")
		).toBeInTheDocument();

		expect(screen.getByTestId("form-send-request-button")).toBeInTheDocument();
	});

	it("onFieldChange gets called on input changes", () => {
		renderComponent();

		const nameInput = screen.getByLabelText(
			i18n["form-name-input-placeholder"]
		) as HTMLInputElement;
		fireEvent.change(nameInput, { target: { value: "mockName" } });
		expect(onFieldChange).toHaveBeenCalledWith("name", "mockName");

		const emailInput = screen.getByLabelText(
			i18n["form-email-input-placeholder"]
		) as HTMLInputElement;
		fireEvent.change(emailInput, { target: { value: "mockEmail" } });
		expect(onFieldChange).toHaveBeenCalledWith("email", "mockEmail");

		const confirmEmailInput = screen.getByLabelText(
			i18n["form-confirm-email-input-placeholder"]
		) as HTMLInputElement;
		fireEvent.change(confirmEmailInput, {
			target: { value: "mockEmail" },
		});
		expect(onFieldChange).toHaveBeenCalledWith("confirmEmail", "mockEmail");
	});

	it("Dialog will properly close when click confirm button in success state ", () => {
		renderComponent({
			dialogState: { ...defaultDialogState, success: true },
		});

		expect(
			screen.getByTestId("request-invite-dialog-title")
		).toBeInTheDocument();

		expect(
			screen.getByTestId("success-sent-invite-dialog-wrapper")
		).toBeInTheDocument();

		const confirmButton = screen.getByTestId("form-confirm-button");
		expect(confirmButton).toBeInTheDocument();

		fireEvent.click(confirmButton);
		expect(onDialogClose).toHaveBeenCalled();
	});

	it("Send button should be disabled while pending on response", () => {
		renderComponent({
			dialogState: { ...defaultDialogState, loading: true, success: false },
		});

		const pendingButton = screen.getByTestId("form-send-request-button");
		expect(pendingButton).toBeInTheDocument();
		expect(pendingButton).toBeDisabled();
	});

	it("inputError error can be properly displayed", () => {
		const existInputErrors = [
			"form-input-error-incomplete",
			"form-input-error-name-too-short",
		];
		const notExistInputErros = [
			"form-input-error-email-format-invalid",
			"form-input-error-confirm-email-mismatch",
		];
		renderComponent({
			inputError: existInputErrors,
		});
		existInputErrors.forEach((errorKey) => {
			expect(screen.queryByText(i18n[errorKey])).toBeInTheDocument();
		});

		notExistInputErros.forEach((errorKey) => {
			expect(screen.queryByText(i18n[errorKey])).not.toBeInTheDocument();
		});
	});

	it("Server error messages can be properly displayed", () => {
		const serverError = "400 Bad Request: Email is already used";
		renderComponent({
			serverError,
		});
		expect(screen.getByText(serverError)).toBeInTheDocument();
	});
});
