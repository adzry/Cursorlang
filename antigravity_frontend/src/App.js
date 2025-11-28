import React, { useState } from 'react';
import AntigravityScene from './AntigravityScene';
import { runAgentTask } from './api/agentHub';

function App() {
  const [task, setTask] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRun = async () => {
    if (!task.trim()) {
      setError('Please enter a task');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await runAgentTask(task);
      setOutput(result);
    } catch (err) {
      setError(err.message);
      setOutput('');
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
        />
        <button onClick={handleRun} disabled={isLoading}>
          {isLoading ? 'Running...' : 'Run Task'}
        </button>
        {error && (
          <pre style={{ marginTop: '1rem', background: '#300', color: '#f66', padding: '1rem' }}>
            {error}
          </pre>
        )}
        {output && (
          <pre style={{ marginTop: '1rem', background: '#111', color: '#0f0', padding: '1rem' }}>
            {output}
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;
