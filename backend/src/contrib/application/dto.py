from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class PaginatedDTO[T]:
    limit: int
    offset: int
    data: list[T]


@dataclass(frozen=True, slots=True)
class PaginationParams:
    limit: int
    offset: int
