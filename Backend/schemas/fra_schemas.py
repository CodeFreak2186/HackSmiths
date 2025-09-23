from pydantic import BaseModel


class PattaQuery(BaseModel):
    lat: float
    lon: float

class DSSRecommendation(BaseModel):
    patta_id: int
    recommendations: list