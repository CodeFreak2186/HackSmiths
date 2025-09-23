# routers/upload_fi_router.py
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from services.ner_service import extract_fra_data, coords_to_geojson
from database import supabase
import PyPDF2
import io
from google.cloud import vision
from fastapi.encoders import jsonable_encoder

router = APIRouter()

client = vision.ImageAnnotatorClient()


def ocr_google_vision(file_bytes: bytes) -> str:
    """Perform OCR using Google Vision API."""
    image = vision.Image(content=file_bytes)
    response = client.text_detection(image=image)
    if response.error.message:
        raise Exception(f"OCR Error: {response.error.message}")
    return response.text_annotations[0].description


@router.post("/upload_fi")
async def upload_fi(file: UploadFile = File(...)):
    """
    Just extracts the text and NER from uploaded FI document.
    """
    try:
        contents = await file.read()
        text = ""
        if file.filename.lower().endswith(".pdf"):
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
        else:
            text = ocr_google_vision(contents)

        data = extract_fra_data(text)
        return JSONResponse(content={"success": True, "extracted": data})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/upload_fi_save")
async def upload_fi_save(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        text = ""
        if file.filename.lower().endswith(".pdf"):
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
        else:
            text = ocr_google_vision(contents)

        extracted = extract_fra_data(text)
        geojson_polygon = coords_to_geojson(extracted.get("coordinates", []))

        if not geojson_polygon:
            raise HTTPException(status_code=400, detail="Coordinates missing or invalid")

        # Insert into Supabase
        insert_response = supabase.table("fra_pattas").insert({
            "holder_name": extracted.get("holder_name"),
            "father_name": extracted.get("father_name"),
            "village": extracted.get("village"),
            "district": extracted.get("district"),
            "state": extracted.get("state"),
            "claim_type": extracted.get("claim_type"),
            "claim_status": extracted.get("claim_status"),
            "survey_no": extracted.get("survey_no"),
            "area": extracted.get("area"),
            "geom": geojson_polygon,  # Make sure your column is `geom` and type is geometry(Polygon,4326)
            "area_unit": extracted.get("area_unit"),
            "issued_by": extracted.get("issued_by"),
            "issued_date": extracted.get("issued_date"),
            "source_doc": file.filename
        }).execute()

        # Extract **plain dict** from Supabase response
        safe_response = jsonable_encoder(insert_response.data)

        return {"success": True, "extracted": extracted, "supabase_response": safe_response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
