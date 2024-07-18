from pydantic import EmailStr
from sqlmodel import Field, SQLModel


class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255, description="")
    username: str = Field(min_length=3, max_length=100, description="")


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=100, description="")


class UserPublic(UserBase):
    id: int


class UserUpdateMe(SQLModel):
    email: EmailStr | None = Field(default=None, max_length=255)
    username: str | None = Field(default=None, max_length=255)


class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True, description="")
    hashed_password: str = Field(description="")


class Token(SQLModel):
    access_token: str
    token_type: str = "Bearer"


class TokenPayload(SQLModel):
    sub: int | None
