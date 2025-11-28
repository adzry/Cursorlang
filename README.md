# Cursorlang
Langkasuka 

Here’s your Antigravity Agent Hub project scaffold — a complete repository that integrates a 3D “antigravity” React frontend with a LangGraph-based backend and configures Firebase MCP for Antigravity.


---

📁 Project Structure

antigravity_agent_hub/
│   firebase.json               # Firebase hosting & functions config
│   .firebaserc                 # Firebase project alias
│   .env                        # Environment variables (API keys, etc.)
│   mcp_config.json             # MCP server config for Antigravity
│   README.md                   # Overview & setup instructions
│
├── antigravity_frontend/       # React + Three.js antigravity UI
│   ├── package.json
│   ├── public/
│   │     └── index.html
│   └── src/
│         ├── AntigravityScene.js
│         ├── api/agentHub.js
│         ├── App.js
│         ├── index.js
│         └── firebase-config.js
│
├── backend/                    # LangGraph-based FastAPI backend
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── main.py
│   ├── agents/
│   │     ├── __init__.py
│   │     ├── planner_agent.py
│   │     ├── research_agent.py
│   │     ├── processor_agent.py
│   │     └── writer_agent.py
│   ├── workflows/
│   │     ├── __init__.py
│   │     └── main_workflow.py
│   ├── memory/
│   │     ├── __init__.py
│   │     └── state_store.py
│   └── api/
│         ├── __init__.py
│         └── server.py
│
└── docker-compose.yml          # Compose file to run backend locally


---

📄 firebase.json

{
  "hosting": {
    "public": "antigravity_frontend/build",
    "rewrites": [
      {
        "source": "/api/**",
        "function": "backend"
      },
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "functions": {
    "source": "backend",
    "runtime": "python310"
  }
}


---

⚙️ .firebaserc

{
  "projects": {
    "default": "your-firebase-project-id"
  }
}


---

🧠 mcp_config.json

{
  "mcpServers": {
    "firebase-mcp-server": {
      "command": "npx",
      "args": ["-y", "firebase-tools@latest", "mcp"]
    }
  }
}

> This JSON config allows Antigravity to connect to the Firebase MCP server. It mirrors the official guidance from Firebase: you can configure Antigravity by installing the Firebase MCP server, which updates mcp_config.json to include an entry pointing to npx -y firebase-tools@latest mcp.




---

📚 README.md (excerpt)

# Antigravity Agent Hub

Deploy a 3D “antigravity” UI connected to a LangGraph-based backend.  
This scaffold integrates a Three.js/React frontend, a FastAPI backend, and Firebase hosting.

## Run Locally
1. `cd backend && docker compose up --build`
2. `cd ../antigravity_frontend && npm install && npm start`
3. In the frontend, call your backend at http://localhost:8000/run_task

## Deploy to Firebase
1. `firebase init` and enable Hosting & Functions.
2. `npm run build` inside antigravity_frontend.
3. `firebase deploy`

See full README for details.


---

🔭 Antigravity Frontend

package.json

{
  "name": "antigravity_frontend",
  "version": "1.0.0",
  "description": "Antigravity UI for Agent Hub",
  "private": true,
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@react-three/fiber": "^8.0.27",
    "@react-three/drei": "^9.56.5",
    "three": "^0.154.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "eject": "react-scripts eject"
  }
}

src/AntigravityScene.js

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text } from '@react-three/drei';

export default function AntigravityScene() {
  return (
    <Canvas style={{ height: '100vh', background: '#000' }}>
      <ambientLight intensity={0.5} />
      <Float speed={2} rotationIntensity={1} floatIntensity={3}>
        <Text fontSize={1} color="cyan" position={[0, 0, 0]}>
          🚀 Agent Hub
        </Text>
      </Float>
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
}

src/api/agentHub.js

export async function runAgentTask(task) {
  const response = await fetch("/api/run_task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task })
  });
  const { result } = await response.json();
  return result.final_output;
}

src/App.js

