from dataclasses import dataclass
from typing import ClassVar, Literal

from contrib.application.exceptions import AppError


@dataclass(frozen=True, slots=True)
class PostNotFoundError(AppError):
    reason_code: ClassVar[Literal["POST_NOT_FOUND"]] = "POST_NOT_FOUND"
    post_id: int

    @property
    def message(self):
        return f"Post not found id: {self.post_id}"
