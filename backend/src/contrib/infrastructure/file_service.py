from dataclasses import dataclass, field
from io import BytesIO

from anyio import Path
from settings import get_settings

from contrib.application.ports.file_service import IFileService


@dataclass(slots=True)
class FileStoreService(IFileService):
    _store_dir: Path = field(init=False, default=Path(get_settings().FILE_STORE_DIR))

    async def upload_file(self, file: BytesIO, rel_file_path: str):
        path = Path(self._store_dir / rel_file_path)
        await path.parent.mkdir(parents=True, exist_ok=True)
        await path.write_bytes(file.read())

    async def download_file(self, rel_file_path: str) -> BytesIO:
        return BytesIO(await Path(self._store_dir / rel_file_path).read_bytes())

    async def delete_file(self, rel_file_path: str) -> None:
        await Path(self._store_dir / rel_file_path).unlink(missing_ok=True)
