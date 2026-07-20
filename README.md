# ContractorOS

ContractorOS is a full-stack contractor management application designed to help myself and other independent contractors track billable hours, manage clients and projects, and generate invoices.

## Tech Stack

### Frontend 
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
- Frontend

ContractorOS frontend status:

- React/Vite/TypeScript setup complete
- React Router installed
- Layout + Navbar implemented
- Pages:
    - Login
    - Register
    - Dashboard
    - Clients
    - Projects
    - Time Entries

- FastAPI communication working
- Axios service created
- Login endpoint working
- JWT returned successfully
- JWT stored in localStorage

Next:
- Error handling
- Form validation
- Edit functionality
- Timer functionality

Last:
- Improve UI styling significantly