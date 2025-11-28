"""Planner agent node for task planning"""


def planner_node(state: dict) -> dict:
    """Create a plan from the given task"""
    task = state.get("task", "default")
    state["plan"] = f"Plan for: {task}"
    return state
