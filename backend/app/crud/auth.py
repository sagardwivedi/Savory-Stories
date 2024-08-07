from pydantic import EmailStr
from sqlmodel import Session, select

from app.core.security import get_password_hash, verify_password
from app.models import User, UserCreate


def get_user_by_email(*, session: Session, email: EmailStr) -> User | None:
    # Build the query to find a user by email
    statement = select(User).where(User.email == email)
    # Execute the query and return the first result (if any)
    return session.exec(statement=statement).first()


def get_user_by_username(*, session: Session, username: str) -> User | None:
    # Build the query to find a user by username
    statement = select(User).where(User.username == username)
    # Execute the query and return the first result (if any)
    return session.exec(statement=statement).first()


def create_user(*, session: Session, user_in: UserCreate) -> User:
    # Create a User model instance from the provided data
    db_obj = User.model_validate(
        user_in,
        update={"password_hash": get_password_hash(user_in.password)},
    )
    # Add the user to the session and commit the transaction
    session.add(db_obj)
    session.commit()
    # Refresh the session to get the latest state of the user object
    session.refresh(db_obj)
    return db_obj


def authenticate(*, session: Session, username: str, password: str) -> User | None:
    # First try to find the user by email, then by username if not found
    db_user = get_user_by_email(
        session=session, email=username
    ) or get_user_by_username(session=session, username=username)
    if not db_user:
        return None
    # Verify the provided password against the stored hashed password
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user
