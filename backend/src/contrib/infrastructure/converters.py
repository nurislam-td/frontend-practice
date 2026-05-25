from adaptix.conversion import get_converter

from contrib.application.dto import PaginationParams
from contrib.infrastructure.schemas import PaginationParamsSchema

pagination_converter = get_converter(PaginationParamsSchema, PaginationParams)
