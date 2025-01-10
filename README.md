# Expense Tracker Application

## Overview
The **Expense Tracker Application** is a robust web-based tool that allows users to manage their personal finances effectively. With this application, users can add income, expenses, and categories, as well as update and delete them. It features a savings goal tracker and visualizes income and expense data for a selected date range in the form of a pie chart.

## Features
- **Income Management**: Add, update, and delete income entries.
- **Expense Management**: Add, update, and delete expense entries.
- **Category Management**: Organize your expenses and income under customizable categories.
- **Savings Goal**: Set a target savings amount and track progress.
- **Data Visualization**: View a breakdown of income and expenses for a specific date range in a pie chart.
- **Filtering by Date Range**: Analyze financial data for a desired duration.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Libraries/Tools**: React Query, Chart.js

## Setup Instructions
Follow these steps to set up and run the application locally:

### Prerequisites
- Node.js installed (version 16.x or higher)
- MongoDB installed and running
- Git installed

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/FinTrack.git
   ```

2. Install dependencies:
   ```bash
   cd FinTrack
   cd backend
   npm install
   cd ..
   cd client
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     PORT=8000 || your port
     MONGO_URI=<your-mongodb-connection-string>
     ```

4. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

5. Start the frontend development server:
   ```bash
   cd frontend
   nodemon app.js
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## Application Workflow

### Adding Income/Expense
1. Navigate to the relevant section on the dashboard.
2. Fill out the form with details such as type, amount, category, and date.
3. Submit the form to add the entry.

### Updating Income/Expense/Category
1. Locate the entry in the list.
2. Click the edit icon to open the update form.
3. Modify the details and save changes.

### Deleting Income/Expense/Category
1. Locate the entry in the list.
2. Click the delete icon to remove the entry.

### Setting a Saving Goal
1. Navigate to the Savings Goal section.
2. Enter the target amount and the target end date.
3. Save the goal to start tracking progress.

### Viewing Data in Pie Chart
1. Use the filters to select a date range.
2. View the breakdown of income and expenses in a pie chart format.

## Assumptions
- The application assumes that all dates and monetary values are entered accurately.
- The savings goal is tracked based on the difference between total income and total expenses.

## Testing

### Sample Test Cases
1. **Add Income**: Ensure that an income entry is created and appears in the list.
2. **Add Expense**: Verify that an expense entry is created and appears in the list.
3. **Set Savings Goal**: Confirm that the savings goal is saved and displayed correctly.
4. **Update Entry**: Verify that editing an income or expense updates the details.
5. **Delete Entry**: Confirm that deleting an income or expense removes it from the list.
6. **Filter by Date**: Check that income and expense data are correctly filtered by the selected date range.

### Running Tests
1. Install testing dependencies:
   ```bash
   npm install --save-dev jest react-testing-library
   ```

2. Run tests:
   ```bash
   npm test
   ```

## Commit Messages
Use clear and concise commit messages. Examples:
- `Added functionality to add income`
- `Implemented savings goal tracker`
- `Fixed bug in date filtering`

Thank you for using the Expense Tracker Application!

