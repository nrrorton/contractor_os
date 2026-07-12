from fastapi import FastAPI

from app.database import engine, Base
from app.models import user


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ContractorOS API",
    description="Backend API for contractor management",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "ContractorOS API is running"
    }