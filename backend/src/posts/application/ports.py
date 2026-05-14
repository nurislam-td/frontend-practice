from typing import Protocol

from posts.application.dto.post import CreatedPostDTO, CreatePostDTO


class IPostService(Protocol):
    async def create_post(self, post: CreatePostDTO) -> CreatedPostDTO: ...
