# SchnellPayy Integration Roadmap

### Phase 1: Foundation & API Infrastructure
*   **API Client Setup:** Create a centralized Axios or Fetch instance with base URL, request/response interceptors for JWT token handling, and error logging.
*   **Auth State Management:** Implement a `useAuth` hook and context to manage the logged-in user, session persistence (LocalStorage/SessionStorage), and protected routes.
*   **Environment Config:** Set up `.env` files for different environments (development, production).

### Phase 2: Authentication & Security
*   **Login & Register:** Connect `POST /auth/login` and `POST /auth/register`.
*   **Email Verification:** Integrate the OTP verification flow for new accounts.
*   **2FA (Two-Factor Authentication):** Implement the OTP validation for logins and the 2FA setup flow in the settings page.
*   **Password Recovery:** Connect Forgot/Reset password endpoints.

### Phase 3: User Profile & KYC
*   **Profile Management:** Integrate `GET /users/getMe` and `PATCH /users/updateMe` to populate the dashboard and settings.
*   **KYC Integration:** Connect the KYC upload form (`POST /kyc/submit`) and display the current status (`GET /kyc/status`).
*   **Notifications:** Implement the notifications panel using the `/notifications` endpoints.

### Phase 4: Wallet & Transactions
*   **Dashboard Overview:** Fetch balance and recent transactions (`GET /transactions/user`).
*   **Payment Methods:** CRUD operations for adding/removing cards and mobile wallets (`/payment-methods`).
*   **Deposit Funds:** Integrate the "Add Funds" flow using `POST /wallet/deposit/`.
*   **Transaction History:** Build the full transactions table with filtering and pagination.

### Phase 5: Bills & Services
*   **Provider Discovery:** Fetch and display bill categories and providers (`GET /bills/providers`).
*   **Bill Payment Flow:** Implement the bill payment form with PIN verification (`POST /bills/pay`).
*   **Bill History:** Display history specific to utilities and services.

### Phase 6: Admin Module (If applicable)
*   **User & KYC Management:** Connect admin-only endpoints for reviewing KYC submissions and managing user accounts.
*   **Service Management:** Integrate CRUD for bill providers and services.

### Phase 7: Polish & Validation
*   **Optimistic UI:** Add loading skeletons and optimistic updates for a smoother feel.
*   **Global Error Handling:** Ensure API errors (401, 403, 500) are handled gracefully via toasts or alerts.
*   **Security Audit:** Final check on token expiration and secure storage of sensitive data.
