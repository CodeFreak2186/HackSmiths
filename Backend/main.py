
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import os
import uvicorn

app = FastAPI(title="SIH2025-Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to frontend origin in prod
    allow_methods=["*"],
    allow_headers=["*"],
)





@app.get("/")
def read_root():
    return {"message": "Hello, World!"}


from routes.auth import router as auth_router
from routes.fra import router as fra_router
from routes.ocr_ner import router as ocr_ner_router


app.include_router(auth_router, prefix="/auth", tags=["Auth"]) 
app.include_router(fra_router, prefix="/fra", tags=["FRA"])
app.include_router(ocr_ner_router, prefix="/ocr_ner", tags=["OCR_NER"])



if __name__ == "__main__":
    import uvicorn 
    uvicorn.run(app, port=8000)
