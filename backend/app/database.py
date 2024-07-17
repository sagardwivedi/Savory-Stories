from sqlalchemy import create_engine
from sqlmodel import Session, SQLModel

from app.models import *  # noqa: F403

SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)


def get_db():
    with Session(engine) as session:
        yield session


def init_db():
    SQLModel.metadata.create_all(engine)
