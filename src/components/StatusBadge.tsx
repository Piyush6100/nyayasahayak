import React from 'react';

type BadgeVariant = 'draft' | 'in_progress' | 'review' | 'completed' | 'needs_attention' | 'high_match' | 'medium_match' | 'info';

interface StatusBadgeProps {
  variant: BadgeVariant;
  label: string;
  size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, string> = {
  draft: 'bg-muted text-muted-foreground',
  in_progress: 'bg-blue-50 text-blue-700 border border-blue-200',
  review: 'bg-warning/10 text-warning border border-warning/20',
  completed: 'bg-success/10 text-success border border-success/20',
  needs_attention: 'bg-destructive/10 text-destructive border border-destructive/20',
  high_match: 'bg-success/10 text-success border border-success/20',
  medium_match: 'bg-warning/10 text-warning border border-warning/20',
  info: 'bg-primary/8 text-primary border border-primary/15',
};

export default function StatusBadge({ variant, label, size = 'sm' }: StatusBadgeProps) {
  const sizeClass = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-[13px] px-3 py-1';
  return (
    <span className={`inline-flex items-center font-medium rounded-full ${sizeClass} ${variantStyles[variant]}`}>
      {label}
    </span>
  );
}