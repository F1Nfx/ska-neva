<div align="center">
  <h1>⚽ SKA-Neva — Club Website</h1>
  <p><strong>A website for SKA-Neva, built with Vue 3 and TypeScript</strong></p>
  <p>
    <a href="https://ska-neva.vercel.app/">
      <img src="https://img.shields.io/badge/Live_Demo-Visit_Website-1F6FEB?style=for-the-badge" alt="Live demo" />
    </a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/Vue.js-3-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white" alt="Vue 3" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Pinia-FADA5E?style=flat-square&logo=pinia&logoColor=black" alt="Pinia" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  </p>
</div>
---
About the Project
SKA-Neva is a web application for a sports club. It provides a single place to explore club information, the team roster, match details, news, and related content.
The frontend is built as a Vue single-page application and communicates with a separate backend repository: ska-neva-api.
Main Sections
Home — the main club page.
Matches — match list and individual match pages.
Team — roster and individual player profiles.
News — news list and article pages.
Club — club information.
Tickets — ticket information page.
Admin area — login and dashboard views for content management.
The application uses Vue Router for navigation and Pinia for state management.
Tech Stack
Technology	Purpose
Vue 3	Component-based user interface
TypeScript	Static typing
Vue Router	Client-side routing
Pinia	Application state management
Tailwind CSS 4	Utility-first styling
Vite	Development server and build tooling
Getting Started
Requirements
Use a Node.js version supported by the project: Node.js 22.18.x or 24.12 and newer.
Installation
```bash
git clone https://github.com/F1Nfx/ska-neva.git
cd ska-neva
npm install
```
Development Server
```bash
npm run dev
```
Vite will print the local development URL in the terminal.
Production Build
```bash
npm run build
```
This command runs the TypeScript check and creates a production build.
To preview the production build locally:
```bash
npm run preview
```
To run the TypeScript check separately:
```bash
npm run type-check
```
Related Repository
The backend and database layer are maintained separately:
SKA-Neva API — Express, Prisma, and PostgreSQL.
Project Status
The project is under active development. The live deployment may contain changes that are not yet reflected in the repository, and vice versa.
---
<div align="center">
  <sub>Built with Vue 3, TypeScript, and a love of sports.</sub>
</div>
