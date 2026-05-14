from dataclasses import dataclass
from uuid import uuid4

from anyio import Path
from settings import get_settings
from sqlalchemy.ext.asyncio import AsyncSession

from posts.application.dto.post import CreatedPostDTO, CreatePostDTO
from posts.application.ports import IPostService
from posts.infrastructure.models import Post, PostImage


@dataclass(slots=True, frozen=True, eq=False, repr=False)
class PostService(IPostService):
    _session: AsyncSession

    async def create_post(self, post: CreatePostDTO) -> CreatedPostDTO:
        post_db = Post(
            author_id=post.author_id,
            content=post.content,
            title=post.title,
        )
        self._session.add(post_db)
        await self._session.flush()
        file_store = get_settings().FILE_STORE_DIR
        db_image_buffer: list[PostImage] = [None for i in range(len(post.images))]  # type: ignore
        for i, image in enumerate(post.images):
            p = Path(
                file_store
                / "posts"
                / str(post_db.id)
                / "images"
                / f"{image.filename}_{uuid4()}"
            )
            db_p = p.relative_to(file_store)
            await p.write_bytes(image.content)
            db_image_buffer[i] = PostImage(
                origin_name=image.filename,
                path=db_p.as_posix(),
                post_id=post_db.id,
            )
        self._session.add_all(db_image_buffer)
        return CreatedPostDTO(id=post_db.id)
