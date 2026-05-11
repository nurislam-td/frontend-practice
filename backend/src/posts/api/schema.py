from typing import Annotated

from fastapi import File, Form, UploadFile
from pydantic import BaseModel


class CreatePostForm(BaseModel):
    title: Annotated[str, Form(...)]
    content: Annotated[str, Form(...)]
    images: Annotated[list[UploadFile], File(...)]
