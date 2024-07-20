import os
import shutil
from pathlib import Path

from fastapi import HTTPException, UploadFile, status
from sqlmodel import Session

from app.core.config import settings
from app.crud.auth import get_user_by_email, get_user_by_username
from app.models import User, UserUpdate

# Ensure the upload directory exists
os.makedirs(settings.UPLOAD_DIRECTORY, exist_ok=True)


def update_profile_image(*, user: User, file: UploadFile) -> str:
    """
    Handles the upload of a profile picture for a given user.

    **Arguments:**
    - `user` (User): The user whose profile picture is being updated.
    - `file` (UploadFile): The image file to upload.

    **Returns:**
    - `str`: The filename of the uploaded profile picture.

    **Raises:**
    - HTTPException: If the file is not a valid image.
    """
    if file.content_type is None or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded file is not a valid image.",
        )

    # Create a unique filename
    filename = f"{user.user_id}_{file.filename}"
    file_path = Path(settings.UPLOAD_DIRECTORY) / filename

    # Save the file
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return filename


def upload_profile_image(*, session: Session, user: User, file: UploadFile) -> None:
    """
    Uploads a profile picture for the given user and updates the database with the file path.

    **Arguments:**
    - `session` (Session): The database session.
    - `user` (User): The user whose profile picture is being updated.
    - `file` (UploadFile): The image file to upload.

    **Raises:**
    - HTTPException: If the file is not a valid image or if the upload fails.
    """
    # Validate file type
    if file.content_type is None or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400, detail="The uploaded file is not a valid image."
        )

    # Create unique filename
    filename = f"{user.user_id}_{file.filename}"
    file_path = Path(settings.UPLOAD_DIRECTORY) / filename

    try:
        # Save the file
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Update the user's profile picture path
        user.profile_picture = str(file_path.relative_to(settings.UPLOAD_DIRECTORY))

        # Commit changes to the database
        session.add(user)
        session.commit()
        session.refresh(user)
    except Exception as e:
        # Handle errors during file operations or database commit
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while uploading the file: {str(e)}",
        )


def update_user_data(
    *, session: Session, user_in: UserUpdate, current_user: User
) -> None:
    """
    Updates user data in the database.

    **Arguments:**
    - `session` (Session): The database session.
    - `user_in` (UserUpdate): The data to update.
    - `current_user` (User): The currently logged-in user.

    **Raises:**
    - HTTPException: If there is a conflict with existing email or username.
    """
    # Retrieve current user data from the session
    existing_user_by_email = None
    existing_user_by_username = None

    if user_in.email and user_in.email != current_user.email:
        existing_user_by_email = get_user_by_email(session=session, email=user_in.email)

    if user_in.username and user_in.username != current_user.username:
        existing_user_by_username = get_user_by_username(
            session=session, username=user_in.username
        )

    # Check for email conflict
    if (
        existing_user_by_email
        and existing_user_by_email.user_id != current_user.user_id
    ):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this email already exists",
        )

    # Check for username conflict
    if (
        existing_user_by_username
        and existing_user_by_username.user_id != current_user.user_id
    ):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this username already exists",
        )

    user_data = user_in.model_dump(exclude_unset=True)
    current_user.sqlmodel_update(user_data)
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
