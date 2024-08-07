from datetime import timedelta
from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel

from app.api.deps import SessionDep
from app.core import security
from app.core.config import settings
from app.crud.auth import (
    authenticate,
    create_user,
    get_user_by_email,
    get_user_by_username,
)
from app.models import Token, UserCreate, UserRead

router = APIRouter()


class Message(BaseModel):
    detail: str


@router.post(
    "/register",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED,
    summary="Register an user",
    response_description="The Register user",
    responses={400: {"model": Message}},
)
def register_user(*, session: SessionDep, user_in: UserCreate) -> Any:
    existing_user_by_email = get_user_by_email(session=session, email=user_in.email)
    if existing_user_by_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    existing_user_by_username = get_user_by_username(
        session=session, username=user_in.username
    )

    # Respond with appropriate message
    if existing_user_by_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )

    new_user = create_user(session=session, user_in=user_in)
    return new_user


@router.post(
    "/login/access-token",
    responses={400: {"model": Message}},
)
def login_access_token(
    *, session: SessionDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    user = authenticate(
        session=session, username=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(
        access_token=security.create_access_token(
            user.id,
            expires_delta=access_token_expires,
        ),
    )
