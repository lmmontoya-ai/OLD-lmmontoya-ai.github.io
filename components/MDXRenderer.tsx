"use client";
import React from "react";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { MDXComponents } from "./MDXComponents";

interface MDXRendererProps {
  code: string;
}

export const MDXRenderer: React.FC<MDXRendererProps> = ({ code }) => {
  const Component = useMDXComponent(code);
  return <Component components={MDXComponents} />;
};
