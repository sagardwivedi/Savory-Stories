from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.routing import APIRoute

from app.api.main import api_router
from app.core.config import settings
from app.database import init_db


def custom_generate_unique_id(route: APIRoute) -> str:
    return f"{route.tags[0]}-{route.name}"


@asynccontextmanager
async def start_up(app: FastAPI):  # noqa: ARG001
    init_db()
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    version=settings.BACKEND_VERSION,
    generate_unique_id_function=custom_generate_unique_id,
    debug=settings.DEBUG,
    lifespan=start_up,
)

app.include_router(api_router, prefix=f"{settings.API_V1_STR}")
