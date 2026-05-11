from typing import Annotated

from auth.api.depends import validate_token
from auth.application.dto.user import UserDTO
from dishka.integrations.fastapi import FromDishka as FromDI
from dishka.integrations.fastapi import inject
from fastapi import APIRouter, Depends, Form, Query

from posts.api.schema import CreatePostForm
from posts.application.create_post import CreatePostHandler
from posts.application.dto.post import CreatedPost, CreatePost

router = APIRouter(prefix="/posts")


@router.post("")
@inject
async def create_post(
    data: Annotated[CreatePostForm, Form(...)],
    user: Annotated[UserDTO, Depends(validate_token)],
    handler: FromDI[CreatePostHandler],
) -> CreatedPost:
    images_bytes = [await image.read() for image in data.images]
    post = CreatePost(
        title=data.title,
        content=data.content,
        images=images_bytes,
        author_id=user.id,
    )


@router.get("")
@inject
async def get_posts(
    user: Annotated[UserDTO, Depends(validate_token)],
    filters: Annotated[GetPostFiltersSchema, Query(...)],
    handler: FromDI[GetPostsHandler],
) -> Post:
    images_bytes = [await image.read() for image in data.images]
    post = CreatePost(
        title=data.title,
        content=data.content,
        images=images_bytes,
        author_id=user.id,
    )
    return await handler.call(post)
