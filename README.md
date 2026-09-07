# Post, Chat, and E-Commerce System

A Post, Chat, and E-Commerce system built with Laravel and React.

## Development Progress

### 5/6/2026 — Authentication and Authorization

- Integrated JWT authentication.
- Added register, login, logout, and refresh token APIs.
- Stored access tokens in Redux state.
- Stored refresh tokens in cookies.
- Added protected routes.
- Implemented Redux Toolkit Query.

### 6/6/2026 — Post Management

- Implemented Post CRUD APIs.
- Added cursor pagination.
- Added infinite scrolling support.
- Used eager loading to prevent N+1 queries.
- Organized business logic into service classes and validation requests.

### 8/9/2026 — Media Upload and Authorization

- Added image and video upload using Cloudinary.
- Added media edit, replace, and delete functionality.
- Used Laravel model binding for posts and media.
- Added polymorphic relationships using `morphMany`.
- Prepared media support for posts, comments, messages, and chats.
- Added Gates and Policies.
- Users can only edit and delete their own posts and media.

## Planned Features

- Background media uploads using Laravel Queues.
- Media APIs for comments, messages, and chats.
- Additional e-commerce features.

## Tech Stack

- Laravel
- React
- JWT
- Redux Toolkit Query
- MySQL
- Cloudinary
