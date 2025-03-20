```markdown
# CineLove

CineLove is a web application designed to bring couples closer together by providing a synchronized movie-watching experience, no matter the distance between them. With a romantic theme, real-time video playback synchronization, and an integrated chat feature, CineLove recreates the intimacy of a shared movie night. Whether you're in a long-distance relationship or simply apart for the evening, CineLove makes every movie night special.

## Table of Contents

- [Features](#features)
- [Target Audience](#target-audience)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Testing](#testing)
- [Security](#security)
- [Performance Optimization](#performance-optimization)
- [Accessibility](#accessibility)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Synchronized Video Playback:** Watch movies together with real-time synchronization using Socket.IO.
- **Romantic User Interface:** A visually appealing design with heart-themed elements and soft color palettes.
- **Real-Time Chat:** Chat with your partner during the movie, complete with emoji support.
- **Room Creation & Joining:** Create private rooms with unique IDs or join existing ones.
- **Google Authentication:** Secure sign-in via Firebase Authentication with Google OAuth 2.0.
- **Responsive Design:** Works seamlessly across desktop and mobile devices.
- **Host Controls:** Mute or kick participants (host-only features).
- **Error Handling:** User-friendly error messages and robust backend validation.

## Target Audience

Couples in long-distance relationships or those who want to enjoy a movie night together, even when physically apart.

## Technology Stack

### Frontend

- **React:** Component-based JavaScript library for building the UI.
- **React Router:** Client-side routing and navigation.
- **react-player:** Video playback with synchronization support.
- **Tailwind CSS:** Utility-first CSS framework for rapid, consistent styling.
- **Context API:** Global state management (authentication, room info).
- **copy-to-clipboard:** For copying room IDs.
- **emoji-mart:** Emoji picker for chat.

### Backend

- **Node.js:** JavaScript runtime for the server.
- **Express.js:** Framework for RESTful APIs.
- **Socket.IO:** Real-time bidirectional communication for video sync and chat.
- **MongoDB:** NoSQL database for room data and chat history.
- **Mongoose:** ODM for MongoDB to model application data.

### Authentication

- **Firebase Authentication:** Secure Google OAuth 2.0 integration.

### Deployment

- **Vercel:** Platform for hosting frontend and serverless functions.
- **Custom Domain:** e.g., www.cinelove.app (purchased separately).

## Project Structure

```
cinelove/
├── .env.example                # Example environment variables
├── .gitignore                 # Git ignore file
├── package.json               # Project metadata and dependencies
├── README.md                  # This file
├── public/                    # Static assets
│   ├── favicon.ico            # Website favicon
│   ├── index.html             # Main HTML file
│   ├── manifest.json          # Web app manifest
│   ├── robots.txt             # Web crawler instructions
│   └── assets/                # Static assets (images, SVGs)
│       ├── logo.svg           # Heart-shaped film reel logo
│       └── background.jpg     # Blurred couple silhouette
├── src/                       # Frontend source code
│   ├── components/            # Reusable React components
│   ├── contexts/              # Context API for state management
│   ├── hooks/                 # Custom React hooks
│   ├── pages/                 # Page components
│   ├── services/              # API and external service logic
│   ├── utils/                 # Helper functions and utilities
│   ├── App.jsx                # Main app component
│   ├── index.jsx              # React entry point
│   └── index.css              # Global styles with Tailwind
├── server/                    # Backend source code
│   ├── models/                # Mongoose schemas
│   ├── routes/                # Express.js routes
│   ├── services/              # Socket.IO and logging services
│   ├── controllers/           # Route handlers
│   ├── middleware/            # Authentication and rate-limiting
│   ├── utils/                 # Backend utilities
│   ├── .env                   # Environment variables (secret)
│   ├── server.js              # Main server file
│   └── package.json           # Server dependencies
├── __tests__/                 # Test suite
│   ├── unit/                  # Unit tests
│   ├── integration/           # Integration tests
│   └── e2e/                   # End-to-end tests
└── tailwind.config.js         # Tailwind CSS configuration
```

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)
- Firebase Project (for authentication)
- Vercel CLI (optional, for deployment)

### Steps

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/sauravDS/CineLove.git
    cd cinelove
    ```

