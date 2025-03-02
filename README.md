<div align="center" ">
<img src="/public/assets/images/logo.svg" style="margin: 20px 0 0 20px;">

</div>

[//]: # (insert image here)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Usage](#usage)
- [License](#license)

---

## Overview

Snapgram is a modern social media application inspired by Instagram, designed to provide users with a seamless platform
for sharing photos and connecting with others.

![Snapgram Logo](./public/assets/images/Screenshot160604.png)

---

## Features

* User authentication and authorization
* Photo uploads with captions
* Like and comment on posts
* Follow and unfollow users
* Real-time notifications
* Search for users and posts
* Change profile information
* Send and receive messages

---

## Technologies Used

* React.js
* TypeScript
* Tailwind CSS
* Redux or Context API for state management
* React Router for navigation
* Vite for build tooling
* Axios for HTTP requests

---


##  Project Structure

```sh
└── src/
    ├── _auth
    │   ├── AuthLayout.tsx
    │   └── forms
    ├── _root
    │   ├── pages
    │   └── RootLayout.tsx
    ├── App.tsx
    ├── components
    │   ├── forms
    │   ├── message
    │   ├── profile
    │   ├── shared
    │   └── ui
    ├── constants
    │   └── index.ts
    ├── context
    │   ├── AuthContext.tsx
    │   └── SocketContext.tsx
    ├── globals.css
    ├── hooks
    │   ├── useCommentNode.ts
    │   └── useDebounce.ts
    ├── main.tsx
    ├── model
    │   ├── request.ts
    │   └── type.ts
    ├── redux
    │   ├── messageSlice.ts
    │   ├── postSlice.ts
    │   ├── store.ts
    │   └── timelineSlice.ts
    ├── route
    │   └── index.ts
    ├── services
    │   ├── auth.ts
    │   ├── cloudinary.ts
    │   ├── comment.ts
    │   ├── face.ts
    │   ├── follow.ts
    │   ├── message.ts
    │   ├── notification.ts
    │   ├── post.ts
    │   ├── savePost.ts
    │   ├── search.ts
    │   ├── timeline.ts
    │   ├── token.ts
    │   ├── uploadFiles.ts
    │   └── user.ts
    ├── utils
    │   ├── common.ts
    │   ├── dateUtil.ts
    │   ├── httpRequest.ts
    │   └── linkUtil.ts
    ├── validation
    │   └── index.ts
    └── vite-env.d.ts
```



---

## Getting Started

### Prerequisites

Before getting started with src, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript

### Usage

Run src using the following command:

1. Clone the repository:
    ```sh
    git clone https://github.com/Gilgamesh-hoang/Snapgram-frontend.git
    ```
2. Navigate to the project directory:
    ```sh
    cd Snapgram-frontend
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

4. Change the environment variables in the `.env` file:
    ```sh
    VITE_REACT_APP_GOOGLE_CLIENT_ID=
   VITE_REACT_APP_CLOUDINARY_URL=
   VITE_REACT_APP_CLOUDINARY_URL_RESPONSE=
   VITE_REACT_APP_SOCKET_SERVER_URL=
   VITE_REACT_APP_SERVER_URL=
    ```

5. Start the development server:
    ```sh
    npm run dev
    ```

---

## License

This project is protected under the MIT License.

---
