"""Main LangGraph workflow connecting all agents"""

from typing import TypedDict
from langgraph.graph import StateGraph, END
from agents.planner_agent import planner_node
from agents.research_agent import research_node
from agents.processor_agent import processor_node
from agents.writer_agent import writer_node


class AgentState(TypedDict, total=False):
    """State schema for the agent workflow"""
    task: str
    plan: str
    research_results: str
    processed_data: str
    final_output: str


def run_workflow(initial_state: dict = None) -> dict:
    """Run the main agent workflow"""
    if initial_state is None:
        initial_state = {}

    # Create the state graph
    workflow = StateGraph(AgentState)

    # Add nodes
    workflow.add_node("planner", planner_node)
    workflow.add_node("research", research_node)
    workflow.add_node("processor", processor_node)
    workflow.add_node("writer", writer_node)

    # Define edges (planner -> research -> processor -> writer -> END)
    workflow.set_entry_point("planner")
    workflow.add_edge("planner", "research")
    workflow.add_edge("research", "processor")
    workflow.add_edge("processor", "writer")
    workflow.add_edge("writer", END)

    # Compile and run the workflow
    app = workflow.compile()
    result = app.invoke(initial_state)
    return result
