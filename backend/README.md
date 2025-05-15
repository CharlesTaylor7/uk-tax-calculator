# UK Tax Calculator 

This is the API for the UK Tax Calculator application, built with ASP.NET Core, Entity Framework Core & Postgres.

## Database Setup

To set up the database, follow these steps:


1. Ensure PostgreSQL 16 is installed and running on your system
For mac
```bash
brew install postgres@16
brew services start postgres
```

2. Create a super user named `postgres`: 
```
createuser --superuser postgres
```
3. Run migrations:

```bash
dotnet ef database update
```

## API Endpoints

When running locally, the backend provides swagger docs to help summarize the  apis available. Visit http://localhost:5000/swagger to see them.

## Running the Application

To run the application, use the following command:

```bash
dotnet run --project TaxCalculator
```

The API will be available at `http://localhost:5000`.
Swagger UI is available at `/swagger`.
