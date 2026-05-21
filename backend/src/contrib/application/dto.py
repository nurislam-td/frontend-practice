from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class PaginatedDTO[T]:
    limit: int
    offset: int
    data: list[T]
