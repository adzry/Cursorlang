"""Processor agent node for processing research data"""


def processor_node(state: dict) -> dict:
    """Process the research results"""
    result = state.get("research_results", "")
    state["processed_data"] = result.upper()
    return state
