# Intro

If you want to cut to the chase and demo the deployed application, its live at :

https://uk-tax-app.fly.dev

## Developing w/ docker compose


If you'd like to build and run the application locally a docker-compose.yml file is provided for convenience.

You can run the application like so
```
docker compose up --build
```

This will handle:
- setting up postgres
- running database migrations
- bundling the frontend
- building the backend

But this approach will not allow live reloading.
For that, see next section

## Developing with live reload

### 1. Setup postgres locally 

For Mac, these are the commands 
```
brew install postgres@16
brew services start postgres

createuser --superuser postgres
```

### 2. Frontend dev server
```
cd frontend
npm install
npm run dev
```

If this works, you should see the frontend served at http://localhost:4200

### 3. Backend dev server
```
cd backend
# install dotnet-ef & csharpier
dotnet tool restore 

# migrate
dotnet ef database update 

# run server
dotnet watch run --project TaxCalculator
```

If this works you should see the backend at localhost:5000


### Notes
You should use the application from http://localhost:4200, because the frontend dev server is setup to proxy requests to the backend.
For swagger api docs, visit http://localhost:5000/swagger

## E2E tests

Playwright tests are also run via the docker-compose file.

```
docker compose --profile e2e build e2e
docker compose run --rm e2e
```

## Unit Tests
To run backend tests:
```
cd backend
dotnet test
```

I didn't get around to frontend unit tests, just e2e tests.


## CI/CD + Deployments
This project uses Github actions for CI/CD
All pushes to the main branch will automatically run tests, both e2e and unit tests. Then on success it will deploy to https://uk-tax-app.fly.dev

Any pull request to main will require tests to pass before merging.
