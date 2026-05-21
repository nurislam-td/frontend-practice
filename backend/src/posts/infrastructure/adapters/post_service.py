import io
from dataclasses import dataclass
from uuid import uuid4

from anyio import Path
from contrib.application.ports.file_service import IFileService
from settings import get_settings
from sqlalchemy.ext.asyncio import AsyncSession

from posts.application.dto.post import CreatedPostDTO, CreatePostDTO
from posts.application.ports import IPostService
from posts.infrastructure.models import Post, PostImage


@dataclass(slots=True, frozen=True, eq=False, repr=False)
class PostService(IPostService):
    _session: AsyncSession
    _file_storage: IFileService

    async def create_post(self, post: CreatePostDTO) -> CreatedPostDTO:
        post_db = Post(
            author_id=post.author_id,
            content=post.content,
            title=post.title,
        )
        self._session.add(post_db)
        await self._session.flush()
        db_image_buffer: list[PostImage] = [None for i in range(len(post.images))]  # type: ignore
        for i, image in enumerate(post.images):
            db_p = (
                Path("posts")
                / str(post_db.id)
                / "images"
                / f"{image.filename}_{uuid4()}"
            )
            await self._file_storage.upload_file(
                file=io.BytesIO(image.content),
                rel_file_path=db_p.as_posix(),
            )
            db_image_buffer[i] = PostImage(
                origin_name=image.filename,
                path=db_p.as_posix(),
                post_id=post_db.id,
            )
        self._session.add_all(db_image_buffer)
        return CreatedPostDTO(id=post_db.id)
