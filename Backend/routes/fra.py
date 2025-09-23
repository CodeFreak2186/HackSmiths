from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
from database import supabase

router = APIRouter()


def clean_geojson_for_leaflet(fra_featurecollection):
    for feature in fra_featurecollection.get("features", []):
        feature["geometry"].pop("crs", None)  # remove crs if exists
    return fra_featurecollection


@router.get("/fra_pattas")
async def get_fra_pattas(
    state: str = None,
    district: str = None,
    village: str = None,
    claim_type: str = None
):
    query = supabase.table("fra_pattas")
    if state:
        query = query.eq("state", state)
    if district:
        query = query.eq("district", district)
    if village:
        query = query.eq("village", village)
    if claim_type:
        query = query.eq("claim_type", claim_type)

    res = query.select("*").execute()
    pattas = res.data


    # Convert to GeoJSON FeatureCollection
    features = []
    for p in pattas:
        if not p.get("geom"):
            continue
        features.append({
            "type": "Feature",
            "geometry": p["geom"],  # Must already be GeoJSON-like {type: Polygon, coordinates: [...]}
            "properties": {
                "holder_name": p.get("holder_name"),
                "village": p.get("village"),
                "district": p.get("district"),
                "state": p.get("state"),
                "claim_type": p.get("claim_type"),
                "claim_status": p.get("claim_status"),
                "survey_no": p.get("survey_no"),
                "area": p.get("area"),
            }
        })  
    geojson = {
        "type": "FeatureCollection",
        "features": features
    }
    
    clean_geojson = clean_geojson_for_leaflet(geojson)
    return JSONResponse(content=clean_geojson)
