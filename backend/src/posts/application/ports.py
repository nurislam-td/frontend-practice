from typing import Protocol

from contrib.application.dto import PaginatedDTO, PaginationParams

from posts.application.dto.post import CreatedPostDTO, CreatePostDTO, PostDTO


class IPostService(Protocol):
    async def create_post(self, post: CreatePostDTO) -> CreatedPostDTO: ...
    async def list(
        self,
        pagination: PaginationParams,
    ) -> PaginatedDTO[PostDTO]: ...

    async def get(self, post_id: int) -> PostDTO: ...
