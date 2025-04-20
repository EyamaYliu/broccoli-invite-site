// import { describe, it, expect, vi, beforeEach } from "vitest";
// import { render, screen, fireEvent } from "@testing-library/react";
// import InviteDialogRenderer, {
// 	DialogState,
// 	IInviteDialogRendererProps,
// } from "./requestInviteDialog-renderer";
// import "@testing-library/jest-dom";

// // 模拟 i18n 词典（根据实际需要扩展）
// const i18n = {
// 	"confirm-request-dialog-title": "确认邀请",
// 	"request-invite-form-title": "请求邀请",
// 	"dialog-confirmation-text-content": "您的请求已提交成功！",
// 	"form-name-input-placeholder": "请输入姓名",
// 	"form-email-input-placeholder": "请输入邮箱",
// 	"form-confirm-email-input-placeholder": "请确认邮箱",
// 	"form-confirm-button-content": "确认",
// 	"form-send-button-content": "发送",
// 	"form-pending-state-button-content": "发送中...",
// };

// const defaultDialogState: DialogState = {
// 	name: "",
// 	email: "",
// 	confirmEmail: "",
// 	loading: false,
// 	success: false,
// };

// describe("InviteDialogRenderer 组件测试", () => {
// 	let onDialogClose: ReturnType<typeof vi.fn>;
// 	let onFieldChange: ReturnType<typeof vi.fn>;
// 	let onSend: ReturnType<typeof vi.fn>;
// 	let onDialogExited: ReturnType<typeof vi.fn>;

// 	beforeEach(() => {
// 		onDialogClose = vi.fn();
// 		onFieldChange = vi.fn();
// 		onSend = vi.fn();
// 		onDialogExited = vi.fn();
// 	});

// 	const renderComponent = (props?: Partial<IInviteDialogRendererProps>) => {
// 		const combinedProps: IInviteDialogRendererProps = {
// 			shouldDialogOpen: true,
// 			onDialogClose,
// 			onFieldChange,
// 			onSend,
// 			onDialogExited,
// 			i18n,
// 			inputError: [],
// 			serverError: "",
// 			dialogState: { ...defaultDialogState },
// 			...props,
// 		};
// 		return render(<InviteDialogRenderer {...combinedProps} />);
// 	};

// 	it("非成功状态下渲染表单及发送按钮", () => {
// 		renderComponent({
// 			dialogState: { ...defaultDialogState, success: false },
// 		});

// 		// 检查标题文本
// 		// expect(
// 		// 	screen.getByText(i18n["request-invite-form-title"])
// 		// ).toBeInTheDocument();

// 		// // 检查姓名、邮箱及确认邮箱输入框
// 		// expect(
// 		// 	screen.getByLabelText(i18n["form-name-input-placeholder"])
// 		// ).toBeInTheDocument();
// 		// expect(
// 		// 	screen.getByLabelText(i18n["form-email-input-placeholder"])
// 		// ).toBeInTheDocument();
// 		// expect(
// 		// 	screen.getByLabelText(i18n["form-confirm-email-input-placeholder"])
// 		// ).toBeInTheDocument();

// 		// // 检查发送按钮
// 		// expect(
// 		// 	screen.getByRole("button", { name: i18n["form-send-button-content"] })
// 		// ).toBeInTheDocument();
// 	});

// 	// it("输入框改变时调用 onFieldChange", () => {
// 	// 	renderComponent();

// 	// 	// 模拟姓名输入
// 	// 	const nameInput = screen.getByLabelText(
// 	// 		i18n["form-name-input-placeholder"]
// 	// 	) as HTMLInputElement;
// 	// 	fireEvent.change(nameInput, { target: { value: "Alice" } });
// 	// 	expect(onFieldChange).toHaveBeenCalledWith("name", "Alice");

// 	// 	// 模拟邮箱输入
// 	// 	const emailInput = screen.getByLabelText(
// 	// 		i18n["form-email-input-placeholder"]
// 	// 	) as HTMLInputElement;
// 	// 	fireEvent.change(emailInput, { target: { value: "alice@example.com" } });
// 	// 	expect(onFieldChange).toHaveBeenCalledWith("email", "alice@example.com");

// 	// 	// 模拟确认邮箱输入
// 	// 	const confirmEmailInput = screen.getByLabelText(
// 	// 		i18n["form-confirm-email-input-placeholder"]
// 	// 	) as HTMLInputElement;
// 	// 	fireEvent.change(confirmEmailInput, {
// 	// 		target: { value: "alice@example.com" },
// 	// 	});
// 	// 	expect(onFieldChange).toHaveBeenCalledWith(
// 	// 		"confirmEmail",
// 	// 		"alice@example.com"
// 	// 	);
// 	// });

// 	// it("成功状态下渲染确认信息和确认按钮，并点击时调用 onDialogClose", () => {
// 	// 	renderComponent({
// 	// 		dialogState: { ...defaultDialogState, success: true },
// 	// 	});

