from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    BASE_DIR: Path = Path(__file__).parent  # src folder

    # FileStore
    FILE_STORE_DIR: Path = Path(__file__).parent / "filestore" / "files"

    # DB
    DB_URL: str = "sqlite:///some.db"
    ASYNC_DB_URL: str = "sqlite+aiosqlite:///some.db"

    # AUTH
    JWT_ALG: str = "RS256"
    ACCESS_PRIVATE_PATH: Path
    ACCESS_PUBLIC_PATH: Path

    REFRESH_PRIVATE_PATH: Path
    REFRESH_PUBLIC_PATH: Path

    ACCESS_TOKEN_EXPIRE: int = 500_000  # minutes
    REFRESH_TOKEN_EXPIRE: int = 60 * 24 * 21  # minutes (21 days)

    SECURE_COOKIES: bool = True

    VERIFICATION_CODE_EXPIRE: int = 5  # minutes

    class Config:
        env_file = ".env"


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()  # type: ignore
