# CashPilot

**A Personal Finance Tracking Web-App**

> Keep an eye on your expenses and income with CashPilot’s intuitive dashboard and visual charts.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Screenshots](screenshots)
- [Contributing](#contributing)
- [Contact](#contact)

## Demo

- Live demo: [cashpilot-theta.vercel.app](https://cashpilot-theta.vercel.app)

## Features

- **Add Transactions**: Record income and expenses with amount, description, date, and category.
- **Category Management**: Predefined categories (e.g., Food, Travel, Bills) to organize transactions.
- **Visual Dashboard**: Interactive charts showing spending breakdown by category and trends over time.
- **Responsive Design**: Mobile-first UI built with Tailwind CSS.
- **Persistent Storage**: Data saved in browser’s local storage for offline access.

## Tech Stack

* **React** (v19)
* **Vite** for fast bundling and HMR
* **Tailwind CSS** for utility-first styling
* **Chart.js** & **React Chart.js 2** for data visualization
* **ESLint** + **Prettier** for code quality

## Getting Started

### Prerequisites
  * Node.js (v18+)
  * npm or yarn

### Installation
  ```
  # Clone the repo
  git clone https://github.com/sahibsiddiqui/CashPilot.git
  cd CashPilot
  
  # Install dependencies
  npm install
  or
  yarn install
  ```

### Development
  ```
  # Start the development server
  npm run dev
  or
  yarn dev
  
  # Open http://localhost:5173 in your browser
  ```

## Project Structure

  ```
  CashPilot/
  ├── public/             # Static assets and index.html
  ├── src/                # React application source code
  │   ├── components/     # Reusable UI components (Dashboard, TransactionForm, etc.)
  │   ├── hooks/          # Custom React hooks
  │   ├── utils/          # Utility functions (formatters, storage helpers)
  │   ├── App.jsx         # Root component
  │   └── main.jsx        # Entry point
  ├── .gitignore          # Ignored files
  ├── package.json        # Project metadata & scripts
  ├── tailwind.config.js  # Tailwind CSS configuration
  └── vite.config.js      # Vite configuration
  ```

## Usage

1. **Add a Transaction**: Click “Add Transaction”, fill in the form, and submit.
2. **View Dashboard**: Monitor spending categories and monthly trends.
3. **Edit & Delete**: Modify or remove transactions as needed.
4. **Data Persistence**: Transactions persist across sessions via local storage.

## Screenshots

- Below are some screenshots illustrating CashPilot in action.
  - [Dashboard](screenshots/dashboard.png) 
  - [Transactions](screenshots/transactions.png)
  - [Expense Chart](screenshots/expensechart.png)
## Contributing

- Contributions are welcome! Please follow these steps:
    1. Fork the project
    2. Create your feature branch (`git checkout -b feature/YourFeature`)
    3. Commit your changes (`git commit -m 'Add some feature'`)
    4. Push to the branch (`git push origin feature/YourFeature`)
    5. Open a Pull Request

- Please ensure code is formatted (Prettier) and linted (ESLint) before submitting.

## Project Link 

- [https://github.com/sahibsiddiqui/CashPilot](https://github.com/sahibsiddiqui/CashPilot)
