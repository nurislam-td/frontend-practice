from adaptix import P
from adaptix.conversion import get_converter, link, link_constant

from posts.application.dto.post import PostDTO, PostImageDTO
from posts.infrastructure.models import Post, PostImage

convert_posts = get_converter(
    Post,
    PostDTO,
    recipe=[
        link(P[PostImage].origin_name, P[PostImageDTO].filename),
        link_constant(P[PostDTO].author.avatar, value=""),
    ],
)
