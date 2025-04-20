import React from "react";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { styles } from "./homepage.styles";
import { useLanguage } from "./languageContext";
import { getI18nStrings } from "./global.i18n";
import InviteDialogContainer from "./requestInviteDialog-container";

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
		<Container data-tid="container" disableGutters sx={styles.container}>
			<Box id="box" sx={styles.homePageContentBox}>
				<Container
					id="header-container"
					sx={styles.headerFooterContainer}
					maxWidth={false}
				>
					<HomepageHeader i18n={i18n} toggleLanguage={toggleLanguage} />
					<Divider />
				</Container>
				<HomepageMainContent i18n={i18n} />
				<Container
					id="footer-container"
					sx={styles.headerFooterContainer}
					maxWidth={false}
				>
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
		<Box id="main-content" sx={styles.mainContent}>
			<Typography variant="h3" fontWeight="bold" gutterBottom>
				{i18n["home-page-main-title"]}
			</Typography>
			<Typography variant="h6" sx={styles.secondTitle}>
				{i18n["home-page-sub-title"]}
			</Typography>
			<Button
				variant="outlined"
				size="large"
				sx={styles.button}
				onClick={openRequestDialog}
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
		<Box sx={styles.headerContent}>
			<Typography variant="h6" fontWeight="bold" color="text.secondary">
				BROCCOLI & CO.
			</Typography>
			<Button
				variant="outlined"
				size="small"
				sx={{ ...styles.switchLanguageButton }}
				onClick={toggleLanguage}
			>
				{i18n["switch-lang-button"]}
			</Button>
		</Box>
	);
};

const HomepageFooter: React.FC<ICommonInterface> = (props) => {
	const { i18n } = props;
	return (
		<Box sx={styles.footerContent}>
			<Typography variant="body2" fontStyle="italic" color="text.secondary">
				{i18n["footer-message"]}
			</Typography>
			<Typography variant="body2" fontStyle="italic" color="text.secondary">
				{i18n["footer-legal-claim-message"]}
			</Typography>
		</Box>
	);
};

export default HomePage;
