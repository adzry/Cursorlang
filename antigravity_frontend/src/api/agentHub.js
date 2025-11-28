export async function runAgentTask(task) {
  const response = await fetch("/api/run_task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task })
  });
  const { result } = await response.json();
  return result.final_output;
}