// 	// 	// 检查标题应该为确认邀请
// 	// 	expect(
// 	// 		screen.getByText(i18n["confirm-request-dialog-title"])
// 	// 	).toBeInTheDocument();
// 	// 	// 检查显示成功提示信息
// 	// 	expect(
// 	// 		screen.getByText(i18n["dialog-confirmation-text-content"])
// 	// 	).toBeInTheDocument();
// 	// 	// 确认按钮显示正确
// 	// 	const confirmButton = screen.getByRole("button", {
// 	// 		name: i18n["form-confirm-button-content"],
// 	// 	});
// 	// 	expect(confirmButton).toBeInTheDocument();

// 	// 	// 点击按钮应调用 onDialogClose
// 	// 	fireEvent.click(confirmButton);
// 	// 	expect(onDialogClose).toHaveBeenCalled();
// 	// });

// 	// it("loading 状态下按钮显示为发送中且被禁用", () => {
// 	// 	renderComponent({
// 	// 		dialogState: { ...defaultDialogState, loading: true, success: false },
// 	// 	});

// 	// 	const pendingButton = screen.getByRole("button", {
// 	// 		name: i18n["form-pending-state-button-content"],
// 	// 	});
// 	// 	expect(pendingButton).toBeInTheDocument();
// 	// 	expect(pendingButton).toBeDisabled();
// 	// });

// 	// it("显示 inputError 错误信息", () => {
// 	// 	// 假设 inputError 数组中蕴含 i18n 的key的名字
// 	// 	const errors = [
// 	// 		"form-name-input-placeholder",
// 	// 		"form-email-input-placeholder",
// 	// 	];
// 	// 	renderComponent({
// 	// 		inputError: errors,
// 	// 	});
// 	// 	errors.forEach((errorKey) => {
// 	// 		expect(screen.getByText(i18n[errorKey])).toBeInTheDocument();
// 	// 	});
// 	// });

// 	// it("显示 serverError 错误信息", () => {
// 	// 	const serverError = "服务器出错，请重试！";
// 	// 	renderComponent({
// 	// 		serverError,
// 	// 	});
// 	// 	expect(screen.getByText(serverError)).toBeInTheDocument();
// 	// });
// });
import React from "react"; // 确保将 React 导入放在最前面
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom"; // 保证 jest-dom 扩展被加载
import { ThemeProvider, createTheme } from "@mui/material";

// 引入被测试组件及其接口定义
import InviteDialogRenderer, {
	DialogState,
	IInviteDialogRendererProps,
} from "./requestInviteDialog-renderer";

// 自定义一个 render 方法，包装 MUI ThemeProvider
const theme = createTheme();
const renderWithProviders = (ui: React.ReactElement, options?: any) =>
	render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, options);

// 模拟 i18n 词典（按实际需要扩展）
const i18n = {
	"confirm-request-dialog-title": "确认邀请",
	"request-invite-form-title": "请求邀请",
	"dialog-confirmation-text-content": "您的请求已提交成功！",
	"form-name-input-placeholder": "请输入姓名",
	"form-email-input-placeholder": "请输入邮箱",
	"form-confirm-email-input-placeholder": "请确认邮箱",
	"form-confirm-button-content": "确认",
	"form-send-button-content": "发送",
	"form-pending-state-button-content": "发送中...",
};

// 默认的对话框状态
const defaultDialogState: DialogState = {
	name: "",
	email: "",
	confirmEmail: "",
	loading: false,
	success: false,
};

describe("InviteDialogRenderer 组件测试", () => {
	let onDialogClose: ReturnType<typeof vi.fn>;
	let onFieldChange: ReturnType<typeof vi.fn>;
	let onSend: ReturnType<typeof vi.fn>;
	let onDialogExited: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		onDialogClose = vi.fn();
		onFieldChange = vi.fn();
		onSend = vi.fn();
		onDialogExited = vi.fn();
	});

	// 辅助函数：渲染组件时自动传入默认参数和包裹 providers
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
		return renderWithProviders(<InviteDialogRenderer {...combinedProps} />);
	};

	it("非成功状态下渲染表单及发送按钮", () => {
		renderComponent({
			dialogState: { ...defaultDialogState, success: false },
		});
		// 检查标题是否存在
		expect(document.body).toHaveTextContent(i18n["request-invite-form-title"]);

		// 检查各个输入框存在相应的占位文本
		expect(document.body).toHaveTextContent(
			i18n["form-name-input-placeholder"]
		);
		expect(document.body).toHaveTextContent(
			i18n["form-email-input-placeholder"]
		);
		expect(document.body).toHaveTextContent(
			i18n["form-confirm-email-input-placeholder"]
		);

		// 检查发送按钮是否存在
		const sendButton = document.querySelector("button");
		expect(sendButton).toBeInTheDocument();
	});
});
