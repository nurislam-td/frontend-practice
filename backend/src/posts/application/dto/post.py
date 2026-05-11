from dataclasses import dataclass


@dataclass(slots=True, frozen=True)
class CreatePost:
    title: str
    content: str
    images: list[bytes]
    author_id: int


@dataclass(slots=True, frozen=True)
class CreatedPost:
    id: int
