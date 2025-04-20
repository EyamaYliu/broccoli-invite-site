import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Typography,
	Divider,
	Container,
} from "@mui/material";
import { styles } from "../styles/requestInviteDialog.styles";

export interface IInviteDialogRendererProps {
	shouldDialogOpen: boolean;
	onDialogClose: () => void;
	i18n: Record<string, string>;
	dialogState: DialogState;
	inputError: string[];
	serverError: string;
	onFieldChange: (
		field: "name" | "email" | "confirmEmail",
		value: string
	) => void;
	onSend: () => void;
	onDialogExited: () => void;
}

export type DialogState = {
	name: string;
	email: string;
	confirmEmail: string;
	loading: boolean;
	success: boolean;
};

const InviteDialogRenderer: React.FC<IInviteDialogRendererProps> = (props) => {
	const {
		shouldDialogOpen,
		onDialogClose,
		i18n,
		dialogState,
		inputError,
		serverError,
		onFieldChange,
		onSend,
		onDialogExited,
	} = props;

	return (
		<Dialog
			id="request-invite-dialog-container"
			data-testid="request-invite-dialog-container"
			open={shouldDialogOpen}
			onClose={onDialogClose}
			slotProps={{
				transition: {
					onExited: onDialogExited,
				},
			}}
			aria-labelledby="request-invite-dialog-title"
		>
			<DialogTitle
				data-testid="request-invite-dialog-title"
				id="request-invite-dialog-title"
				sx={styles.dialogTitle}
				color="text.secondary"
			>
				{dialogState.success
					? i18n["confirm-request-dialog-title"]
					: i18n["request-invite-dialog-title"]}
			</DialogTitle>
			<Divider sx={styles.divider} />
			<DialogContent
				id="request-invite-dialog-content-wrapper"
				sx={styles.dialogContent}
			>
				{dialogState.success ? (
					<Container
						id="success-sent-invite-dialog-wrapper"
						data-testid="success-sent-invite-dialog-wrapper"
						aria-live="polite"
					>
						<Typography sx={styles.confirmationText}>
							{i18n["dialog-confirmation-text-content"]}
						</Typography>
					</Container>
				) : (
					<Container>
						<TextField
							id="request-invite-dialog-name-input"
							slotProps={{
								htmlInput: {
									"data-testid": "request-invite-dialog-name-input",
								},
							}}
							label={i18n["form-name-input-placeholder"]}
							fullWidth
							margin="normal"
							value={dialogState.name}
							onChange={(e) => onFieldChange("name", e.target.value)}
							aria-label={i18n["form-name-input-placeholder"]}
						/>
						<TextField
							id="request-invite-dialog-email-input"
							slotProps={{
								htmlInput: {
									"data-testid": "request-invite-dialog-email-input",
								},
							}}
							label={i18n["form-email-input-placeholder"]}
							fullWidth
							margin="normal"
							type="email"
							value={dialogState.email}
							onChange={(e) => onFieldChange("email", e.target.value)}
							aria-label={i18n["form-email-input-placeholder"]}
						/>
						<TextField
							id="request-invite-dialog-confirm-email-input"
							slotProps={{
								htmlInput: {
									"data-testid": "request-invite-dialog-confirm-email-input",
								},
							}}
							label={i18n["form-confirm-email-input-placeholder"]}
							fullWidth
							margin="normal"
							type="email"
							value={dialogState.confirmEmail}
							onChange={(e) => onFieldChange("confirmEmail", e.target.value)}
							aria-label={i18n["form-confirm-email-input-placeholder"]}
						/>
						{inputError &&
							inputError.map((i18nErrorKey, index) => (
								<Typography
									key={index}
									align="center"
									color="error"
									mt={1}
									role="alert"
									aria-live="assertive"
								>
									{i18n[i18nErrorKey]}
								</Typography>
							))}
					</Container>
				)}
			</DialogContent>
			<DialogActions sx={styles.dialogActionWrapper}>
				{dialogState.success ? (
					<Button
						variant="outlined"
						data-testid="form-confirm-button"
						onClick={onDialogClose}
						sx={{ ...styles.commonButtonStyle, ...styles.confirmInviteButton }}
						aria-label={i18n["form-confirm-button-content"]}
					>
						{i18n["form-confirm-button-content"]}
					</Button>
				) : (
					<Button
						variant="outlined"
						sx={{ ...styles.commonButtonStyle, ...styles.inviteButton }}
						onClick={onSend}
						disabled={dialogState.loading}
						data-testid="form-send-request-button"
						aria-label={
							dialogState.loading
								? i18n["form-pending-state-button-content"]
								: i18n["form-send-button-content"]
						}
					>
						{dialogState.loading
							? i18n["form-pending-state-button-content"]
							: i18n["form-send-button-content"]}
					</Button>
				)}
				{serverError && (
					<Typography align="center" color="error" mt={1} role="alert">
						{serverError}
					</Typography>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default InviteDialogRenderer;