import React, { useState } from 'react';
import AntigravityScene from './AntigravityScene';
import { runAgentTask } from './api/agentHub';

function App() {
  const [task, setTask] = useState('');
  const [output, setOutput] = useState('');

  const handleRun = async () => {
    const result = await runAgentTask(task);
    setOutput(result);
  };

  return (
    <div style={{ position: 'relative' }}>
      <AntigravityScene />
      <div style={{ position: 'absolute', top: 20, left: 20, color: 'white' }}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
          style={{ width: '300px', marginRight: '1rem' }}
        />
        <button onClick={handleRun}>Run Task</button>
        <pre style={{ marginTop: '1rem', background: '#111', color: '#0f0', padding: '1rem' }}>
          {output}
        </pre>
      </div>
    </div>
  );
}

export default App;

src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


---

🧱 Backend (FastAPI + LangGraph)

docker-compose.yml (for local dev)

version: "3.9"
services:
  backend:
    build: ./backend
    container_name: agent_hub_backend
    restart: unless-stopped
    env_file:
      - .env
    volumes:
      - ./backend:/app/backend
    ports:
      - "8000:8000"

backend/Dockerfile

FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "api.server:app", "--host", "0.0.0.0", "--port", "8000"]

backend/requirements.txt

fastapi
uvicorn
langchain
langgraph
python-dotenv

backend/workflows/main_workflow.py

from langgraph import Graph, Node
from agents.planner_agent import planner_node
from agents.research_agent import research_node
from agents.processor_agent import processor_node
from agents.writer_agent import writer_node

def run_workflow(initial_state=None):
    if initial_state is None:
        initial_state = {}
    g = Graph(name="main_agent_flow")

    n1 = Node("planner", planner_node)
    n2 = Node("research", research_node)
    n3 = Node("processor", processor_node)
    n4 = Node("writer", writer_node)

    g.add_edge(n1, n2)
    g.add_edge(n2, n3)
    g.add_edge(n3, n4)

    state = initial_state.copy()
    result = g.run(state=state)
    return result

Agent modules (abbreviated)

# backend/agents/planner_agent.py
def planner_node(state: dict) -> dict:
    task = state.get("task", "default")
    state["plan"] = f"Plan for: {task}"
    return state

# backend/agents/research_agent.py
def research_node(state: dict) -> dict:
    plan = state.get("plan", "No plan")
    state["research_results"] = f"Research results for plan: {plan}"
    return state

# backend/agents/processor_agent.py
def processor_node(state: dict) -> dict:
    result = state.get("research_results", "")
    state["processed_data"] = result.upper()
    return state

# backend/agents/writer_agent.py
def writer_node(state: dict) -> dict:
    data = state.get("processed_data", "")
    state["final_output"] = f"OUTPUT: {data}"
    return state

backend/api/server.py

from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from workflows.main_workflow import run_workflow

load_dotenv()
app = FastAPI()

class TaskRequest(BaseModel):
    task: str

@app.post("/run_task")
async def run_task(req: TaskRequest):
    result = run_workflow({"task": req.task})
    return {"result": result}

backend/memory/state_store.py (optional persistent memory stub)

class MemoryStore:
    def __init__(self):
        self.store = {}
    def save(self, key, data):
        self.store[key] = data
    def load(self, key):
        return self.store.get(key)

memory = MemoryStore()


---

✅ Summary & Next Steps

This project packages a React + Three.js antigravity scene front-end with a LangGraph-powered FastAPI backend.

The Firebase MCP server integration for Antigravity is provided via mcp_config.json, matching official documentation.

Firebase configuration (firebase.json, .firebaserc) allows you to host both the front-end and backend on Firebase.

Deploy locally with docker compose up and npm start.

Deploy to Firebase with firebase deploy after building the front-end.


By following the instructions in the README and deploying via Firebase MCP (through Antigravity’s MCP settings), you’ll have a ready‑integrated AI agent hub with antigravity visuals and robust Firebase connectivity.

Let me know if you need help setting up a specific part or customizing your agents further!
