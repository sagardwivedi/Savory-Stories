from uuid import UUID, uuid4

from pydantic import EmailStr
from sqlmodel import Field, SQLModel


class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    username: str = Field(unique=True, index=True, min_length=3, max_length=255)
    full_name: str = Field(max_length=255)


class UserRead(UserBase):
    id: UUID


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class User(UserBase, table=True):
    id: UUID = Field(primary_key=True, default_factory=uuid4)
    hashed_password: str


class Token(SQLModel):
    access_token: str
    token_type: str = "Bearer"


class TokenPayload(SQLModel):
    sub: str | None = None
