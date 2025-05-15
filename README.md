A docker-compose.yml file is provided for convenience. 
You can run the application locally with just
```
docker compose up --build
```

This approach will handle:
- setting up postgres
- bundling the frontend
- building the backend
- running database migrations

But this approach will not allow live reloading.
For that, you'll need to follow more specific steps in the frontend/README.md and backend/README.md.

