import React from "react";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { styles } from "./styles/homepage.styles";
import { useLanguage } from "./utils/language-context";
import { getI18nStrings } from "./utils/i18n";
import InviteDialogContainer from "./component-invite-dialog/requestInviteDialog-container";

interface ICommonInterface {
	i18n: Record<string, string>;
}

interface IHeader extends ICommonInterface {
	toggleLanguage: () => void;
}

const HomePage: React.FC = () => {
	const { toggleLanguage, language } = useLanguage();
	const i18n = getI18nStrings(language);

	return (
		<Container
			data-tid="homepage-wrapper"
			disableGutters
			sx={styles.container}
			role="main"
		>
			<Box id="box" sx={styles.homePageContentBox}>
				<Container id="header-wrapper" maxWidth={false} component="header">
					<HomepageHeader i18n={i18n} toggleLanguage={toggleLanguage} />
					<Divider />
				</Container>
				<HomepageMainContent i18n={i18n} />
				<Container id="footer-container" maxWidth={false} component="footer">
					<Divider />
					<HomepageFooter i18n={i18n} />
				</Container>
			</Box>
		</Container>
	);
};

const HomepageMainContent: React.FC<ICommonInterface> = (props) => {
	const { i18n } = props;
	const [isDialogOpen, setShouldDialogOpen] = React.useState(false);

	const inviteDialogOnClose = () => setShouldDialogOpen(false);
	const openRequestDialog = () => setShouldDialogOpen(true);

	return (
		<Box
			id="main-content"
			sx={styles.mainContent}
			data-testid="homepage-main-content-container"
		>
			<Typography
				variant="h3"
				fontWeight="bold"
				gutterBottom
				data-testid="home-page-main-title"
			>
				{i18n["home-page-main-title"]}
			</Typography>
			<Typography
				variant="h6"
				sx={styles.secondTitle}
				data-testid="home-page-sub-title"
			>
				{i18n["home-page-sub-title"]}
			</Typography>
			<Button
				variant="outlined"
				size="large"
				sx={styles.button}
				onClick={openRequestDialog}
				data-testid="request-invite-button"
				aria-label={i18n["request-invite-button-content"]}
			>
				{i18n["request-invite-button-content"]}
			</Button>
			<InviteDialogContainer
				shouldDialogOpen={isDialogOpen}
				onDialogClose={inviteDialogOnClose}
				i18n={i18n}
			/>
		</Box>
	);
};

const HomepageHeader: React.FC<IHeader> = (props) => {
	const { toggleLanguage, i18n } = props;
	return (
		<Box sx={styles.headerContent} data-testid="homepage-header-container">
			<Typography
				variant="h6"
				fontWeight="bold"
				color="text.secondary"
				data-testid="header-corp-name"
			>
				{i18n["header-corp-name"]}
			</Typography>
			<Button
				variant="text"
				size="small"
				sx={{ ...styles.switchLanguageButton }}
				onClick={toggleLanguage}
				data-testid="switch-lang-button"
				aria-label={i18n["switch-lang-button"]}
			>
				{i18n["switch-lang-button"]}
			</Button>
		</Box>
	);
};

const HomepageFooter: React.FC<ICommonInterface> = (props) => {
	const { i18n } = props;
	return (
		<Box sx={styles.footerContent} data-testid="homepage-footer-container">
			<Typography
				variant="body2"
				fontStyle="italic"
				color="text.secondary"
				data-testid="footer-message"
			>
				{i18n["footer-message"]}
			</Typography>
			<Typography
				variant="body2"
				fontStyle="italic"
				color="text.secondary"
				data-testid="footer-legal-claim-message"
			>
				{i18n["footer-legal-claim-message"]}
			</Typography>
		</Box>
	);
};

export default HomePage;
