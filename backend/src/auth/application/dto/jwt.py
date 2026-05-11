from dataclasses import dataclass


@dataclass(slots=True, frozen=True)
class JwtDTO:
    access_token: str
    refresh_token: str


@dataclass(slots=True, frozen=True)
class UserPayload:
    user_id: int
