"""Research agent node for generating research results"""


def research_node(state: dict) -> dict:
    """Generate research results based on the plan"""
    plan = state.get("plan", "No plan")
    state["research_results"] = f"Research results for plan: {plan}"
    return state
