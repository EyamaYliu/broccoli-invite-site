import { supportLanguages } from "./language-context";

const en: Record<string, string> = {
	"header-corp-name": "BROCCOLI & CO.",
	"dialog-confirmation-text-content":
		"You will be one of the first to experience Broccoli & Co. when we launch.",
	"switch-lang-button": "To Chinese",
	"home-page-main-title": "A better way to enjoy every day.",
	"home-page-sub-title": "Be the first to know when we launch.",
	"request-invite-button-content": "Request an invite",
	"confirm-request-dialog-title": "All done!",
	"footer-message": "Made with ♥ in Melbourne.",
	"footer-legal-claim-message": "© 2016 Broccoli & Co. ALL rights reserved.",
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
};

const zh: Record<string, string> = {
	"header-corp-name": "BROCCOLI & CO.",
	"dialog-confirmation-text-content":
		"在我们上线的时候，您将会是第一批体验Broccoli & Co.的用户。",
	"switch-lang-button": "切换英文",
	"home-page-main-title": "以更好的方式享受每一天。",
	"home-page-sub-title": "当我们上线时，请让我们第一时间告知您。",
	"request-invite-button-content": "申请邀请函",
	"confirm-request-dialog-title": "搞定了!",
	"footer-message": "在墨尔本，用 ♥ 制作。",
	"footer-legal-claim-message": "© 2016 Broccoli & Co. 保留所有权利。",
	"request-invite-dialog-title": "申请邀请函",
	"form-name-input-placeholder": "您的全名",
	"form-email-input-placeholder": "邮箱地址",
	"form-confirm-email-input-placeholder": "重复一次邮箱地址",
	"form-send-button-content": "发送",
	"form-pending-state-button-content": "正在发送，请稍等……",
	"form-confirm-button-content": "好的",
	"form-input-error-incomplete": "所有字段均为必填项。",
	"form-input-error-name-too-short": "全名需要超过 3 个字符",
	"form-input-error-email-format-invalid": "电子邮件格式无效。",
	"form-input-error-confirm-email-mismatch": "电子邮件不匹配。",
	"form-server-error-network": "网络出现问题， 请再试一次。",
	"form-server-error-default": "未知服务端错误.",
};

export const getI18nStrings = (
	language: supportLanguages
): Record<string, string> => {
	switch (language) {
		case supportLanguages.zh:
			return zh;
		default:
			return en;
	}
};
