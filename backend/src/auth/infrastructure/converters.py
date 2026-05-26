from adaptix.conversion import coercer, get_converter

from auth.application.dto.user import Gender, UserDTO
from auth.infrastructure.models import User

user_converter = get_converter(
    User, UserDTO, recipe=[coercer(str, Gender, lambda x: Gender(x))]
)
