# 📌 Bi Etkinlik  

**Bi Etkinlik** is a comprehensive event management platform where users can create and join events, view event locations on a map, and get directions. The system provides personalized recommendations based on selected interests and city. Users who join the same event can chat in real time via **SignalR**. After events, feedback is collected with community scores and ratings, and admins can analyze results in detail. Email notifications are supported and the platform is available in **10 languages**.  

---

## 🏗 Architecture and Project Layout  

Monorepo structure:  
- **`SmartEventPlanningApp`**: React + Vite frontend (served by Nginx in production)  
- **`SmartEventPlanningSystem`**: .NET 8 backend (CQRS + MediatR)  
  - **Core**: Application, Domain  
  - **Infrastructure**: Persistence, Infrastructure  
  - **Presentation**: Web API + SignalR Hubs  
- **`docker-compose.yml`**: Orchestrates frontend, backend, and database services  

Main entry points:  
- **Frontend**: `SmartEventPlanningApp/src/main.jsx`, `SmartEventPlanningApp/src/App.jsx`  
- **API**: `SmartEventPlanningSystem/Presentation/SmartEventPlanningSystem.API/Program.cs`  
- **SignalR Hub**: `SmartEventPlanningSystem/Presentation/SmartEventPlanningSystem.API/Hubs/ChatHub.cs`  

---

## 🛠 Technologies  

### Frontend  
- React 19, Vite 7, @vitejs/plugin-react  
- MUI: @mui/material, @mui/icons-material, @mui/lab, @mui/x-date-pickers  
- Redux Toolkit, React Redux  
- React Router DOM  
- i18next + react-i18next + i18next-http-backend (10 languages)  
- Axios  
- Leaflet + react-leaflet + leaflet-control-geocoder (maps & geolocation)  
- PrimeReact + PrimeIcons (UI components)  

### Backend  
- .NET 8 Web API  
- SignalR (real-time chat)  
- Entity Framework Core  
- MediatR with CQRS  

### Infrastructure  
- Docker, Docker Compose  
- Nginx (production static hosting and reverse proxy)  

---

## ⚡ Quick Start (Docker)  

**Requirements:** Docker Desktop 4.x+  

1️⃣ Clone the repository  
```bash
git clone <repo-url>
cd SEP_System
```  

2️⃣ Start the services  
```bash
docker compose up -d --build
```  

3️⃣ Access the app  
- Frontend: `http://localhost:3000`  

👉 Database initialization scripts under `init-scripts/` run automatically.  

---

## 📸 Features Overview  

- Event creation, management, and participation  
- Interactive maps & routing (Leaflet)  
- Real-time event group chat with **SignalR**  
- Multi-language support (10 languages via i18next)  
- Email notifications with MailKit  
- Personalized event recommendations  
- Community feedback and rating system  
- Admin analytics and reporting dashboard  

---

## 📂 Repository Structure  

```bash
SEP_System
│
├── SmartEventPlanningApp        # React + Vite frontend
│   └── src
│       ├── components
│       ├── pages
│       ├── services
│       └── App.jsx
│
├── SmartEventPlanningSystem     # .NET 8 backend
│   ├── Core                     # Application, Domain
│   ├── Infrastructure           # Persistence, Infrastructure
│   └── Presentation             # API, SignalR Hubs
│
├── docker-compose.yml           # Orchestrates services
└── init-scripts/                # DB initialization scripts
```

---
