# Dynamic Dashboard

A dynamic dashboard application built with Next.js, React, and Ant Design that allows users to draw polygons on a map, retrieve real-time weather data for those areas, and apply coloring rules based on the data.

---

### Setup and Run Instructions

Follow these steps to get the application up and running on your local machine.

#### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

#### 1. Clone the repository - cd your-repository-name

#### 2. Install dependencies - npm install

#### 3. Obtain API Keys

This application uses the Open-Meteo API to fetch temperature data. The API is free and does not require a key. However, if you choose to use a different data source that requires authentication, you should follow these steps:

Sign up for an API key on the service provider's website.

Create a .env.local file in the root of your project.

Add your API key to the file in the format NEXT_PUBLIC_YOUR_API_KEY=your_key_here.

Do not commit this file to your Git repository. It is already ignored by default in the .gitignore file.

#### 4. Run the application

- npm run dev
- The application will be available at http://localhost:3000. (Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.)
- You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

# Summary of Libraries Used

This project leverages a modern and robust stack for a smooth development experience and a feature-rich user interface.

Next.js: A React framework for production that enables server-side rendering (SSR) and client-side routing.

React: The core JavaScript library for building the user interface.

Ant Design: A popular UI library for React that provides a set of high-quality components out of the box, used for the layout, buttons, and other interface elements.

Zustand: A small, fast, and scalable state-management solution for React, used to manage the application's global state, such as polygons and time range.

React-Leaflet: A library that provides React components for the Leaflet interactive map library.

React-Range: A component for building custom slider controls, used for the timeline functionality.

Axios / Fetch API: Used for making HTTP requests to external data sources.

# Remarks on Design and Development

Component Architecture: The application follows a component-based architecture where each feature (e.g., AppHeader, TimelineSlider, MapWithDrawing) is a self-contained component. This promotes reusability and maintainability.

Client vs. Server Components: We have strategically used Next.js's App Router to separate server and client-side components. UI-heavy components that rely on browser APIs (like the map and Ant Design components) are marked with 'use client', ensuring a smooth rendering experience.

State Management: Zustand was chosen for its simplicity and minimal boilerplate, making it easy to manage the complex state of the polygons and their associated data without unnecessary complexity.

Hydration Error Resolution: The project encountered and resolved a common hydration error by ensuring that initial state values (especially those based on dynamic data like Date.now()) are set consistently on both the server and client using the useEffect hook.
<img width="1920" height="1020" alt="Screenshot 2025-08-06 152421" src="https://github.com/user-attachments/assets/1a5aaa8a-d847-49c6-8e65-6185c5ff0572" />
<img width="1920" height="1020" alt="Screenshot 2025-08-06 152349" src="https://github.com/user-attachments/assets/8d9abfa6-3c69-4b75-880b-317871fb2652" />
