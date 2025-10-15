# E-commerce API Base Structure
Basic Node.js + Express starter project.

Ecom API scaffold - Milestone 1

Run:
1. cp .env.example .env
2. npm install
3. npm run dev

Endpoints:
GET /            => health
GET /api/users   => list users (without passwords)
POST /api/users/register  => register user (in-memory for now)
POST /api/users/login     => login (plaintext check for now; JWT to be added in next milestone)
