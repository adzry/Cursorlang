export async function runAgentTask(task) {
  try {
    const response = await fetch("/api/run_task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error: ${response.status}`);
    }
    
    const data = await response.json();
    if (!data.result || !data.result.final_output) {
      throw new Error("Invalid response format from API");
    }
    
    return data.result.final_output;
  } catch (error) {
    throw new Error(`Failed to run agent task: ${error.message}`);
  }
}
