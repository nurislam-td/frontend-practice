from typing import Annotated
from uuid import uuid4

from auth.api.depends import validate_token
from auth.application.dto.user import UserDTO
from dishka.integrations.fastapi import FromDishka as FromDI
from dishka.integrations.fastapi import inject
from fastapi import APIRouter, Depends, Form

from posts.api.schema import CreatePostForm
from posts.application.create_post import CreatePostHandler
from posts.application.dto.post import CreatedPostDTO, CreatePostDTO, CreatePostImageDTO

router = APIRouter(prefix="/posts")


@router.post("")
@inject
async def create_post(
    data: Annotated[CreatePostForm, Form(...)],
    user: Annotated[UserDTO, Depends(validate_token)],
    handler: FromDI[CreatePostHandler],
) -> CreatedPostDTO:
    images = [
        CreatePostImageDTO(
            content=(await image.read()), filename=(image.filename or str(uuid4()))
        )
        for image in data.images
    ]
    post = CreatePostDTO(
        title=data.title,
        content=data.content,
        images=images,
        author_id=user.id,
    )
    return await handler.call(post)


@router.get("")
@inject
async def get_posts() -> None:
    pass
