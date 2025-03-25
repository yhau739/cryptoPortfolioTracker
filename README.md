# 🪙 Crypto Portfolio Tracker

Crypto Portfolio Tracker is a full-stack web application that allows users to track their cryptocurrency investments, manage transactions, and view real-time market prices. It is designed with performance and usability in mind, combining a clean frontend with a robust backend API and a SQL database.

---

## 🧱 Tech Stack

### 🖥 Frontend
- **React** + **TypeScript**
- **Tailwind CSS** for styling
- **Zod** + **React Hook Form** for validation
- **Sonner** for toast notifications
- **Binance Public API** for price data
- **ShadCN UI** component library

### 🛠 Backend
- **ASP.NET Core 8 Web API**
- **ADO.NET** for SQL communication
- **SQL Server** for data storage
- **Stored Procedures** for optimized database transactions
- **Session-based authentication** with distributed memory cache

---

## 🚀 Features

- 📈 View and manage crypto holdings
- ➕ Add buy/sell transactions
- 🌐 Fetch live prices from Binance (optional per transaction)
- 🧮 Calculate and display real-time Profit and Loss (PNL)
- 🔐 Session-based authentication
- ✅ Input validation on both frontend and backend
- 📊 Scalable database structure with stored procedures


---

## 🔐 Authentication

The application uses **session-based authentication** to manage user state securely.

### How it Works
- Upon login, the backend generates a **unique session ID** and maps it to the authenticated user.
- The frontend stores the session ID in `localStorage`.
- All authenticated requests include the session ID in the custom HTTP header:

  ```http
  X-Session-ID: <your-session-id>
  ```

- The backend checks this session ID against its in-memory cache (or future Redis store) to retrieve the user context.

---

## 🛣️ Roadmap

Here are the upcoming features and enhancements planned:

### 🔧 Backend
- [x] Add secure user registration and login
- [ ] Implement password hashing and salting
- [ ] Store sessions in Redis for production scalability
- [ ] Add API endpoints for:
  - [ ] Fetching portfolio summary
  - [ ] Calculating realized/unrealized PNL
  - [ ] Exporting transactions to CSV

### 💻 Frontend
- [ ] Holdings dashboard with charts and insights
- [ ] View transaction history with filtering and sorting
- [ ] Mobile responsive improvements
- [ ] PWA support for installable desktop/mobile experience
- [ ] Add chart view of price over time (using Recharts or Chart.js)

### 🧪 Dev Experience
- [ ] Add unit/integration tests
- [ ] Add CI/CD GitHub Actions workflow
- [ ] Dockerize backend for containerized deployment

---


