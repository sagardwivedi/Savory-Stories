from datetime import datetime

from sqlmodel import Field, Relationship, SQLModel


# User Base Model
class UserBase(SQLModel):
    username: str = Field(unique=True, max_length=50)
    email: str = Field(unique=True, max_length=100)
    bio: str | None = Field(default=None, max_length=500)
    profile_picture: str | None = Field(default=None, max_length=255)


# User Create Model
class UserCreate(UserBase):
    password_hash: str


# User Update Model
class UserUpdate(SQLModel):
    username: str | None = None
    email: str | None = None
    bio: str | None = None


# User Read Model
class UserRead(UserBase):
    user_id: int
    created_at: datetime


# User Table Model
class User(UserBase, table=True):
    user_id: int | None = Field(default=None, primary_key=True)
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.now)

    recipes: list["Recipe"] = Relationship(back_populates="user")
    comments: list["Comment"] = Relationship(back_populates="user")
    ratings: list["Rating"] = Relationship(back_populates="user")
    followers: list["Follower"] = Relationship(
        back_populates="follower",
        sa_relationship_kwargs={"foreign_keys": "[Follower.follower_id]"},
    )
    following: list["Follower"] = Relationship(
        back_populates="followed",
        sa_relationship_kwargs={"foreign_keys": "[Follower.followed_id]"},
    )


# Recipe Base Model
class RecipeBase(SQLModel):
    title: str = Field(max_length=100)
    description: str
    instructions: str
    prep_time: int
    cook_time: int
    servings: int


# Recipe Create Model
class RecipeCreate(RecipeBase):
    user_id: int


# Recipe Update Model
class RecipeUpdate(SQLModel):
    title: str | None = None
    description: str | None = None
    instructions: str | None = None
    prep_time: int | None = None
    cook_time: int | None = None
    servings: int | None = None


# Recipe Read Model
class RecipeRead(RecipeBase):
    recipe_id: int
    user_id: int
    created_at: datetime


# Recipe Table Model
class Recipe(RecipeBase, table=True):
    recipe_id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.user_id")
    created_at: datetime = Field(default_factory=datetime.now)

    user: User = Relationship(back_populates="recipes")
    ingredients: list["RecipeIngredient"] = Relationship(back_populates="recipe")
    comments: list["Comment"] = Relationship(back_populates="recipe")
    ratings: list["Rating"] = Relationship(back_populates="recipe")
    categories: list["RecipeCategory"] = Relationship(back_populates="recipe")


# Ingredient Base Model
class IngredientBase(SQLModel):
    name: str = Field(unique=True, max_length=100)


# Ingredient Create Model
class IngredientCreate(IngredientBase):
    pass


# Ingredient Update Model
class IngredientUpdate(SQLModel):
    name: str | None = None


# Ingredient Read Model
class IngredientRead(IngredientBase):
    ingredient_id: int


# Ingredient Table Model
class Ingredient(IngredientBase, table=True):
    ingredient_id: int | None = Field(default=None, primary_key=True)

    recipes: list["RecipeIngredient"] = Relationship(back_populates="ingredient")


# RecipeIngredient Base Model
class RecipeIngredientBase(SQLModel):
    quantity: str = Field(max_length=50)


# RecipeIngredient Create Model
class RecipeIngredientCreate(RecipeIngredientBase):
    recipe_id: int
    ingredient_id: int


# RecipeIngredient Update Model
class RecipeIngredientUpdate(SQLModel):
    quantity: str | None = None


# RecipeIngredient Read Model
class RecipeIngredientRead(RecipeIngredientBase):
    recipe_id: int
    ingredient_id: int


# RecipeIngredient Table Model
class RecipeIngredient(RecipeIngredientBase, table=True):
    recipe_id: int = Field(foreign_key="recipe.recipe_id", primary_key=True)
    ingredient_id: int = Field(foreign_key="ingredient.ingredient_id", primary_key=True)

    recipe: Recipe = Relationship(back_populates="ingredients")
    ingredient: Ingredient = Relationship(back_populates="recipes")


# Comment Base Model
class CommentBase(SQLModel):
    content: str


