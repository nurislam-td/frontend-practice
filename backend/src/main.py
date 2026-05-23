from auth.api import router as auth_api
from dishka.integrations.fastapi import setup_dishka
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from setup.di.ioc import get_ioc

app = FastAPI(
    docs_url="/api/docs",
)
app.include_router(auth_api)

setup_dishka(get_ioc(), app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
