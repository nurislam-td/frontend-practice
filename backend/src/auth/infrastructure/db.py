from settings import get_settings
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine


def get_async_sessionmaker() -> async_sessionmaker[AsyncSession]:
    settings = get_settings()
    async_engine = create_async_engine(settings.ASYNC_DB_URL)
    return async_sessionmaker(
        async_engine,
        autoflush=False,
        expire_on_commit=False,
        autocommit=False,
    )
