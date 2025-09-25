from fastapi import APIRouter
from fastapi.responses import JSONResponse
from database import supabase

router = APIRouter()

@router.get("/dss_recommendations")
def dss_recommendations():
    # Fetch all FRA pattas
    res = supabase.table("fra_pattas").select("*").execute()
    pattas = res.data or []

    recommendations_list = []

    for patta in pattas:
        recs = []

        # Rule 1: Small plots
        if patta.get("area") and patta["area"] < 1:
            recs.append("Priority for MGNREGA housing")

        # Rule 2: Medium/Large plots
        if patta.get("area") and patta["area"] >= 1:
            recs.append("Eligible for PM-KISAN benefits")

        # Rule 3: Low water villages
        low_water_villages = ["halaga", "ganganagar", "villageX"]
        if patta.get("village") and patta["village"].lower() in low_water_villages:
            recs.append("Recommended for Jal Jeevan Mission (Water Supply)")

        # Rule 4: Forest coverage
        if patta.get("claim_type") == "IFR" and patta.get("area") and patta["area"] > 2:
            recs.append("Check forest conservation incentives")

        # Rule 5: Pending claims
        if patta.get("claim_status") and patta["claim_status"].lower() != "approved":
            recs.append("Pending approval - monitor status")

        recommendations_list.append({
            "patta_id": patta.get("patta_id"),
            "holder_name": patta.get("holder_name"),
            "village": patta.get("village"),
            "district": patta.get("district"),
            "state": patta.get("state"),
            "recommendations": recs
        })

    return JSONResponse(content={"success": True, "dss_recommendations": recommendations_list})
