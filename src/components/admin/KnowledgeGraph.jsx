import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Box, Typography } from '@mui/material';

const groupColors = {
  subject: 'rgba(255, 99, 132, 0.8)', // Red
  topic: 'rgba(54, 162, 235, 0.8)',   // Blue
  concept: 'rgba(255, 206, 86, 0.8)', // Yellow
};

const Legend = () => (
  <Box sx={{ mt: 2, p: 2, border: '1px solid grey', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
    <Typography variant="h6" gutterBottom>Legend</Typography>
    {Object.entries(groupColors).map(([group, color]) => (
      <Box key={group} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Box sx={{ width: 20, height: 20, backgroundColor: color, mr: 1, border: '1px solid #fff' }} />
        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{group}</Typography>
      </Box>
    ))}
  </Box>
);

const KnowledgeGraph = () => {
  const data = {
    nodes: [
      { id: 'Math', group: 'subject' },
      { id: 'Algebra', group: 'topic' },
      { id: 'Calculus', group: 'topic' },
      { id: 'Geometry', group: 'topic' },
      { id: 'Linear Equations', group: 'concept' },
      { id: 'Derivatives', group: 'concept' },
      { id: 'Integrals', group: 'concept' },
      { id: 'Pythagorean Theorem', group: 'concept' },
    ],
    links: [
      { source: 'Math', target: 'Algebra' },
      { source: 'Math', target: 'Calculus' },
      { source: 'Math', target: 'Geometry' },
      { source: 'Algebra', target: 'Linear Equations' },
      { source: 'Calculus', target: 'Derivatives' },
      { source: 'Calculus', target: 'Integrals' },
      { source: 'Geometry', target: 'Pythagorean Theorem' },
      { source: 'Linear Equations', target: 'Derivatives' }, // Cross-topic link
    ],
  };

  return (
    <Box>
      <ForceGraph2D
        graphData={data}
        nodeLabel="id"
        nodeColor={node => groupColors[node.group] || 'grey'}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
        width={800}
        height={500}
      />
      <Legend />
    </Box>
  );
};

export default KnowledgeGraph;
