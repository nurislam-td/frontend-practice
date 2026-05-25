from dataclasses import dataclass

from auth.application.ports import UnitOfWork

from posts.application.dto.post import CreatedPostDTO, CreatePostDTO
from posts.application.ports import IPostService


@dataclass(slots=True, frozen=True)
class CreatePostHandler:
    _post_service: IPostService
    _uow: UnitOfWork

    async def call(self, post: CreatePostDTO) -> CreatedPostDTO:
        ok = await self._post_service.create_post(post)
        await self._uow.commit()
        return ok
