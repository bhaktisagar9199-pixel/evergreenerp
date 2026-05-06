import { useEditMode } from '@/hooks/useEditMode';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditableImageProps {
  src: string;
  alt?: string;
  onSave: (url: string) => void;
  className?: string;
  imageClassName?: string;
}

export function EditableImage({ src, alt = "", onSave, className, imageClassName }: EditableImageProps) {
  const { isEditMode } = useEditMode();

  const handleClick = () => {
    if (!isEditMode) return;
    const newUrl = window.prompt('Enter new image URL:', src);
    if (newUrl && newUrl !== src) {
      onSave(newUrl);
    }
  };

  return (
    <div 
      className={cn(
        "relative group overflow-hidden", 
        isEditMode && "cursor-pointer ring-2 ring-transparent hover:ring-primary ring-offset-2 transition-all",
        className
      )}
      onClick={handleClick}
    >
      <img 
        src={src} 
        alt={alt} 
        className={cn("w-full h-full object-cover", imageClassName)} 
      />
      
      {isEditMode && (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white text-black px-4 py-2 rounded-full font-medium flex items-center gap-2 shadow-lg">
            <ImageIcon className="w-4 h-4" />
            <span>Change Image</span>
          </div>
        </div>
      )}
    </div>
  );
}
