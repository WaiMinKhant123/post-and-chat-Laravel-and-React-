### Post and Chat System with Ecommerence by Laravel+React

## Features Implemented 

### Authentication & Authorization (5/6/26)
- **JWT Authentication:** Integrated JSON Web Tokens (JWT) for secure, stateless API authentication between Laravel backend and React frontend.
- **Protected Routes:** Enforced auth middleware on logout and refresh endpoints.
- **Refresh to Renew Barear Token:** Make access JWT tokens saved in redux state and refresh token is saved in cookies, so hacker can't steal token.
- **Redux RTK query implementation:** Make rtk query in redux for register,login,logout,refresh.

### Post Management & Media Upload (6/6/26)
- **Post CRUD API:** Built Laravel endpoints for creating, fetching, updating, and deleting posts.
- **Performance Scabalitity:** Use cursorpaginate to show lastest 20(default) and max 50 to get infinite scrolling in react ui,I feed 1000 posts data but still good performance.
- **Avoiding N+1 queries** I avoid N+1 queries by Eager Loading to avoid lazy Loading.
- **Polymorphic Media Upload:** Integrated Laravel polymorphic relationships (`morphMany`) to handle image and video uploads for both posts,messages and chat on Cloudinary.
- **Clean Code:** Write all Laravel codes in clean and refactor easy form.Split as services and validations so Controllers are only need to receive requests and sent response.
- **To Reminder:** Need to make photo and video upload in background by using queue.
