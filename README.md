<h1 align="center">Hi 👋, Welcome to the YouApp Mobile Webapp</h1> <h3 align="center">A comprehensive guide for building a Mobile Webapp with Next.js, Tailwind CSS, and API integration.</h3>

<p align="left"> <img src="https://komarev.com/ghpvc/?username=youapp&label=Project%20views&color=0e75b6&style=flat" alt="youapp" /> </p>

# Prerequites
## 🛠️ Project Setup
- [NodeJs](https://nodejs.com) (v14.x or higher)
- npm (v6.x or higher) or yarn

# Installation

1. Clone the repository:
```bash
    git clone https://github.com/your-repo/youapp-mobile-webapp.git
    cd youapp-mobile-webapp
```

2. Install dependencies: 
```bash
npm install
# or
yarn install
```

# Environtment Variables
Create a .env.local file in the root directory and add the following environment variables:

```
NEXT_PUBLIC_API=http://techtest.youapp.ai
```

# Running the Development Server 
Start the development server:

```
npm run dev
# or
yarn dev
```
Open http://localhost:3000 with your browser to see the result.

# 🌲 Project Structure 
The project follows a modular and scalable folder structure:
```
.
├── components
│   ├── ProfileForm.tsx
│   ├── LoginForm.tsx
│   └── RegisterForm.tsx
├── pages
│   ├── _app.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── profile.tsx
│   └── register.tsx
├── services
│   ├── api.ts
│   └── auth.ts
├── styles
│   ├── globals.css
│   └── tailwind.css
├── utils
│   └── horoscope.ts
├── .env.local
├── next.config.js
└── tailwind.config.js
```

# 🎨 Tailwind Css Configuration
The Tailwind CSS is configured to be modular and customized according to the design specifications.

## tailwind.config.js

```Javascript
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#1E3A8A',
      },
    },
  },
  plugins: [],
}
```

# 🚀Good Design Patterns

<ul>
    <li>Separation of Concerns: Components and services are separated for better maintainability and readability.</li>
    <li>Reusable Components: UI components are designed to be reusable across different pages.</li>
    <li>API Service Layer: All API calls are managed through a central service layer.</li>
</ul>

# 🧷API Integration
The application connects to the following API endpoints:

## Login
 - URL: /api/login

 - Method: POST

 - Description: Authenticates a user and returns a JWT token.

## Register 
- URL: /api/register

- Method: POST

- Description: Registers a new user.

## Get Profile

- URL: /api/profile

- Method: GET

- Description: Retrieves the authenticated user's profile.

## Update Profile 
- URL: /api/profile

- Method: PUT

- Description: Updates the authenticated user's profile.

# 🦁 Horoscope / Zodiac Calculations
The application includes a utility for calculating horoscope and zodiac signs based on the user's birthdate.

## helper/helperEdit.ts
``` Typescript

export const getHoroscope = (birthdate: Date): string => {
  // Implementation based on the provided spreadsheet
  // ...
  return 'Your Horoscope';
}

export const getZodiac = (birthdate: Date): string => {
  // Implementation based on the provided spreadsheet
  // ...
  return 'Your Zodiac';
}
```

# 🛠️ Mocking API (If is API Down Server /Offline)
If the API is not accessible, you can mock the API responses using a local server or a mocking library. For example, using json-server:

### install json-server:

``` Bash 
npm install -g json-server
```

### Create a db.json file with mock data:
```Json
{
  "users": [
    {
      "id": 1,
      "username": "testuser",
      "password": "password123",
      "email": "test@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "birthdate": "1990-01-01",
      "horoscope": "Capricorn",
      "zodiac": "Horse"
    }
  ]
}

```

### Start the mock server:
```bash
json-server --watch db.json --port 4000
```

### Update the .env.local file:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

# 😶‍🌫️ Contributing
if you wish to contribute, please follow these steps:

1. Fork the repository.

2. Create a new branch (git checkout -b feature/your-feature).

3. Commit your changes (git commit -am 'Add new feature').

4. Push to the branch (git push origin feature/your-feature).

5. Create a new Pull Request.

# 🗒️ License

This project is licensed under the MIT License.