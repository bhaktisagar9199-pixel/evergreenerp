import { useRef } from 'react';
import { useAdmin } from '@/hooks/useAdmin';
import { useEditMode } from '@/hooks/useEditMode';
import { useCmsData } from '@/hooks/useCmsData';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Download, Upload, LogOut, Settings } from 'lucide-react';
import { Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';

export function AdminToolbar() {
  const { isAdmin, logout } = useAdmin();
  const { isEditMode, toggleEditMode } = useEditMode();
  const { exportData, importData } = useCmsData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  if (!isAdmin) return null;

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importData(content);
      if (success) {
        toast({
          title: "Backup imported",
          description: "Website content has been restored.",
        });
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast({
          variant: "destructive",
          title: "Import failed",
          description: "The selected file is not a valid backup.",
        });
      }
    };
    reader.readAsText(file);
    // Reset the input so the same file can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-primary text-primary-foreground border-t border-white/10 shadow-2xl px-4 py-3 flex items-center justify-between font-sans">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <Switch 
            id="edit-mode-toggle" 
            checked={isEditMode} 
            onCheckedChange={toggleEditMode} 
            className="data-[state=checked]:bg-accent data-[state=checked]:text-primary"
          />
          <label htmlFor="edit-mode-toggle" className="text-sm font-medium tracking-wide cursor-pointer">
            {isEditMode ? "Editing Enabled" : "Preview Mode"}
          </label>
        </div>
        
        <div className="h-6 w-px bg-white/20" />
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={exportData} className="hover:bg-white/10 text-white gap-2" data-testid="button-export">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Backup</span>
          </Button>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".json" 
            className="hidden" 
          />
          <Button variant="ghost" size="sm" onClick={handleImportClick} className="hover:bg-white/10 text-white gap-2" data-testid="button-import">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Import Backup</span>
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Link href="/admin/dashboard" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-white/10 hover:text-white h-9 px-3 text-white gap-2" data-testid="link-dashboard">
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
        <Button variant="ghost" size="sm" onClick={logout} className="hover:bg-red-500/20 text-white hover:text-red-300 gap-2" data-testid="button-logout">
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Exit</span>
        </Button>
      </div>
    </div>
  );
}
