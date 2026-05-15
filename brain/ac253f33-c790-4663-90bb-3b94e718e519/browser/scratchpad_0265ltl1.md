# Debugging MindResst Login/Registration

## Plan
- [x] Open the app URL (Used http://127.0.0.1:8080 as file:// was blocked).
- [x] Check console for startup errors (Only favicon 404).
- [x] Attempt registration.
    - [x] Click "Đăng ký ngay".
    - [x] Input username and password.
    - [x] Click "Tạo Tài Khoản" (tried multiple times, including Enter key).
- [x] Observe console for errors during registration (No errors found).
- [x] Verify if the app hangs or displays any JS errors (App stays responsive but registration logic fails silently).
- [x] Report findings to the user.

## Findings
- `file:///` URLs are blocked, but `http://127.0.0.1:8080` is accessible.
- No JS errors on startup (only a 404 for favicon).
- Registration attempt (clicking "Tạo Tài Khoản") is completely unresponsive:
    - No console errors are triggered.
    - No network requests are visible (inferred from lack of response/errors).
    - No DOM changes or navigation occur.
    - The button is clickable but its associated logic seems missing or broken.
- The app does not "hang" in the sense of being frozen; you can still interact with the inputs and the "Đăng nhập" link works (navigates back). However, the core registration function is non-functional.
