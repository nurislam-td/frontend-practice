from functools import lru_cache

from dishka import AsyncContainer, make_async_container
from settings import Settings, get_settings
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker

from auth.infrastructure.db import get_async_sessionmaker
from auth.infrastructure.di.provider import AppProvider

lru_cache(maxsize=1)


def get_ioc() -> AsyncContainer:
    return make_async_container(
        AppProvider(),
        context={
            Settings: get_settings(),
            async_sessionmaker[AsyncSession]: get_async_sessionmaker(),
        },
    )
