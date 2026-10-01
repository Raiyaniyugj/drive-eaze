# DriveEase - Premium Driver Booking Platform

DriveEase is a marketplace where people hire verified drivers by the hour, day, week, or month. Built with a premium, trustworthy design matching a luxury concierge service.

## Tech Stack
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Data**: Mock JSON in `src/data/drivers.json`

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Pages Overview
- `/` - Landing page with booking widget, pricing, and safety features.
- `/search` - Driver search results with filters (mocked).
- `/driver/[id]` - Driver profile and booking calculator.
- `/book/[id]` - Multi-step booking flow and mock payment.
- `/dashboard` - Customer dashboard with live tracking and booking history.
- `/driver-application` - Driver benefits and multi-step onboarding form.
- `/login` - Role selection and phone OTP flow.
- `/admin` - Admin KPIs, revenue charts, and driver approval queues.

---

## Next Steps (Backend Integration)

To take this from a frontend prototype to a production app, here is the list of services you need to connect next:

### 1. Database & Authentication (Supabase / PostgreSQL)
- **Replace Mock Data:** Replace `src/data/drivers.json` with API calls to your database.
- **Data Models needed:** `Users` (Customers & Admins), `Drivers` (Profile, Verification Docs), `Bookings` (Status, Timestamps, Pricing), `Reviews`.
- **Auth:** Implement Supabase Auth or NextAuth.js to handle the session.

### 2. SMS OTP & Phone Verification
- **Integration:** Connect an SMS gateway like **Twilio**, **MessageBird**, or **Firebase Auth** (Phone) in the `/login` flow.
- Ensure OTP rate limiting and verification endpoints are secured.

### 3. Payments (Razorpay)
- **Integration:** Integrate Razorpay SDK in the final step of `/book/[id]`.
- Implement Razorpay webhooks on the backend to update the booking status from `pending` to `confirmed`.

### 4. Maps & Location (Google Maps API / Mapbox)
- **Landing Widget:** Implement Google Places Autocomplete for Pickup/Drop locations.
- **Search Page:** Replace the map placeholder in the map view with an interactive map showing driver pins.
- **Dashboard Tracking:** Use Google Maps Directions API to show the live route and simulated/actual live GPS coordinates of the driver.

### 5. File Storage
- Connect an S3 bucket or Supabase Storage for the driver document uploads (Aadhaar, License, Profile Photo) in the `/driver-application` flow.

### 6. Forms & Validation
- Implement `react-hook-form` and `zod` for strict validation on the driver application and booking forms to ensure data integrity before sending to the backend.
