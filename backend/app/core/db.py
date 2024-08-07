from sqlmodel import create_engine

# Specify the SQLite database URL
sqlite_url = "sqlite:///database.db"

# Create the engine with more options
engine = create_engine(
    sqlite_url,
    echo=True,
    connect_args={"check_same_thread": False},
    pool_size=5,
    max_overflow=10,
    pool_timeout=30,
    pool_recycle=1800,
)
