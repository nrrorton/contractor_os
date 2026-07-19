# ContractorOS

ContractorOS is a full-stack contractor management application designed to help myself and other independent contractors track billable hours, manage clients and projects, and generate invoices.

## Tech Stack

### Frontend (When I soon get to it)
- React
- TypeScript
- Tailwind CSS

### Backend
- Python
- FastAPI
- SQLAlchemy

### Database
- PostgreSQL
- Docker

## Features (Placeholder for now)

## Project Structure
contractor-os/
├── backend/
├── frontend/
├── docs/
└── docker-compose.yml

## Running the Backend
Create and activate a virtual environment:
python -m venv venv

Install dependencies:
pip install -r requirements.txt

Start PostgreSQL:
docker compose up -d

Run the API:
uvicorn app.main:app --reload

API Documentation available at:
http://127.0.0.1:8000/docs


## Development Status

Currently in active development.

Completed:
- Project Scaffolding
- Backend API setup
- Database integration
- Initial user model
- User registration flow
- Client management
- Project management
- Time tracking

Next:
- Frontend

ContractorOS frontend status:

- React/Vite/TypeScript setup complete
- React Router installed
- Layout + Navbar implemented
- Pages:
    - Login
    - Dashboard
    - Clients
    - Projects

- FastAPI communication working
- Axios service created
- Login endpoint working
- JWT returned successfully
- JWT stored in localStorage

Later:
- Create AuthContext
- Manage authentication state globally
- Protect application routes
- Add authenticated API requests