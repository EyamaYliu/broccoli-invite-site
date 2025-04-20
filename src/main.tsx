import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./homePage";
import { LanguageProvider } from "./languageContext";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<LanguageProvider>
			<HomePage data-tid="app" />
		</LanguageProvider>
	</StrictMode>
);
