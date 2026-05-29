import io
from dataclasses import dataclass
from uuid import uuid4

from anyio import Path
from contrib.application.dto import PaginatedDTO, PaginationParams
from contrib.application.ports.file_service import IFileService
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload

from posts.application.dto.post import (
    CreatedPostDTO,
    CreatePostDTO,
    PostDTO,
)
from posts.application.exceptions import PostNotFoundError
from posts.application.ports import IPostService
from posts.infrastructure.converters import convert_post
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
                / f"{Path(image.filename).stem}_{uuid4()}{Path(image.filename).suffix}"
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

    async def list(self, pagination: PaginationParams) -> PaginatedDTO[PostDTO]:
        q = (
            select(Post)
            .options(
                joinedload(Post.author),
                selectinload(Post.images),
            )
            .limit(pagination.limit)
            .offset(pagination.offset)
        )
        posts = await self._session.scalars(q)
        data = [convert_post(p) for p in posts]
        return PaginatedDTO(limit=pagination.limit, offset=pagination.offset, data=data)

    async def get(self, post_id: int) -> PostDTO:
        q = (
            select(Post)
            .options(
                joinedload(Post.author),
                selectinload(Post.images),
            )
            .where(Post.id == post_id)
        )
        post = await self._session.scalar(q)
        if not post:
            raise PostNotFoundError(post_id=post_id)
        return convert_post(post)
