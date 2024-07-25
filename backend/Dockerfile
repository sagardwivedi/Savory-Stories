# Stage 1: Install dependencies
FROM python:3.12-alpine AS requirements-stage

WORKDIR /tmp

RUN pip install poetry

COPY ./pyproject.toml ./poetry.lock* /tmp/

RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

# Stage 2: Build the final image
FROM python:3.12-alpine

WORKDIR /code

# Set environment variable to prevent the creation of __pycache__ folders
ENV PYTHONDONTWRITEBYTECODE=1

# Copy the requirements file and install dependencies
COPY --from=requirements-stage /tmp/requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the application code
COPY ./app /code/app

# Expose the port the app runs on
EXPOSE 8000

# Use an entrypoint script for better flexibility
CMD ["fastapi", "run", "app/main.py", "--port", "8000"]
