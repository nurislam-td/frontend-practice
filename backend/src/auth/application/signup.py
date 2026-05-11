from dataclasses import dataclass

from auth.application.dto.jwt import JwtDTO, UserPayload
from auth.application.dto.user import CreateUserDTO
from auth.application.ports import (
    IJwtService,
    IPasswordService,
    IUserService,
    UnitOfWork,
)


@dataclass(frozen=True, slots=True)
class SignUpHandler:
    user_service: IUserService
    jwt_service: IJwtService
    pwd: IPasswordService
    uow: UnitOfWork

    async def call(self, create_user: CreateUserDTO) -> JwtDTO:
        if await self.user_service.check_user_email_exists(email=create_user.email):
            raise Exception("User already exists")
        ok = await self.user_service.create_user(create_user, self.pwd)
        await self.uow.commit()
        return self.jwt_service.create_user_tokens(UserPayload(user_id=ok))
