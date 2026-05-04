from dataclasses import dataclass

from auth.application.dto.jwt import JwtDTO
from auth.application.ports import IJwtService, IPasswordService, IUserService


@dataclass
class LoginHandler:
    user_repo: IUserService
    jwt_repo: IJwtService
    pwd: IPasswordService

    async def call(self, email: str, password: str) -> JwtDTO:
        try:
            user = await self.user_repo.get_user_by_email(email=email)
        except Exception as e:
            raise Exception("Email not exists") from e
        if not self.pwd.check_pwd(password, user.password):
            raise Exception("Incorrect password")

        return await self.jwt_repo.get_by_user_id(user.id)
