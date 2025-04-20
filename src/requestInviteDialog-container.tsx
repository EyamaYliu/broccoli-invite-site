import { useState, useReducer } from "react";
import InviteDialogRenderer from "./requestInviteDialog-renderer";
import { DialogState } from "./requestInviteDialog-renderer";

interface IInviteDialogProps {
	shouldDialogOpen: boolean;
	onDialogClose: () => void;
	i18n: Record<string, string>;
}

const initialDialogState: DialogState = {
	name: "",
	email: "",
	confirmEmail: "",
	loading: false,
	success: false,
};

type DialogStateAction =
	| {
			type: "SET_FIELD";
			field: "name" | "email" | "confirmEmail";
			value: string;
	  }
	| { type: "SET_LOADING"; value: boolean }
	| { type: "SET_SUCCESS"; value: boolean }
	| { type: "RESET" };

const dialogStateReducer = (
	state: DialogState,
	action: DialogStateAction
): DialogState => {
	switch (action.type) {
		case "SET_FIELD":
			return { ...state, [action.field]: action.value };
		case "SET_LOADING":
			return { ...state, loading: action.value };
		case "SET_SUCCESS":
			return { ...state, success: action.value };
		case "RESET":
			return initialDialogState;
		default:
			return state;
	}
};

const validateUserInputs = (
	currentDialogInputState: DialogState,
	setInputError: React.Dispatch<React.SetStateAction<string[]>>
): boolean => {
	const errors: string[] = [];
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const name = currentDialogInputState.name;
	const email = currentDialogInputState.email;
	const confirmEmail = currentDialogInputState.confirmEmail;

	if (!name || !email || !confirmEmail) {
		errors.push("form-input-error-incomplete");
	}
	if (name && name.length < 3) {
		errors.push("form-input-error-name-too-short");
	}
	if (email && !emailRegex.test(email)) {
		errors.push("form-input-error-email-format-invalid");
	}
	if (email && confirmEmail && email !== confirmEmail) {
		errors.push("form-input-error-confirm-email-mismatch");
	}

	setInputError(errors);
	return errors.length > 0;
};

const InviteDialogContainer: React.FC<IInviteDialogProps> = ({
	shouldDialogOpen,
	onDialogClose,
	i18n,
}) => {
	const [dialogState, dispatch] = useReducer(
		dialogStateReducer,
		initialDialogState
	);
	const [inputError, setInputError] = useState<string[]>([]);
	const [serverError, setServerError] = useState("");

	const handleDialogFieldChange = (
		field: "name" | "email" | "confirmEmail",
		value: string
	) => {
		dispatch({ type: "SET_FIELD", field, value });
	};

	const handleSendRequest = async () => {
		setServerError("");

		if (validateUserInputs(dialogState, setInputError)) {
			return;
		}

		dispatch({ type: "SET_LOADING", value: true });
		try {
			const res = await fetch(
				"https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: dialogState.name,
						email: dialogState.email,
					}),
				}
			);
			if (res.ok) {
				dispatch({ type: "SET_SUCCESS", value: true });
			} else {
				const data = await res.json();
				setServerError(
					data.errorMessage ? data.errorMessage : "Something went wrong."
				);
			}
		} catch (e) {
			setServerError(i18n["form-server-error-network"]);
		} finally {
			dispatch({ type: "SET_LOADING", value: false });
		}
	};

	const handleDialogExit = () => {
		dispatch({ type: "RESET" });
		setInputError([]);
		setServerError("");
	};

	return (
		<InviteDialogRenderer
			shouldDialogOpen={shouldDialogOpen}
			onDialogClose={onDialogClose}
			i18n={i18n}
			dialogState={dialogState}
			inputError={inputError}
			serverError={serverError}
			onFieldChange={handleDialogFieldChange}
			onSend={handleSendRequest}
			onDialogExited={handleDialogExit}
		/>
	);
};

export default InviteDialogContainer;
