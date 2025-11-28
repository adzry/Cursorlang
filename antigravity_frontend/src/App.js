import React, { useState } from 'react';
import AntigravityScene from './AntigravityScene';
import { runAgentTask } from './api/agentHub';

function App() {
  const [task, setTask] = useState('');
  const [output, setOutput] = useState('');

  const handleRun = async () => {
    const result = await runAgentTask(task);
    setOutput(result);
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
        />
        <button onClick={handleRun}>Run Task</button>
        <pre style={{ marginTop: '1rem', background: '#111', color: '#0f0', padding: '1rem' }}>
          {output}
        </pre>
      </div>
    </div>
  );
}

export default App;
