from auth.application.exceptions import (
    IncorrectPasswordError,
    UserAlreadyExistsError,
    UserNotExistsError,
)

AuthException = UserAlreadyExistsError | UserNotExistsError | IncorrectPasswordError
auth_restapi_error_mapper: dict[type[AuthException], int] = {
    UserAlreadyExistsError: 409,
    UserNotExistsError: 404,
    IncorrectPasswordError: 400,
}
