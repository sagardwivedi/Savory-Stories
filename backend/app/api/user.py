from pathlib import Path
from typing import Annotated, Any

from fastapi import APIRouter, File, HTTPException, UploadFile, status
from fastapi.responses import FileResponse, JSONResponse

from app.core.config import settings
from app.crud.user import update_profile_image, update_user_data, upload_profile_image
from app.dependencies import CurrentUser, SessionDep
from app.models import UserRead, UserUpdate

router = APIRouter()


@router.get("/me", response_model=UserRead)
def read_user(current_user: CurrentUser) -> Any:
    return current_user


@router.post("/profile-picture")
def upload_profile_picture(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    file: Annotated[UploadFile, File(...)],
) -> JSONResponse:
    """
    Uploads a new profile picture for the currently logged-in user.

    ### Arguments:
    - `file` (UploadFile): The image file to upload.
    - `session` (Session): The database session.
    - `current_user` (User): The currently logged-in user.

    ### Returns:
    - `JSONResponse`: Confirmation message and the updated profile picture path.
    """
    upload_profile_image(session=session, user=current_user, file=file)
    return JSONResponse(
        content={
            "message": "Profile picture updated successfully",
            "profile_picture": current_user.profile_picture,
        }
    )


@router.patch("/me", response_model=UserRead)
def update_user_me(
    *,
    session: SessionDep,
    user_in: UserUpdate,
    current_user: CurrentUser,
) -> Any:
    update_user_data(session=session, user_in=user_in, current_user=current_user)
    return current_user


@router.get("/profile-picture")
def get_profile_picture(*, current: CurrentUser) -> FileResponse:
    """
    Serve the profile picture of a user.

    ### Arguments:
    - `user_id` (int): The ID of the user whose profile picture is requested.
    - `session` (Session): The database session.

    ### Returns:
    - `FileResponse`: The requested image file.
    """
    if not current.profile_picture:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Profile picture not found",
        )

    # Construct the file path
    file_path = Path(settings.UPLOAD_DIRECTORY) / current.profile_picture

    if not file_path.exists():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Profile picture file not found",
        )

    return FileResponse(file_path)


@router.patch("/profile-picture", response_model=UserRead)
async def update_profile_picture(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    file: Annotated[UploadFile, File(...)],
) -> Any:
    """
    Uploads a new profile picture for the currently logged-in user.

    **Arguments:**
    - `session` (Session): The database session.
    - `current_user` (User): The currently logged-in user.
    - `profile_picture` (UploadFile): The image file to upload.

    **Returns:**
    - `User`: The updated user data.
    """
    filename = update_profile_image(user=current_user, file=file)
    current_user.profile_picture = filename

    # Commit changes to the database
    session.add(current_user)
    session.commit()
    session.refresh(current_user)

    return current_user
