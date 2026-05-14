from auth.infrastructure.models import User
from contrib.models import Base
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Post(Base):
    __tablename__ = "post"

    title: Mapped[str]
    content: Mapped[str]

    author_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    author: Mapped[User] = relationship()
    images: Mapped[list["PostImage"]] = relationship()


class PostImage(Base):
    __tablename__ = "post_image"

    origin_name: Mapped[str]
    path: Mapped[str] = mapped_column(unique=True)
    post_id: Mapped[int | None] = mapped_column(
        ForeignKey("post.id", ondelete="SET NULL")
    )