# Comment Create Model
class CommentCreate(CommentBase):
    recipe_id: int
    user_id: int


# Comment Update Model
class CommentUpdate(SQLModel):
    content: str | None = None


# Comment Read Model
class CommentRead(CommentBase):
    comment_id: int
    recipe_id: int
    user_id: int
    created_at: datetime


# Comment Table Model
class Comment(CommentBase, table=True):
    comment_id: int | None = Field(default=None, primary_key=True)
    recipe_id: int = Field(foreign_key="recipe.recipe_id")
    user_id: int = Field(foreign_key="user.user_id")
    created_at: datetime = Field(default_factory=datetime.now)

    recipe: Recipe = Relationship(back_populates="comments")
    user: User = Relationship(back_populates="comments")


# Rating Base Model
class RatingBase(SQLModel):
    rating: int = Field(ge=1, le=5)


# Rating Create Model
class RatingCreate(RatingBase):
    recipe_id: int
    user_id: int


# Rating Update Model
class RatingUpdate(SQLModel):
    rating: int | None = None


# Rating Read Model
class RatingRead(RatingBase):
    rating_id: int
    recipe_id: int
    user_id: int
    created_at: datetime


# Rating Table Model
class Rating(RatingBase, table=True):
    rating_id: int | None = Field(default=None, primary_key=True)
    recipe_id: int = Field(foreign_key="recipe.recipe_id")
    user_id: int = Field(foreign_key="user.user_id")
    created_at: datetime = Field(default_factory=datetime.now)

    recipe: Recipe = Relationship(back_populates="ratings")
    user: User = Relationship(back_populates="ratings")


# Category Base Model
class CategoryBase(SQLModel):
    name: str = Field(unique=True, max_length=50)


# Category Create Model
class CategoryCreate(CategoryBase):
    pass


# Category Update Model
class CategoryUpdate(SQLModel):
    name: str | None = None


# Category Read Model
class CategoryRead(CategoryBase):
    category_id: int


# Category Table Model
class Category(CategoryBase, table=True):
    category_id: int | None = Field(default=None, primary_key=True)

    recipes: list["RecipeCategory"] = Relationship(back_populates="category")


# RecipeCategory Base Model
class RecipeCategoryBase(SQLModel):
    pass


# RecipeCategory Create Model
class RecipeCategoryCreate(RecipeCategoryBase):
    recipe_id: int
    category_id: int


# RecipeCategory Update Model
class RecipeCategoryUpdate(SQLModel):
    pass


# RecipeCategory Read Model
class RecipeCategoryRead(RecipeCategoryBase):
    recipe_id: int
    category_id: int


# RecipeCategory Table Model
class RecipeCategory(RecipeCategoryBase, table=True):
    recipe_id: int = Field(foreign_key="recipe.recipe_id", primary_key=True)
    category_id: int = Field(foreign_key="category.category_id", primary_key=True)

    recipe: Recipe = Relationship(back_populates="categories")
    category: Category = Relationship(back_populates="recipes")


# Follower Base Model
class FollowerBase(SQLModel):
    pass


# Follower Create Model
class FollowerCreate(FollowerBase):
    follower_id: int
    followed_id: int


# Follower Update Model
class FollowerUpdate(FollowerBase):
    pass


# Follower Read Model
class FollowerRead(FollowerBase):
    follower_id: int
    followed_id: int
    created_at: datetime


# Follower Table Model
class Follower(FollowerBase, table=True):
    follower_id: int = Field(foreign_key="user.user_id", primary_key=True)
    followed_id: int = Field(foreign_key="user.user_id", primary_key=True)
    created_at: datetime = Field(default_factory=datetime.now)

    follower: User = Relationship(
        back_populates="following",
        sa_relationship_kwargs={"foreign_keys": "[Follower.follower_id]"},
    )
    followed: User = Relationship(
        back_populates="followers",
        sa_relationship_kwargs={"foreign_keys": "[Follower.followed_id]"},
    )


class Token(SQLModel):
    access_token: str
    token_type: str = "Bearer"


class TokenPayload(SQLModel):
    sub: int | None
