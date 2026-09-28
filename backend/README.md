# Backend Service - Node.js + Express + MongoDB

This directory contains the central API backend for managing user state, authentication, document storage, and orchestrating requests between the frontend and the Python AI microservice.

## Stack
- Node.js
- Express.js
- MongoDB + Mongoose

## Planned Endpoints
- `/api/auth` - User signup, login, JWT token generation
- `/api/profile` - Profile management & user attributes
- `/api/resume` - Upload handling & proxy to Python AI service
- `/api/recommendations` - Aggregated career, job, internship, and course recommendations
