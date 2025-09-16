# Environment configuration

Create a `.env` file at the project root (same folder as package.json) with:

REACT_APP_BACKEND_URL=http://localhost:3001

This must point to the FastAPI backend base URL. The frontend calls:
- GET /           (health)
- POST /extract   (multipart/form-data)
- POST /format    (application/json)
