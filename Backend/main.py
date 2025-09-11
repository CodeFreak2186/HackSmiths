# main.py

from fastapi import FastAPI
import os
import uvicorn

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}



if __name__ == "__main__":
    import uvicorn # pyright: ignore[reportMissingImports]
    uvicorn.run(app, port=8000)
