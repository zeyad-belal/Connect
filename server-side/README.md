# Routes

## User

- **POST** `/users/dashboard/login`
- **PATCH** `/users/dashboard/:id`
- **POST** `/users/signup`
- **POST** `/users/login`
- **GET** `/users`
- **GET** `/users/:id`
- **PATCH** `/users/:id`
- **DELETE** `/users/:id`

## Category

- **POST** `/categories`
- **GET** `/categories`
- **GET** `/categories/:id`
- **PATCH** `/categories/:id`
- **DELETE** `/categories/:id`

## Brand

- **POST** `/brands`
- **GET** `/brands`
- **GET** `/brands?category_name=Laptops`
- **GET** `/brands/:id`
- **PATCH** `/brands/:id`
- **DELETE** `/brands/:id`

## Product

- **POST** `/products`
- **GET** `/products`
- **GET** `/products/:id`
- **PUT** `/products/:id`
- **DELETE** `/products/:id`

## Review

- **POST** `/reviews`
- **GET** `/reviews`
- **DELETE** `/reviews/:id`

## Order

- **POST** `/orders`
- **GET** `/orders`
- **GET** `/orders/:id`
- **GET** `/orders/user/:id`
- **PUT** `/orders/:id`
- **DELETE** `/orders/:id`
