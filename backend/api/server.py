"""FastAPI server for the Antigravity Agent Hub"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from workflows.main_workflow import run_workflow

load_dotenv()

app = FastAPI(
    title="Antigravity Agent Hub API",
    description="LangGraph-based AI agent workflow API",
    version="1.0.0"
)

# Add CORS middleware for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TaskRequest(BaseModel):
    """Request model for running a task"""
    task: str


@app.get("/")
async def root():
    """Health check endpoint"""
    return {"status": "ok", "message": "Antigravity Agent Hub API"}


@app.post("/run_task")
async def run_task(req: TaskRequest):
    """Run a task through the agent workflow"""
    result = run_workflow({"task": req.task})
    return {"result": result}


@app.post("/api/run_task")
async def api_run_task(req: TaskRequest):
    """Run a task through the agent workflow (with /api prefix for Firebase)"""
    result = run_workflow({"task": req.task})
    return {"result": result}
