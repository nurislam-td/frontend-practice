import mimetypes
import urllib.parse
from pathlib import Path
from typing import Annotated

from auth.api.depends import validate_token
from auth.application.dto.user import UserDTO
from contrib.application.ports.file_service import IFileService
from dishka.integrations.fastapi import FromDishka as FromDI
from dishka.integrations.fastapi import inject
from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse

router = APIRouter(prefix="/filestore")


@router.get("/{path:path}")
@inject
async def get_file(
    _: Annotated[UserDTO, Depends(validate_token)],
    path: str,
    filestorage: FromDI[IFileService],
):
    buffer = await filestorage.download_file(path)
    content_type, __ = mimetypes.guess_type(path)
    content_type = content_type or "application/octet-stream"
    filename = path.rsplit("/")[-1]
    filename = urllib.parse.quote(filename)
    return StreamingResponse(
        buffer,
        media_type=content_type,
        headers={"Content-Disposition": f"attachment; filename*=UTF-8''{filename}"},
    )
