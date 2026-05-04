from pydantic import BaseModel, EmailStr

from auth.application.dto.user import Gender


class LoginSchema(BaseModel):
    email: EmailStr
    password: str


class SignUpSchema(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    password: str
    gender: Gender
    age: int | None = None


class UserCreatedSchema(BaseModel):
    user_id: int
