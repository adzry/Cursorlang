"""FastAPI server for the Antigravity Agent Hub"""

import os
from fastapi import FastAPI, HTTPException
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

# Configure CORS from environment or use defaults for development
cors_origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TaskRequest(BaseModel):
    """Request model for running a task"""
    task: str


def execute_workflow(task: str) -> dict:
    """Execute the agent workflow with error handling"""
    try:
        result = run_workflow({"task": task})
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Workflow execution failed: {str(e)}")


@app.get("/")
async def root():
    """Health check endpoint"""
    return {"status": "ok", "message": "Antigravity Agent Hub API"}


@app.post("/run_task")
async def run_task(req: TaskRequest):
    """Run a task through the agent workflow"""
    return execute_workflow(req.task)


@app.post("/api/run_task")
async def api_run_task(req: TaskRequest):
    """Run a task through the agent workflow (with /api prefix for Firebase)"""
    return execute_workflow(req.task)
