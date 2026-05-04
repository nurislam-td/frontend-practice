from dataclasses import dataclass
from enum import StrEnum, auto


class Gender(StrEnum):
    MALE = auto()
    FEMALE = auto()
    OTHER = auto()


@dataclass(slots=True, frozen=True)
class UserDTO:
    id: int
    email: str
    password: bytes
    first_name: str
    last_name: str
    gender: Gender
    age: int | None = None


@dataclass(slots=True, frozen=True)
class CreateUserDTO:
    email: str
    password: str
    first_name: str
    last_name: str
    gender: Gender
    age: int | None = None
