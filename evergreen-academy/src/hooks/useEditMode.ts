import { create } from 'zustand';

interface EditModeState {
  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (mode: boolean) => void;
}

// Global store for edit mode so it can be accessed anywhere without context prop drilling
export const useEditModeStore = create<EditModeState>((set) => ({
  isEditMode: false,
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  setEditMode: (mode) => set({ isEditMode: mode }),
}));

export function useEditMode() {
  const isEditMode = useEditModeStore((state) => state.isEditMode);
  const toggleEditMode = useEditModeStore((state) => state.toggleEditMode);
  const setEditMode = useEditModeStore((state) => state.setEditMode);
  
  return { isEditMode, toggleEditMode, setEditMode };
}
