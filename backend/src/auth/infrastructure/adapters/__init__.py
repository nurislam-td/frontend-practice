from typing import Protocol

from auth.application.dto.jwt import JwtDTO
from auth.application.dto.user import CreateUserDTO, UserDTO


class IPasswordEncrypt(Protocol):
    def __call__(self, input_pwd: str) -> bytes: ...


class IUserService(Protocol):
    async def get_user_by_email(self, email: str) -> UserDTO: ...
    async def check_user_email_exists(self, email: str) -> bool: ...
    async def create_user(
        self, user: CreateUserDTO, pwd_converter: IPasswordEncrypt
    ) -> int: ...


class IJwtService(Protocol):
    async def get_by_user_id(self, user_id: int) -> JwtDTO: ...


class IPasswordChecker(Protocol):
    def __call__(self, input_pwd: str, db_pwd: bytes) -> bool: ...
