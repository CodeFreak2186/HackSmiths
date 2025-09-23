# services/ner_service.py
import re

def extract_fra_data(text: str) -> dict:
    """
    Extract fields from FRA document text using regex/NER.
    Returns dictionary with patta details.
    """
    data = {}

    clean_text = text.encode('ascii', errors='ignore').decode()  # remove non-ASCII
    clean_text = re.sub(r"[•°]", "", clean_text)
    clean_text = re.sub(r"\s+", " ", clean_text)

    def extract_field(pattern):
        match = re.search(pattern, clean_text, re.IGNORECASE)
        return match.group(1).strip() if match else None

    data["holder_name"] = extract_field(r"Holder Name\s*:\s*(.+?)\s")
    data["father_name"] = extract_field(r"Father['’]?s Name\s*:\s*(.+?)\s")
    data["village"] = extract_field(r"Village\s*:\s*(.+?)\s")
    data["district"] = extract_field(r"District\s*:\s*(.+?)\s")
    data["state"] = extract_field(r"State\s*:\s*(.+?)\s")
    claim_type = extract_field(r"Claim Type\s*:\s*(IFR|CR|CFR|Individual Forest Rights)")
    data["claim_type"] = "IFR" if claim_type and "IFR" in claim_type.upper() else claim_type
    data["claim_status"] = extract_field(r"Claim Status\s*:\s*(\w+)")
    data["survey_no"] = extract_field(r"Survey No\s*:\s*(.+?)\s")
    area = extract_field(r"Area\s*:\s*([\d\.]+)")
    data["area"] = float(area) if area else None

    # Extract coordinates
    coords = []
    for match in re.findall(r"(\d+\.\d+)[^\d]+(\d+\.\d+)", clean_text):
        coords.append([float(match[0]), float(match[1])])
    if coords:
        data["coordinates"] = coords

    return data


def coords_to_geojson(coords: list) -> dict:
    """
    Converts list of coordinates to GeoJSON Polygon.
    """
    if not coords or len(coords) < 3:
        return None
    return {"type": "Polygon", "coordinates": [coords]}
