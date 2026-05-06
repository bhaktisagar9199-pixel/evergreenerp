import { useCmsData } from "@/hooks/useCmsData";

function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "220 67% 11%";
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function isLight(hex: string): boolean {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return false;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) > 128;
}

export function DynamicStyles() {
  const { data } = useCmsData();
  const { design } = data;

  const primaryHsl = hexToHsl(design.primaryColor);
  const accentHsl = hexToHsl(design.accentColor);
  const bgHsl = hexToHsl(design.backgroundColor);
  const primaryFg = isLight(design.primaryColor) ? "220 67% 11%" : "0 0% 100%";
  const accentFg = isLight(design.accentColor) ? "220 67% 11%" : "0 0% 100%";

  const css = `
    :root {
      --primary: ${primaryHsl};
      --primary-foreground: ${primaryFg};
      --accent: ${accentHsl};
      --accent-foreground: ${accentFg};
      --background: ${bgHsl};
      --foreground: 220 40% 15%;
      --card: 0 0% 100%;
      --card-foreground: 220 40% 15%;
      --card-border: 220 20% 90%;
      --border: 220 20% 88%;
      --input: 220 20% 85%;
      --muted: 220 15% 95%;
      --muted-foreground: 220 20% 45%;
      --popover: 0 0% 100%;
      --popover-foreground: 220 40% 15%;
      --popover-border: 220 20% 90%;
      --secondary: 220 15% 94%;
      --secondary-foreground: 220 40% 15%;
      --destructive: 0 72% 51%;
      --destructive-foreground: 0 0% 100%;
      --ring: ${primaryHsl};
      --sidebar: 220 30% 8%;
      --sidebar-foreground: 0 0% 92%;
      --sidebar-border: 220 20% 18%;
      --sidebar-primary: ${primaryHsl};
      --sidebar-primary-foreground: ${primaryFg};
      --sidebar-accent: 220 25% 18%;
      --sidebar-accent-foreground: 0 0% 92%;
      --sidebar-ring: ${accentHsl};
      --chart-1: ${primaryHsl};
      --chart-2: ${accentHsl};
      --chart-3: 200 60% 50%;
      --chart-4: 150 60% 40%;
      --chart-5: 280 50% 60%;
      --app-font-sans: '${design.bodyFont}', sans-serif;
      --app-font-serif: '${design.headingFont}', Georgia, serif;
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
