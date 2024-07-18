from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.core.config import settings
from app.core.security import create_access_token
from app.crud.auth import (
    authenticate,
    create_user,
    get_user_by_email,
    get_user_by_username,
)
from app.dependencies import SessionDep
from app.models import Token, UserCreate, UserPublic

router = APIRouter()


@router.post(
    "/register",
    response_model=UserPublic,
    status_code=status.HTTP_201_CREATED,
    summary="Register an user",
    response_description="The Register user",
)
def register_user(*, session: SessionDep, user_in: UserCreate):
    """
    Register a user with all the necessary information.

    ### Args:
    - `session (SessionDep)`: Database session dependency.
    - `user_in (UserCreate)`: User input data required for registration.

    ### Returns:
    - `UserPublic`: The registered user information excluding sensitive data.

    ### Raises:
    - `HTTPException`: If a user with the provided email already exists.

    ### Example:
    ```python
    {
        "email": "user@example.com",
        "full_name": "John Doe",
        "password": "strongpassword"
    }
    ```
    """
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


@router.post("/login/access-token")
def login_access_token(
    session: SessionDep,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    """
    Get an access token for authentication.

    This endpoint authenticates a user's credentials and returns an access token
    if the credentials are valid.

    - `session`: SQLAlchemy database session dependency.
    - `form_data`: OAuth2PasswordRequestForm object containing username and password.

    ## Returns:
    - `Token`: A Token object containing the access token and token type.

    ## Raises:
    - `HTTPException`: If the provided username or password is incorrect.
    """
    user = authenticate(
        session=session, username=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(user.id, access_token_expires)
    return Token(access_token=access_token, token_type="Bearer")
