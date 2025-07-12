# Scheduler Website

A React.js application for managing scheduled posts with a beautiful calendar interface.

## Features

- **User Authentication**: Sign up and login functionality
- **Calendar View**: Interactive calendar showing scheduled posts
- **Post Management**: Approve or cancel scheduled posts with tick/cross buttons
- **Responsive Design**: Modern UI that works on all devices
- **Dummy Data**: Pre-loaded sample data for demonstration

## Flow

1. **Signup/Login** → User authentication
2. **Home Page** → Welcome page with scheduler button
3. **Scheduler Page** → Calendar view with scheduled items management

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd scheduler_website
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

### Authentication
- **Signup**: Create a new account with name, email, and password
- **Login**: Use any email/password combination (demo mode)
- **Logout**: Click the logout button in the navigation

### Scheduler Features
- **Calendar Navigation**: Click on dates to view scheduled posts
- **Post Indicators**: Calendar shows the number of posts on each date
- **Approve Posts**: Click the ✅ button to approve pending posts
- **Cancel Posts**: Click the ❌ button to cancel pending posts
- **Status Tracking**: Posts show as Pending, Approved, or Cancelled

### Dummy Data
The application includes sample scheduled posts for December 2024:
- Weekly Product Update (Dec 15, 10:00 AM)
- Holiday Promotion Campaign (Dec 20, 2:30 PM)
- Customer Success Story (Dec 18, 9:00 AM)
- Industry Insights Blog (Dec 22, 4:00 PM)
- Team Behind the Scenes (Dec 25, 11:00 AM)

## Project Structure

```
src/
├── components/
│   ├── Home.js          # Home page component
│   ├── Login.js         # Login form component
│   ├── Signup.js        # Signup form component
│   ├── Scheduler.js     # Main scheduler component
│   └── Navbar.js        # Navigation component
├── App.js               # Main app component with routing
├── index.js             # Application entry point
└── index.css            # Global styles
```

## Technologies Used

- **React.js** - Frontend framework
- **React Router** - Navigation and routing
- **React Calendar** - Calendar component
- **date-fns** - Date formatting utilities
- **CSS3** - Styling and responsive design

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## Customization

### Adding Real Data
Replace the dummy data in `src/components/Scheduler.js` with API calls to your backend:

```javascript
// Replace this:
const dummyScheduledItems = [...];

// With API calls:
useEffect(() => {
  fetch('/api/scheduled-posts')
    .then(response => response.json())
    .then(data => setScheduledItems(data));
}, []);
```

### Styling
Modify the CSS files to match your brand colors and design preferences:
- `src/index.css` - Global styles
- `src/App.css` - App-specific styles

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the [MIT License](LICENSE). 