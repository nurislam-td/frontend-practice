from adaptix.conversion import coercer, get_converter
from dishka.integrations.fastapi import FromDishka as Depends
from dishka.integrations.fastapi import inject
from fastapi import APIRouter
from pydantic import EmailStr

from auth.api.schemas import LoginSchema, SignUpSchema, UserCreatedSchema
from auth.application.dto.jwt import JwtDTO
from auth.application.dto.user import CreateUserDTO
from auth.application.login import LoginHandler
from auth.application.signup import SignUpHandler

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login")
@inject
async def login(login: LoginSchema, handler: Depends[LoginHandler]) -> JwtDTO:
    jwt = await handler.call(email=login.email, password=login.password)
    return jwt


@router.post("/signup", status_code=201)
@inject
async def signup(
    signup: SignUpSchema, handler: Depends[SignUpHandler]
) -> UserCreatedSchema:
    dto = get_converter(
        SignUpSchema, CreateUserDTO, recipe=[coercer(EmailStr, str, func=str)]
    )(signup)
    user_id = await handler.call(dto)
    return UserCreatedSchema(user_id=user_id)
