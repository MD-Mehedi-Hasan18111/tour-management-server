## Server Live Link: https://digital-cow-market.vercel.app

# Application Routes:
## Main Part
--------------------------------------------------------------------------------------------------------------------
## Auth (Users)
- Route: https://digital-cow-market.vercel.app/api/v1/auth/signup (POST)
- Route: https://digital-cow-market.vercel.app/api/v1/auth/login (POST)
- Route: https://digital-cow-market.vercel.app/api/v1/auth/refresh-token (POST)

## Auth (Admin)
- Route: https://digital-cow-market.vercel.app/api/v1/admins/create-admin (POST)
- Route: https://digital-cow-market.vercel.app/api/v1/admins/login (POST)

## Cows
- /api/v1/cows (POST)
- /api/v1/cows (GET)
- /api/v1/cows/648dba83f2bfbbf7c362505d (GET)
- /api/v1/cows/648dba83f2bfbbf7c362505d (PATCH)
- /api/v1/cows/648c465979478036af592bea (DELETE)

## Pagination and Filtering routes of Cows
- /api/v1/cows?page=1&limit=10 (GET)
- /api/v1/cows?sortBy=price&sortOrder=asc (GET)
- /api/v1/cows?minPrice=20000&maxPrice=70000 (GET)
- /api/v1/cows?location=Chattogram (GET)
- /api/v1/cows?searchTerm=Cha (GET)

## Orders
- /api/v1/orders (POST)
- /api/v1/orders (GET)
- /api/v1/orders/648c92e09dbe70f989ee9d25 (GET)