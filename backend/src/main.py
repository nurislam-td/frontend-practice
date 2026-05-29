from auth.api import router as auth_api
from auth.api.exceptions import auth_restapi_error_mapper
from contrib.infrastructure.exception_handlers import make_fastapi_exception_handlers
from dishka.integrations.fastapi import setup_dishka
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from filestore.api import router as filestore_router
from posts.api import router as post_api
from setup.di.ioc import get_ioc

app = FastAPI(
    docs_url="/api/docs",
)
app.include_router(auth_api)
app.include_router(post_api)
app.include_router(filestore_router)

setup_dishka(get_ioc(), app)
make_fastapi_exception_handlers(app, auth_restapi_error_mapper)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
