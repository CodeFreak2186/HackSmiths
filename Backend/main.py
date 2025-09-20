
from fastapi import FastAPI

import os
import uvicorn

app = FastAPI()



@app.get("/")
def read_root():
    return {"message": "Hello, World!"}


from routes.auth import router as auth_router

app.include_router(auth_router, prefix="/auth", tags=["Auth"]) 









if __name__ == "__main__":
    import uvicorn 
    uvicorn.run(app, port=8000)
