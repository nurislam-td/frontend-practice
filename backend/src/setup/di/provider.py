from collections.abc import AsyncIterable

from dishka import (  # type: ignore  # noqa: PGH003
    AnyOf,
    Provider,
    Scope,
    from_context,
    provide,
)
from settings import Settings
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker

from auth.application.login import LoginHandler
from auth.application.ports import (
    IJwtService,
    IPasswordService,
    IUserService,
    UnitOfWork,
)
from auth.application.signup import SignUpHandler
from auth.infrastructure.adapters.jwt import JwtService
from auth.infrastructure.adapters.pwd import PasswordService
from auth.infrastructure.adapters.user import UserService


class AppProvider(Provider):
    config = from_context(provides=Settings, scope=Scope.APP)
    session_maker = from_context(
        provides=async_sessionmaker[AsyncSession],
        scope=Scope.APP,
    )

    @provide(scope=Scope.REQUEST)
    async def provide_session(
        self,
        session_maker: async_sessionmaker[AsyncSession],
    ) -> AsyncIterable[AnyOf[AsyncSession, UnitOfWork]]:
        async with session_maker() as session:
            yield session

    @provide(scope=Scope.REQUEST)
    def provide_jwt(self, config: Settings) -> IJwtService:
        return JwtService(
            jwt_alg=config.JWT_ALG,
            access_private_path=config.ACCESS_PRIVATE_PATH,
            access_public_path=config.ACCESS_PUBLIC_PATH,
            access_token_expire=config.ACCESS_TOKEN_EXPIRE,
            refresh_private_path=config.REFRESH_PRIVATE_PATH,
            refresh_public_path=config.REFRESH_PUBLIC_PATH,
            refresh_token_expire=config.REFRESH_TOKEN_EXPIRE,
        )

    user_service = provide(UserService, provides=IUserService, scope=Scope.REQUEST)
    enc_pwd = provide(PasswordService, provides=IPasswordService, scope=Scope.REQUEST)
    su = provide(SignUpHandler, scope=Scope.REQUEST)
    lh = provide(LoginHandler, scope=Scope.REQUEST)
