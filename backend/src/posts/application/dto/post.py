from dataclasses import dataclass


@dataclass(slots=True, frozen=True)
class PostImageDTO:
    filename: str
    content: bytes


@dataclass(slots=True, frozen=True)
class CreatePostDTO:
    title: str
    content: str
    images: list[PostImageDTO]
    author_id: int


@dataclass(slots=True, frozen=True)
class CreatedPostDTO:
    id: int
