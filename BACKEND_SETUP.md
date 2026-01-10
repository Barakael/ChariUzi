# Hotel Booking System - Backend Setup Guide

## Laravel Backend Setup

### 1. Prerequisites
- PHP 8.1 or higher
- Composer
- MySQL or PostgreSQL database

### 2. Database Configuration

Navigate to the backend directory:
```bash
cd backend/cms
```

Copy the environment file:
```bash
cp .env.example .env
```

Edit `.env` and configure your database:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hotel_booking
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 3. Install Dependencies
```bash
composer install
```

### 4. Generate Application Key
```bash
php artisan key:generate
```

### 5. Run Migrations and Seeders
```bash
# Create database tables
php artisan migrate

# Seed services (WiFi, Breakfast, Parking, etc.)
php artisan db:seed --class=ServiceSeeder
```

### 6. Start the Development Server
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

## Frontend Setup

### 1. Navigate to Project Directory
```bash
cd project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment

The `.env.local` file is already created with:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

If your Laravel server runs on a different port, update this value.

### 4. Start Development Server
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user (requires auth)
- `GET /api/auth/me` - Get current user (requires auth)

### Rooms
- `GET /api/rooms` - List all rooms (with filters)
- `GET /api/rooms/{id}` - Get single room
- `POST /api/rooms` - Create room (admin only)
- `PUT /api/rooms/{id}` - Update room (admin only)
- `DELETE /api/rooms/{id}` - Delete room (admin only)
- `POST /api/rooms/{id}/check-availability` - Check room availability

### Services
- `GET /api/services` - List all services
- `POST /api/services` - Create service (admin only)

### Reservations
- `GET /api/reservations` - List reservations (user's own or all for admin)
- `GET /api/reservations/{id}` - Get single reservation
- `POST /api/reservations` - Create reservation (requires auth)
- `PATCH /api/reservations/{id}/status` - Update reservation status
- `POST /api/reservations/{id}/cancel` - Cancel reservation

### Admin
- `GET /api/admin/stats` - Get dashboard statistics (admin only)

## Default Admin Access

To access the admin panel, register or login with an email containing "admin":
- Example: `admin@hotel.com`

This will automatically assign admin role and grant access to:
- Dashboard with statistics
- Room management
- All reservations
- Service management

## Testing the API

You can test the API using:

1. **Postman/Insomnia**: Import the endpoints above
2. **cURL**: Example login request:
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hotel.com","password":"password123"}'
```

3. **Frontend**: The Next.js app will automatically connect to the API

## Troubleshooting

### CORS Issues
If you encounter CORS errors, check `backend/cms/config/cors.php`:
- Ensure `'allowed_origins' => ['*']` is set (for development)
- For production, specify your frontend domain

### Database Connection Failed
- Verify database credentials in `.env`
- Ensure MySQL/PostgreSQL service is running
- Create the database manually if it doesn't exist:
  ```sql
  CREATE DATABASE hotel_booking;
  ```

### Token Authentication Issues
- Ensure Laravel Sanctum is properly installed
- Check that `HasApiTokens` trait is added to User model
- Verify Authorization header format: `Bearer {token}`

### Migration Errors
If migrations fail:
```bash
# Rollback all migrations
php artisan migrate:rollback

# Fresh migration (WARNING: This will drop all tables)
php artisan migrate:fresh --seed
```

## Production Deployment

### Backend
1. Set `APP_ENV=production` in `.env`
2. Set `APP_DEBUG=false`
3. Configure proper database credentials
4. Set allowed CORS origins to your frontend domain
5. Run `php artisan config:cache`
6. Run `php artisan route:cache`

### Frontend
1. Update `NEXT_PUBLIC_API_URL` to your production API URL
2. Build the application: `npm run build`
3. Deploy to Vercel, Netlify, or your preferred hosting

## Database Schema

### Users
- id, name, email, password, role (customer/admin), timestamps

### Rooms
- id, name, description, location, image_url, price_per_night, rating, capacity, featured, category, sub_category, timestamps

### Services
- id, name, key (wifi, breakfast, etc.), timestamps

### Room_Service (pivot)
- room_id, service_id

### Reservations
- id, user_id, room_id, start_date, end_date, nights, status, total_price, payment_method, timestamps
