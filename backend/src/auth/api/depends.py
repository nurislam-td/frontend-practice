from typing import Annotated

from dishka import Scope
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from setup.di.ioc import get_ioc

from auth.application.dto.user import UserDTO
from auth.application.ports import IJwtService, IUserService

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


async def get_current_token(
    token: Annotated[str, Depends(oauth2_scheme)],
) -> str:
    return token


async def validate_token(token: Annotated[str, Depends(get_current_token)]) -> UserDTO:
    ioc = get_ioc()
    async with ioc(scope=Scope.REQUEST) as di:
        jwt = await di.get(IJwtService)
        user_service = await di.get(IUserService)
        user_id = jwt.decode_access(token).get("user_id", 0)
        if user := await user_service.get_maybe_user_by_id(user_id):
            return user
        raise Exception("User not exists")