2.  **Install Frontend Dependencies**

    ```bash
    npm install
    ```

3.  **Install Backend Dependencies**

    ```bash
    cd server
    npm install
    cd ..
    ```

4.  **Set Up Environment Variables**

    Copy `.env.example` to `.env` in the root directory and fill in the values:

    ```
    # Frontend
    REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=your-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
    REACT_APP_FIREBASE_APP_ID=your-app-id

    # Backend (in server/.env)
    PORT=5000
    MONGO_URI=your-mongodb-connection-string
    NODE_ENV=development
    ```

    Replace placeholders with your Firebase and MongoDB credentials.

5.  **Run the Development Server**

    Frontend:

    ```bash
    npm start
    ```

    Runs at http://localhost:3000.

    Backend:

    ```bash
    cd server
    npm start
    ```

    Runs at http://localhost:5000.

## Usage

1.  **Sign In:** Visit the homepage and sign in with Google.
2.  **Dashboard:** Create a new room or join an existing one.
3.  **Create Room:** Paste a public video URL (YouTube, Vimeo, etc.) and share the Room ID.
4.  **Join Room:** Enter a Room ID to join a movie night.
5.  **Watch Room:** Enjoy synchronized playback and chat with your partner.

## Deployment

### Vercel Setup

1.  **Install Vercel CLI:**

    ```bash
    npm install -g vercel
    ```

2.  **Deploy:**

    ```bash
    vercel
    ```

    Follow prompts to link your project and configure environment variables.

### Custom Domain

1.  Purchase a domain (e.g., via Namecheap or GoDaddy).
2.  Configure DNS settings in Vercel to point to your deployment.

### CI/CD

Connect your Git repository (GitHub/GitLab/Bitbucket) to Vercel for automatic deployments on push.

## Testing

- **Unit Tests:** Run with Jest and React Testing Library:

  ```bash
  npm test
  ```

- **Integration Tests:** Test frontend-backend interactions.

- **End-to-End Tests:** Use Cypress or Playwright:

  ```bash
  npm run e2e
  ```

- **Manual Testing:** Test across browsers (Chrome, Firefox, Safari) and devices.

## Security

- **Authentication:** Firebase Google OAuth 2.0.
- **Authorization:** Server-side checks for host-only actions.
- **Input Sanitization:** Use `dompurify` to prevent XSS.
- **HTTPS:** Enforced for all communication.
- **Rate Limiting:** Applied to API endpoints with `express-rate-limit`.
- **Dependency Updates:** Regularly audit with `npm audit`.

## Performance Optimization

- **Minimize Requests:** Bundled JS/CSS with Webpack.
- **Image Optimization:** WebP format, lazy loading.
- **Code Splitting:** `React.lazy` and `Suspense`.
- **Caching:** Browser caching via HTTP headers.

## Accessibility

- **WCAG Compliance:** Semantic HTML, ARIA attributes, sufficient color contrast.
- **Keyboard Navigation:** Fully operable via keyboard.
- **Screen Readers:** Tested with NVDA, VoiceOver, and JAWS.

## Future Enhancements

- Private rooms with password protection.
- Video queue for multiple movies.
- User profiles with customization options.
- Video chat integration via WebRTC.
- Theme customization and scheduled movie nights.

## Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/your-feature`).
3.  Commit changes (`git commit -m "Add your feature"`).
4.  Push to the branch (`git push origin feature/your-feature`).
5.  Open a pull request.

Please follow the code style and include tests for new features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Happy coding, and enjoy building CineLove for your special someone! If you have questions, feel free to open an issue or contact me at saurav_ds@pm.me