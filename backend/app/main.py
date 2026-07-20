from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.models import user, client, project, time_entry
from app.routes import (
    users, auth, clients, projects, time_entries, invoices, 
    dashboard, timer
)


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title='ContractorOS API',
    description='Backend API for contractor management',
    version='1.0.0'
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(clients.router)
app.include_router(projects.router)
app.include_router(time_entries.router)
app.include_router(invoices.router)
app.include_router(dashboard.router)
app.include_router(timer.router)


@app.get('/')
def root():
    return {
        'message': 'ContractorOS API is running'
    }