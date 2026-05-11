from dataclasses import dataclass

from posts.application.dto.post import CreatedPost, CreatePost
from posts.application.ports import IPostService


@dataclass(slots=True, frozen=True)
class CreatePostHandler:
    _post_service: IPostService

    async def call(self, post: CreatePost) -> CreatedPost:
        return await self._post_service.create_post(post)
