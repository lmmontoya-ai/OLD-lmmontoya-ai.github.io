import { useMemo } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

export interface Props {
  nodes: Node[];
  edges: Edge[];
}

export default function InteractiveRoadmap({ nodes, edges }: Props) {
  const flowNodes = useMemo(() => nodes, [nodes]);
  const flowEdges = useMemo(() => edges, [edges]);

  return (
    <div className="w-full h-[600px] rounded-lg border border-primary bg-surface-secondary/20">
      <ReactFlow nodes={flowNodes} edges={flowEdges} fitView>
        <Background gap={16} color="var(--color-border-primary)" />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
