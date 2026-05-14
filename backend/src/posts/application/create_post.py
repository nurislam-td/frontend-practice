from dataclasses import dataclass

from posts.application.dto.post import CreatedPostDTO, CreatePostDTO
from posts.application.ports import IPostService


@dataclass(slots=True, frozen=True)
class CreatePostHandler:
    _post_service: IPostService

    async def call(self, post: CreatePostDTO) -> CreatedPostDTO:
        return await self._post_service.create_post(post)
