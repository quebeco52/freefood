# freefood

Share leftover food instead of throwing it away. Registered users can post
food and/or search and reserve food that they want to pick up.

## Getting started

Requirements: Node.js, npm, Docker

1. Clone the repo and enter it.
2. Copy the environment file in the repo root:

   ```bash
   cp .env.example .env
   ```

3. Start the database:

   ```bash
   docker compose up -d db
   ```

4. Install and start the backend:

   ```bash
   cd backend
   npm install
   npm run dev
   ```
