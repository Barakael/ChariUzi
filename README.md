# ChariUzi - Hotel Booking System

A full-stack hotel booking system built with Next.js (frontend) and Laravel (backend).

## Features

### For Customers
- 🏨 Browse available rooms with real-time availability
- 📅 Book rooms with calendar date selection
- 💳 Multiple payment methods (card/mobile money)
- 📱 View booking history and reservations
- 🔐 Secure authentication with role-based access

### For Administrators
- 📊 Dashboard with booking statistics
- 🛏️ Room management (create, update, delete)
- 🔧 Service management (WiFi, breakfast, parking, etc.)
- 💰 Payment tracking and revenue reporting
- 👥 View and manage all customer reservations

## Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Context** for state management

### Backend
- **Laravel 10+** PHP framework
- **Laravel Sanctum** for API authentication
- **MySQL/PostgreSQL** database
- **RESTful API** architecture

## Quick Start

### Prerequisites
- Node.js 18+
- PHP 8.1+
- Composer
- MySQL or PostgreSQL

### Backend Setup
```bash
cd backend/cms
composer install
cp .env.example .env
# Edit .env with your database credentials
php artisan key:generate
php artisan migrate
php artisan db:seed --class=ServiceSeeder
php artisan serve
```

### Frontend Setup
```bash
cd project
npm install
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Documentation

- [Backend Setup Guide](./BACKEND_SETUP.md) - Detailed Laravel setup instructions
- [Implementation Details](./IMPLEMENTATION.md) - Architecture and API documentation

## Default Admin Access

Register or login with an email containing "admin" to get admin privileges:
- Example: `admin@hotel.com`

## API Endpoints

See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for complete API documentation.

## Project Structure

```
ChariUzi/
├── backend/cms/          # Laravel backend API
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── ...
├── project/              # Next.js frontend
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── ...
├── BACKEND_SETUP.md     # Setup guide
└── IMPLEMENTATION.md    # Technical documentation
```

## Contributing

This project is part of a hotel booking system implementation. Feel free to open issues or submit PRs.

## License

MIT
