# Unify Bangladesh

A modern e-commerce platform for authentic cosmetics and beauty products, built with React and Firebase.

## Features

- 🛍️ **Product Catalog**: Browse authentic cosmetics from trusted global brands
- 🔐 **User Authentication**: Secure login/registration with Firebase Auth
- 🛒 **Shopping Cart**: Add products to cart with quantity management
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 👤 **User Profiles**: Manage personal information and order history
- 🔒 **Admin Panel**: Product management and order tracking for administrators
- 🚚 **Order Management**: Complete order processing with delivery tracking
- 💳 **Cash on Delivery**: Secure payment option for Bangladesh market

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **UI Components**: Lucide React, React Icons, Framer Motion
- **Image Upload**: Cloudinary
- **Routing**: React Router DOM
- **Notifications**: React Toastify

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd unifybangladesh
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

5. Start the development server:
```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── Components/          # Reusable UI components
├── Pages/              # Page components
├── Middlewares/        # Route protection and middleware
├── CSS/               # Component-specific styles
├── firebase.jsx       # Firebase configuration
├── AuthContext.jsx    # Authentication context
├── App.jsx           # Main app component
└── main.jsx          # App entry point
```

## Key Features

### Authentication
- User registration and login
- Protected routes for authenticated users
- Role-based access control (admin/customer)

### Product Management
- Product catalog with categories
- Search and filter functionality
- Product details with image gallery
- Admin product management

### Shopping Experience
- Shopping cart with persistent storage
- Quantity management
- Delivery location selection
- Order checkout process

### Admin Features
- Product addition with image upload
- Order management and status tracking
- Customer information access

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries, please contact:
- Email: unifybangladesh3@gmail.com
- Phone: +880 1877 507742
