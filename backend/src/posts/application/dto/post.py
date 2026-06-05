from dataclasses import dataclass


@dataclass(slots=True, frozen=True)
class CreatePostImageDTO:
    filename: str
    content: bytes


@dataclass(slots=True, frozen=True)
class CreatePostDTO:
    title: str
    content: str
    images: list[CreatePostImageDTO]
    author_id: int


@dataclass(slots=True, frozen=True)
class CreatedPostDTO:
    id: int


@dataclass(slots=True, frozen=True)
class EditPostDTO:
    id: int
    author_id: int
    title: str | None = None
    content: str | None = None
    images: list[CreatePostImageDTO] | None = None


@dataclass(slots=True, frozen=True)
class PostImageDTO:
    id: int
    filename: str
    path: str


@dataclass(slots=True, frozen=True)
class AuthorDTO:
    id: int
    avatar: str
    first_name: str
    last_name: str


@dataclass(slots=True, frozen=True)
class PostDTO:
    id: int
    title: str
    content: str
    author: AuthorDTO
    images: list[PostImageDTO]
