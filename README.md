# Intro

If you want to cut to the chase and demo the deployed application, its live at :


https://uk-tax-app.fly.dev

## Developing


If you'd like to build and run the application locally a docker-compose.yml file is provided for convenience.

You can run the application with just
```
docker compose up --build
```

This will handle:
- setting up postgres
- bundling the frontend
- building the backend
- running database migrations

But this approach will not allow live reloading.
For that, you'll need to follow more specific steps in the frontend/README.md and backend/README.md.


## E2E tests

Playwright tests are also run via the docker-compose file.
Simply run 

```
docker compose --profile e2e up --build
```

## Unit Tests
To run backend tests:
```
cd backend
dotnet test
``

To run frontend tests:
```
cd frontend
npm run test
```
