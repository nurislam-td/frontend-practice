from auth.api import router as auth_api
from auth.infrastructure.di.ioc import get_ioc
from dishka.integrations.fastapi import setup_dishka
from fastapi import FastAPI

app = FastAPI()
app.include_router(auth_api)

setup_dishka(get_ioc(), app)
