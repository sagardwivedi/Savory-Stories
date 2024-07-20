from pydantic import EmailStr
from sqlmodel import Session, select

from app.core.security import get_hash_password, verify_password
from app.models import User, UserCreate


def get_user_by_email(*, session: Session, email: EmailStr) -> User | None:
    """
    Retrieve a user by their email address.

    ### Arguments:
    - `session` (Session): The sqlmodel session to use for the query.
    - `email` (EmailStr): The email address of the user to retrieve.

    ### Returns:
    - `User | None`: The user object if found, otherwise None.
    """
    # Build the query to find a user by email
    statement = select(User).where(User.email == email)
    # Execute the query and return the first result (if any)
    return session.exec(statement=statement).first()


def get_user_by_username(*, session: Session, username: str) -> User | None:
    """
    Retrieve a user by their username.

    ### Arguments:
    - `session` (Session): The sqlmodel session to use for the query.
    - `username` (str): The username of the user to retrieve.

    ### Returns:
    - `User | None`: The user object if found, otherwise None.
    """
    # Build the query to find a user by username
    statement = select(User).where(User.username == username)
    # Execute the query and return the first result (if any)
    return session.exec(statement=statement).first()


def create_user(*, session: Session, user_in: UserCreate) -> User:
    """
    Create a new user in the database.

    ### Arguments:
    - `session` (Session): The sqlmodel session to use for the transaction.
    - `user_in` (UserCreate): The user data to create a new user.

    ### Returns:
    - `User`: The newly created user object.
    """
    # Create a User model instance from the provided data
    db_obj = User.model_validate(
        user_in,
        update={"password_hash": get_hash_password(user_in.password_hash)},
    )
    # Add the user to the session and commit the transaction
    session.add(db_obj)
    session.commit()
    # Refresh the session to get the latest state of the user object
    session.refresh(db_obj)
    return db_obj


def authenticate(*, session: Session, username: str, password: str) -> User | None:
    """
    Authenticate a user by their username and password.

    ### Arguments:
    - `session` (Session): The sqlmodel session to use for the query.
    - `username` (str): The username or email of the user to authenticate.
    - `password` (str): The password provided by the user.

    #### ### Returns:
    - `User | None`: The authenticated user object if the credentials are valid, otherwise None.
    """
    # First try to find the user by email, then by username if not found
    db_user = get_user_by_email(
        session=session, email=username
    ) or get_user_by_username(session=session, username=username)
    if not db_user:
        return None
    # Verify the provided password against the stored hashed password
    if not verify_password(password, db_user.password_hash):
        return None
    return db_user
