# Firebase Chat App

## Introduction

This project is a chat application that utilizes Firebase for user authentication and message storage. It consists of three main parts:

1. **User Registration & Login with Firebase Authentication**
2. **Storing Messages in Firestore**
3. **Google Authentication (Optional)**

---

## Requirements

- A [Firebase](https://firebase.google.com/) account
- Node.js installed on your system
- `npm` or `yarn` package manager

---

## Firebase Setup

1. Create a new project in [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firebase Authentication**.
3. Enable **Cloud Firestore** to store messages.
4. Get your Firebase project settings from **Project Settings > General > Your apps**.
5. Create a `.env` file in the project root and add your Firebase configuration:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

---

## Installation & Running

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the application:
   ```bash
   npm start
   ```

---

## Features

- **User Registration & Authentication** using Firebase
- **Message Storage** in Firestore
- **Chat Page Protection** (accessible only when logged in)
- **Google Authentication Support** (optional)

---

## File Structure

- `src/components/Login.js` → Login component
- `src/components/Chat.js` → Chat component
- `src/firebase.js` → Firebase configuration

---

## Future Enhancements

- Support for additional authentication providers (Facebook, GitHub, etc.)
- Adding image and file sharing capabilities
- UI improvements using Material-UI

---

## Contribution

Feel free to contribute by submitting a **Pull Request** or opening an **Issue** on GitHub.

---

### Happy Coding! 🚀
