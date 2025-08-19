# Social Media Platform

A simple social media web application built with React (frontend) and Node.js/Express (backend).

---

## Features

- User registration & login
- Protected routes (profile, feed, friends, messaging, create post)
- Persistent login (localStorage)
- Simple, clean UI with basic CSS
- Easy logout functionality

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/social-media-platform.git
cd social-media-platform
```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ../client
npm install
```

### 3. Start the Backend Server

```bash
cd server
npm run dev
```
_Backend runs on `http://localhost:5000`_

### 4. Start the Frontend Development Server

```bash
cd ../client
npm run dev
```
_Frontend runs on `http://localhost:5173` or similar, check your terminal output._

---

## Usage

1. **Open your browser** and go to [http://localhost:5173](http://localhost:5173)
2. **Register a new user** or **login** with existing credentials.
3. After login, navigate via the links (`Feed`, `Profile`, `Friends`, etc.).
4. **Logout** using the Logout button in the navigation bar.

---

## Project Structure

```
social-media-platform/
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── Form.css
│   │   └── pages/
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       ├── Feed.jsx
│   │       ├── Profile.jsx
│   │       ├── Friends.jsx
│   │       ├── Messaging.jsx
│   │       └── CreatePost.jsx
│   └── ...
├── server/
│   ├── app.js
│   └── ...
└── README.md
```

---

## Environment Variables

- The provided code uses default ports and does not require custom environment variables for basic running.
- If you wish to connect to a database or add more features, update your backend's configuration as needed.

---

## Troubleshooting

- **Blank Page:** Make sure both frontend and backend servers are running.
- **CSS Not Loading:** Ensure `App.css` and `Form.css` are in the correct directories and imported properly.
- **Login/Register Errors:** Check that the backend is running on port 5000 and accessible from your frontend.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)
