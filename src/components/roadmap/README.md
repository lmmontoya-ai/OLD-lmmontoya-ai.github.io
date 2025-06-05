# Roadmap Components

This directory contains the simple, timeline-based roadmap components that replaced the complex SVG visualization.

## Components

### `RoadmapTimeline.astro`

A clean timeline component that displays roadmap milestones chronologically:

- Vertical timeline with gradient line
- Status-based color coding (completed, in-progress, planned)
- Shows key outcomes and tags
- Responsive design
- Similar to blog timeline approach

### `RoadmapCard.astro`

A reusable card component for roadmap items:

- Compact milestone representation
- Status indicators
- Phase information (optional)
- Key outcomes preview
- Tag display with overflow handling

## Design Philosophy

The new roadmap follows these principles:

1. **Simplicity over Complexity**: Clean timeline instead of complex SVG graphs
2. **Consistency**: Similar styling and behavior to the blog section
3. **Accessibility**: Proper semantic HTML and keyboard navigation
4. **Mobile-First**: Responsive design that works on all devices
5. **Content-Focused**: Emphasizes the content over visual complexity

## Usage

The roadmap page (`/roadmap`) offers two views:

- **Timeline View** (default): Chronological progression through milestones
- **Phase View**: Grouped by learning phases for easier navigation

Users can toggle between views using the buttons at the top of the page.

## Status Types

- `completed`: Green indicators, checkmark icon
- `in-progress`: Blue indicators, clock icon
- `planned`: Gray indicators, calendar icon

## Content Structure

Roadmap posts should include:

- Standard post frontmatter
- `types: ["roadmap"]`
- `status` field (completed/in-progress/planned)
- `roadmap` object with phase, dependencies, outcomes
- Rich content describing the milestone

This approach provides a much more maintainable and user-friendly roadmap experience.
