from dataclasses import dataclass

from contrib.application.dto import PaginatedDTO, PaginationParams

from posts.application.dto.post import PostDTO
from posts.application.ports import IPostService


@dataclass(slots=True, frozen=True)
class GetPostDetailHandler:
    _post_service: IPostService

    async def call(self, post_id: int) -> PostDTO:
        return await self._post_service.get(post_id)
