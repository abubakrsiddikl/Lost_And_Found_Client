# Lost & Found Project

## Overview

The **Lost & Found Project** is a platform designed to help individuals connect with others who may have lost or found items. The application enables users to report lost items, browse found items, and interact with other users to recover belongings. This project emphasizes security, usability, and efficiency to streamline the process of retrieving lost possessions.

---

## Features

1. **User Authentication**:

   - Secure login and registration system using JWT tokens stored in HTTP-only cookies.
   - Protected routes for secure data access.

2. **Lost and Found Item Management**:

   - Submit reports for lost items with details like title, description, date, and location.
   - Browse a list of found items with a search feature to filter by title or location.

3. **Search Functionality**:

   - Search lost or found items by title or location using a dynamic search input.

4. **Status Management**:

   - Mark items as "Recovered" once they are returned to their owner.
   - Prevent duplicate recovery actions on already recovered items.

5. **Dynamic Layout**:

   - Toggle between a three-column card layout and a table layout for browsing recovered items.

6. **Responsive Design**:
   - Mobile-first design with responsive layouts using Tailwind CSS and Daisy UI.

---

## Technologies Used

### Frontend:

- **React.js**: Component-based library for building the user interface.
- **Axios**: For making API requests.
- **Tailwind CSS & Daisy UI & FlowBite**: For responsive and accessible styling.

---

### NPM Package:

- **React Hot Toast**: This NPM package use by beautiful alert.
- **Switee Aler**: This NPM package use by beautiful alert.

### Backend:

- **Node.js**: Runtime environment for server-side logic.
- **Express.js**: Framework for building the API.
- **MongoDB**: NoSQL database for storing item details and user data.
- **CORS**: For handling cross-origin requests securely.

### Authentication:

- **JWT (JSON Web Token)**: For user authentication.
- **HTTP-Only Cookies**: Secure storage for tokens.

### Project Live Link:

[Visit the Live Project](https://lost-and-found-web-8dbe0.web.app/)


[Alternative Link Live Project](https://lost-and-found-web-8dbe0.firebaseapp.com/)
