from dataclasses import dataclass

from auth.application.ports import UnitOfWork

from posts.application.dto.post import CreatedPostDTO, EditPostDTO
from posts.application.ports import IPostService


@dataclass(slots=True, frozen=True)
class EditPostHandler:
    _post_service: IPostService
    _uow: UnitOfWork

    async def call(self, post: EditPostDTO) -> None:
        ok = await self._post_service.update_post(post)
        await self._uow.commit()
        return ok
