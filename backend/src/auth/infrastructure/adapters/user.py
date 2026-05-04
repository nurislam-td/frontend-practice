from dataclasses import dataclass

from adaptix.conversion import get_converter
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from auth.application.dto.user import CreateUserDTO, UserDTO
from auth.application.ports import IPasswordService, IUserService
from auth.infrastructure.models import User


@dataclass(slots=True)
class UserService(IUserService):
    session: AsyncSession

    async def get_user_by_email(self, email: str) -> UserDTO:
        q = select(User).where(User.email == email)
        u = (await self.session.execute(q)).scalar_one()
        return get_converter(User, UserDTO)(u)

    async def check_user_email_exists(self, email: str) -> bool:
        q = select(User.id).where(User.email == email)
        u = await self.session.scalar(q)
        return False if u is None else True

    async def create_user(
        self, user: CreateUserDTO, pwd_converter: IPasswordService
    ) -> int:

        u = User(
            email=user.email,
            password=pwd_converter.encrypt_pwd(user.password),
            first_name=user.first_name,
            last_name=user.last_name,
            gender=user.gender,
            age=user.age,
        )
        self.session.add(u)
        await self.session.flush()
        return u.id
