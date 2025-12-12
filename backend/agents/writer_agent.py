"""Writer agent node for producing final output"""


def writer_node(state: dict) -> dict:
    """Produce the final output from processed data"""
    data = state.get("processed_data", "")
    return {"final_output": f"OUTPUT: {data}"}
