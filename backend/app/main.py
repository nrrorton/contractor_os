from fastapi import FastAPI

from app.database import engine, Base
from app.models import user
from app.routes import users, auth


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ContractorOS API",
    description="Backend API for contractor management",
    version="1.0.0"
)

app.include_router(users.router)
app.include_router(auth.router)


@app.get("/")
def root():
    return {
        "message": "ContractorOS API is running"
    }