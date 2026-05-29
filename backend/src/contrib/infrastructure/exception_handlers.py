from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from contrib.application.exceptions import AppError


def make_fastapi_exception_handlers[T: AppError](
    app: FastAPI, error_mapper: dict[type[T], int] | None = None
):
    error_mapper = error_mapper or {}

    @app.exception_handler(AppError)
    async def _(request: Request, exc: T):
        return JSONResponse(
            content={
                "reason_code": exc.reason_code,
                "message": exc.message,
            },
            status_code=error_mapper.get(type(exc), 500),
        )
