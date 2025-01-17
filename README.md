# Fullstack Chatbot Application

## Overview

A fullstack chatbot application powered by Gemini AI, built with Next.js and TypeScript.

## Tech Stack

- ReactJS
- NodeJS, ExpressJS
- TypeScript
- Google Gemini AI
- Tailwind CSS

## Prerequisites

- Node.js (v18 or higher)
- Google Cloud Platform account
- Gemini API key

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/qdung/fullstack-chatbot.git
cd fullstack-chatbot
```

### 2. Environment Variables

Create a `.env` file in the `backend` directory:

```bash
GOOGLE_API_KEY=your_gemini_api_key_here
```

### 3. Run Development Server

Use the provided script to run both servers:

```bash
./run_script.sh
```

This script will start both the backend and frontend servers concurrently.
Visit `http://localhost:3000` to view the application.

## Obtaining Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create or sign in to your Google account
3. Generate a new API key
4. Copy the key to your `.env` file

## Deployment

Deploy to Vercel:

```bash
npm run build
vercel deploy
```
