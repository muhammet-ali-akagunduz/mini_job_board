# Mini Job Board 🚀

A modern, full-stack Job Board application inspired by LinkedIn. It provides a comprehensive platform for connecting job seekers with employers, featuring role-based dashboards, job management, application tracking, and detailed user profiles.

## ✨ Features

### 👤 For Candidates
- **Browse & Search:** Search for jobs by keywords, company, or location. Filter by workplace type (Remote, Hybrid, On-site) and employment type.
- **Save Jobs:** Bookmark jobs to review or apply to later.
- **Apply to Jobs:** Submit applications to jobs and track their status (Pending, Accepted, Rejected).
- **Rich Profiles:** Build a comprehensive profile including an avatar, banner, headline, location, about section, experiences, educations, certifications, and skills.

### 🏢 For Employers
- **Job Management:** Post new job opportunities and manage active listings.
- **My Posts Dashboard:** A dedicated dashboard to view and quickly delete your own job postings.
- **Applicant Tracking:** View incoming applications for your jobs and seamlessly Accept or Reject candidates.
- **Company Profiles:** Maintain an employer profile to attract top talent.

### 🔒 Security
- **Role-Based Access Control:** Secure routes and endpoints tailored specifically for `CANDIDATE` and `EMPLOYER` roles.
- **JWT Authentication:** Stateless, secure authentication using JSON Web Tokens.

---

## 🛠️ Technology Stack

### Backend
- **Java 17+**
- **Spring Boot 3** (Web, Security, Data JPA, Validation)
- **MySQL Database** (Relational database management system)
- **Maven**

### Frontend
- **React 18** (Functional Components, Hooks)
- **Vite** (Next-generation frontend tooling)
- **React Router** (Client-side routing)
- **Vanilla CSS** (Custom modern styling, Glassmorphism elements)

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### 📋 Prerequisites

Before you begin, make sure you have the following installed:
- **Java JDK 17 or higher** (e.g., [Temurin by Adoptium](https://adoptium.net/))
- **MySQL Server** (Make sure it is running locally on port 3306)
- **Node.js** (v16.x or higher) and **npm** (comes with Node.js) (e.g., [Node.js Downloads](https://nodejs.org/))

---

### 🗄️ 0. Database Setup

This project uses MySQL database. Before running the backend, you must create a database named `minijobboard`:

#### 🍎 macOS (Using Homebrew)
1. Install MySQL (if not installed):
   ```bash
   brew install mysql
   ```
2. Start the MySQL service:
   ```bash
   brew services start mysql
   ```
3. Log in to MySQL:
   ```bash
   mysql -u root -p
   ```
4. Create the database:
   ```sql
   CREATE DATABASE minijobboard;
   ```

#### 🪟 Windows
1. Download and install [MySQL Installer](https://dev.mysql.com/downloads/installer/).
2. During setup, make sure to set the root password (recommended: `root` to match default properties).
3. Open **MySQL 8.0 Command Line Client** from the Start Menu.
4. Enter your root password.
5. Create the database:
   ```sql
   CREATE DATABASE minijobboard;
   ```
*(Alternatively, you can open **MySQL Workbench** or any GUI tool and run the SQL query: `CREATE DATABASE minijobboard;`)*

#### 🐧 Linux
1. Log in to your local MySQL server:
   ```bash
   mysql -u root -p
   ```
2. Create the database:
   ```sql
   CREATE DATABASE minijobboard;
   ```

---

Make sure the credentials in `backend/src/main/resources/application-dev.properties` match your local MySQL configuration (default username/password is `root`/`root`).

---

### ☕ 1. Running the Backend

The backend runs on an embedded Tomcat server and connects to your local MySQL database.

Choose the instructions matching your Operating System:

#### 🍎 macOS & 🐧 Linux
1. Open your terminal.
2. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
3. Make the Maven wrapper executable (if not already):
   ```bash
   chmod +x mvnw
   ```
4. Start the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

#### 🪟 Windows (Command Prompt or PowerShell)
1. Open **Command Prompt** (cmd) or **PowerShell**.
2. Navigate to the `backend` directory:
   ```cmd
   cd backend
   ```
3. Start the Spring Boot application:
   - **On Command Prompt (CMD):**
     ```cmd
     mvnw.cmd spring-boot:run
     ```
   - **On PowerShell:**
     ```powershell
     .\mvnw.cmd spring-boot:run
     ```

*The backend will start running and listening at `http://localhost:8081`*

---

### 💻 2. Running the Frontend

The frontend uses React and Vite. Open a **new** terminal window/tab to start the frontend development server.

Choose the instructions matching your Operating System:

#### 🍎 macOS & 🐧 Linux
1. Open a new terminal.
2. Navigate to the `frontEnd` directory:
   ```bash
   cd frontEnd
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

#### 🪟 Windows (Command Prompt or PowerShell)
1. Open a new **Command Prompt** or **PowerShell** window.
2. Navigate to the `frontEnd` directory:
   ```cmd
   cd frontEnd
   ```
3. Install the dependencies:
   ```cmd
   npm install
   ```
4. Start the Vite development server:
   ```cmd
   npm run dev
   ```

*The frontend development server will start and be available at `http://localhost:5173`*

---

## 📖 Usage Guide

1. Navigate to `http://localhost:5173` in your browser.
2. Click **Register** and create a new account. You can choose to be either a **Candidate** or an **Employer**.
3. **Employer Workflow:** Go to the "Post" tab to create a job. View your listings under "My Posts" and manage applications under "Applications".
4. **Candidate Workflow:** Go to the "Jobs" tab to search for jobs. Click "Easy Apply" to apply, or the bookmark icon to save a job. Track your application status in the "Applications" tab.
5. **Profile Customization:** Click on "Profile" in the navigation bar to update your personal information, add a profile picture, banner, and manage your resume details.

---

## 📄 License
This project is for educational purposes. Feel free to use and modify the code as needed!
