from pydantic import EmailStr
from sqlmodel import Session, select

from app.core.security import get_hash_password, verify_password
from app.models import User, UserCreate


def get_user_by_email(*, session: Session, email: EmailStr) -> User | None:
    statment = select(User).where(User.email == email)
    return session.exec(statement=statment).first()


def get_user_by_username(*, session: Session, username: str) -> User | None:
    statment = select(User).where(User.username == username)
    return session.exec(statement=statment).first()


def create_user(*, session: Session, user_in: UserCreate) -> User:
    db_obj = User.model_validate(
        user_in,
        update={"hashed_password": get_hash_password(user_in.password)},
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


def authenticate(*, session: Session, username: str, password: str) -> User | None:
    db_user = get_user_by_email(
        session=session, email=username
    ) or get_user_by_username(session=session, username=username)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user
