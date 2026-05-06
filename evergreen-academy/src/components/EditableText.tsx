import { useState, useRef, useEffect } from 'react';
import { useEditMode } from '@/hooks/useEditMode';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditableTextProps {
  value: string;
  onSave: (value: string) => void;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
}

export function EditableText({ 
  value, 
  onSave, 
  as: Component = 'span', 
  className,
  multiline = false
}: EditableTextProps) {
  const { isEditMode } = useEditMode();
  const [localValue, setLocalValue] = useState(value);
  const elementRef = useRef<HTMLElement>(null);

  // Sync when prop changes outside of edit
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = () => {
    if (!elementRef.current) return;
    const newValue = elementRef.current.innerText;
    setLocalValue(newValue);
    if (newValue !== value) {
      onSave(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  if (!isEditMode) {
    return <Component className={className}>{value}</Component>;
  }

  return (
    <Component
      ref={elementRef as any}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={cn(
        'relative outline-none transition-colors duration-200 cursor-text',
        'hover:bg-primary/5 focus:bg-primary/5',
        'border border-dashed border-transparent hover:border-primary/30 focus:border-primary',
        'rounded px-1 -ml-1 min-w-[20px] inline-block',
        className
      )}
    >
      {localValue}
    </Component>
  );
}
