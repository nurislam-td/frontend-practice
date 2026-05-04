from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    id: Mapped[int] = mapped_column(autoincrement=True, index=True, primary_key=True)


class User(Base):
    __tablename__ = "user"

    email: Mapped[str] = mapped_column(unique=True, index=True)
    password: Mapped[bytes]
    first_name: Mapped[str]
    last_name: Mapped[str]
    gender: Mapped[str]
    age: Mapped[int | None] = mapped_column(default=None)
