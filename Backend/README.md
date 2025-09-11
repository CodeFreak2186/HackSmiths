# HackSmiths Backend

This is the backend service for the HackSmiths project, built using FastAPI.

## 🛠️ Tech Stack

- **Python 3.13**
- **FastAPI** - Modern, fast web framework for building APIs with Python
- **Uvicorn** - Lightning-fast ASGI server
- **Pydantic** - Data validation using Python type annotations

## 🚀 Getting Started

### Prerequisites

- Python 3.13 or higher
- Virtual environment (recommended)

### Installation

1. Create and activate a virtual environment:
   ```powershell
   python -m venv SIH
   .\SIH\Scripts\Activate.ps1
   ```

2. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```

### Running the Server

To start the development server:

```powershell
python main.py
```

Or using uvicorn directly:

```powershell
uvicorn main:app --reload
```

The server will start at `http://localhost:8000`

## 📚 API Documentation

Once the server is running, you can access:
- Interactive API documentation (Swagger UI) at `http://localhost:8000/docs`
- Alternative API documentation (ReDoc) at `http://localhost:8000/redoc`

## 📁 Project Structure

```
Backend/
├── config.py         # Configuration settings
├── database.py      # Database connection and models
├── main.py         # FastAPI application and routes
├── requirements.txt # Project dependencies
└── utils/          # Utility functions and helpers
```

## 📝 Dependencies

Key dependencies include:
- FastAPI v0.116.1
- Uvicorn v0.35.0
- Pydantic v2.11.7
- Other dependencies are listed in `requirements.txt`

## 🔄 API Endpoints

- `GET /` - Root endpoint, returns a welcome message

For detailed API documentation, please refer to the Swagger UI documentation when the server is running.
