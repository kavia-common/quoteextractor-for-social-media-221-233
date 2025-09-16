# Quote Extractor Frontend (React)

This app provides a clean UI to:
- Upload a transcript file (.txt, .srt, .vtt) or paste text
- Extract key quotes using the backend
- Edit, reorder, or remove quotes
- Format quotes for specific platforms (Twitter, LinkedIn, Instagram, Generic)
- Export and copy formatted quotes for social sharing

## Configure backend URL
Set the backend URL in `.env`:

REACT_APP_BACKEND_URL=http://localhost:3001

See ENVIRONMENT.md for details.

## Scripts

- `npm start` – start dev server at http://localhost:3000
- `npm test` – run tests
- `npm run build` – production build

## Notes
- The UI integrates with the API described in kavia-docs/PRD-Quote-Extractor-for-Social-Media.md and the OpenAPI spec.
- Endpoints used: GET `/`, POST `/extract`, POST `/format`.
