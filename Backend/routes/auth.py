from fastapi import APIRouter, Depends, HTTPException
from schemas.auth_schemas import UserRegister, UserLogin
from services.auth_service import register_user, authenticate_user

router = APIRouter()



@router.post("/register")
def register(user: UserRegister):
    data = register_user(user.email, user.password)
    return {"message": "User registered", "user": data}

@router.post("/login")
def login(user: UserLogin):
    auth_user = authenticate_user(user.email, user.password)
    if "error" in auth_user:
        raise HTTPException(status_code=401, detail=auth_user["error"])
    
    return {
        "message": "Login successful",
        "access_token": auth_user["session"].access_token,
        "user": auth_user["session"].user
    }