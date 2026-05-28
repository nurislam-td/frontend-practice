from typing import Annotated
from uuid import uuid4

from auth.api.depends import validate_token
from auth.application.dto.user import UserDTO
from contrib.application.dto import PaginatedDTO
from contrib.infrastructure.converters import pagination_converter
from contrib.infrastructure.schemas import PaginationParamsSchemaType
from dishka.integrations.fastapi import FromDishka as FromDI
from dishka.integrations.fastapi import inject
from fastapi import APIRouter, Depends, File, Form, UploadFile

from posts.application.dto.post import (
    CreatedPostDTO,
    CreatePostDTO,
    CreatePostImageDTO,
    PostDTO,
)
from posts.application.use_cases.create_post import CreatePostHandler
from posts.application.use_cases.get_post import GetPostDetailHandler
from posts.application.use_cases.get_posts import GetPostsHandler

router = APIRouter(prefix="/posts", tags=["Posts"])


@router.post(
    "",
    openapi_extra={
        "requestBody": {
            "content": {
                "multipart/form-data": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "title": {"type": "string"},
                            "content": {"type": "string"},
                            "images": {
                                "type": "array",
                                "items": {"type": "string", "format": "binary"},
                            },
                        },
                        "required": ["title", "content", "images"],
                    }
                }
            }
        }
    },
)
@inject
async def create_post(
    user: Annotated[UserDTO, Depends(validate_token)],
    handler: FromDI[CreatePostHandler],
    title: Annotated[str, Form()],
    content: Annotated[str, Form()],
    images: Annotated[list[UploadFile], File()],
) -> CreatedPostDTO:

    images_dto = [
        CreatePostImageDTO(
            content=(await image.read()), filename=(image.filename or str(uuid4()))
        )
        for image in images
    ]
    post = CreatePostDTO(
        title=title,
        content=content,
        images=images_dto,
        author_id=user.id,
    )
    return await handler.call(post)


@router.get("")
@inject
async def get_posts(
    pagination: PaginationParamsSchemaType, handler: FromDI[GetPostsHandler]
) -> PaginatedDTO[PostDTO]:
    return await handler.call(pagination_converter(pagination))


@router.get("/{post_id}")
@inject
async def get_post_detail(
    post_id: int, handler: FromDI[GetPostDetailHandler]
) -> PostDTO:
    return await handler.call((post_id))
