#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Function to check if a process is running on a port
check_port() {
  lsof -i:$1 > /dev/null
  return $?
}

# Kill process on port if running
kill_port() {
  if check_port $1; then
    echo "Killing process on port $1"
    lsof -ti:$1 | xargs kill -9
  fi
}

# Start frontend and backend
start_services() {
  # Kill existing processes on ports 3000 (backend) and 5173 (frontend)
  kill_port 3000
  kill_port 5173

  # Start backend (assuming it's in a directory called 'backend')
  echo -e "${GREEN}Starting backend server...${NC}"
  cd backend
  npm install
  npm run dev &

  # Start frontend (assuming it's in a directory called 'frontend')
  echo -e "${GREEN}Starting frontend server...${NC}"
  cd ../frontend
  npm install
  npm start &

  # Wait for all background processes
  wait
}

# Run the services
start_services