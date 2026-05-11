from typing import Protocol

from posts.application.dto.post import CreatedPost, CreatePost


class IPostService(Protocol):
    async def create_post(self, post: CreatePost) -> CreatedPost: ...
