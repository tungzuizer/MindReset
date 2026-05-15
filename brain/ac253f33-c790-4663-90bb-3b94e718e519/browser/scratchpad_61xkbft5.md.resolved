# Digital Detox Pet Testing

## Task Checklist
- [x] Open the application URL (http://127.0.0.1:8080/)
- [x] Navigate to the registration form
- [ ] Register a new account "testuser" with password "password"
- [ ] Verify success toast and switch to login form
- [ ] Log in with "testuser" / "password"
- [ ] Report results

## Findings
- Application opened successfully at http://127.0.0.1:8080/
- Navigation between Login and Registration forms works (via "Đăng ký ngay" and "Đăng nhập" links).
- Form inputs are functional and accept text.
- Browser validation (e.g., "required" attribute) is working, as evidenced by browser tooltips when submitting empty fields.
- **CRITICAL ISSUE:** The submit buttons ("Tạo Tài Khoản" for registration and "Đăng Nhập" for login) do NOT trigger any action when clicked or when Enter is pressed.
- No success toasts appear, no redirection occurs, and no error messages are shown.
- Console logs are consistently empty, suggesting that either the event listeners are not attached or they are failing silently without logging errors.
- Conclusion: The authentication flow is currently non-functional.
