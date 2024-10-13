# Interview Blog Page

This project consists of a blog page application with separate frontend and backend components. The application can be easily set up and run using Docker.

## Prerequisites

Make sure you have the following installed on your system:

- [Git](https://git-scm.com/)
- [Node.js and npm](https://nodejs.org/) (for frontend dependencies)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

Follow these steps to clone the repository, set up the project, and start the application.

### 1. Clone the Repository

```bash
git clone https://github.com/Richiul/interview-blog-page.git
```

### 2. Change to the Project Directory

```bash
cd interview-blog-page
```

### 3. Set Up the Frontend

Navigate to the frontend directory and install the required dependencies:

```bash
cd ominimo-frontend
npm install
```

### 4. Set Up the Backend

Navigate back to the root directory, then move to the backend folder and set up the environment variables:

```bash
cd ..
cd ominimo-backend
```

Create a `.env` file by copying the `.env.example` file and filling in the required environment variables:

```bash
cp .env.example .env
```

### 5. Build and Start the Application with Docker

Navigate back to the root directory and build the Docker images:

```bash
cd ..
docker-compose build
```

Start the application using Docker Compose:

```bash
docker-compose up
```

The application should now be running. You can access it in your browser at `http://localhost:3000` (or the specified port in the configuration).

## Additional Commands

- To stop the application, run:

  ```bash
  docker-compose down
  ```

- To rebuild the application without using the cache:

  ```bash
  docker-compose build --no-cache
  ```
