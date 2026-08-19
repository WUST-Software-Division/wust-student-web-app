# WUST Student Life

The WUST Student Life web app is the student-facing digital home for Washington University of Science and Technology. It helps students discover activities, organizations, career opportunities, success stories, discussions, events, and support.

## Features

- WUST Student Life homepage and responsive navigation
- Activity directory and student organization directory
- Student forum with community categories and support flows
- Career board and student success stories
- Reusable section components and typed content data
- Accessible skip navigation, responsive layouts, and reduced-motion support

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React icons

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
```

## Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    activity/
    career/
    discussion/
    organization/
    success/
  components/
    common/
    layout/
    sections/
  config/
  data/
```

## Content Model

Most page content lives in `src/data/` as TypeScript data modules. UI sections consume those data objects through reusable components, so content can later move to an API without changing the page layout system.

## Deployment

The app can be deployed to any platform that supports Next.js, such as Vercel or a Node.js server.

Build the production app:

```bash
npm run build
```

Start production mode:

```bash
npm run start
```

## Future Backend

The current project is frontend-only. A backend or API can be added later by replacing the TypeScript data imports with API calls while preserving the existing component structure.
