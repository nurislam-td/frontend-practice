from dataclasses import dataclass

from contrib.application.dto import PaginatedDTO

from posts.application.dto.post import CreatePostDTO, PostDTO
from posts.application.ports import IPostService


@dataclass(slots=True, frozen=True)
class GetPostsHandler:
    _post_service: IPostService

    async def call(self, post: CreatePostDTO) -> PaginatedDTO[PostDTO]:
        return await self._post_service.list()
