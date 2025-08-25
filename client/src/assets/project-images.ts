import aceNaturalImage from "@assets/ace-natural-aerial.png";
import kaufmanStudiosImage from "@assets/kaufman-astoria-studios-new.jpg";
import nineDotBatteryImage from "@assets/ninedot-battery-storage-v2.jpg";

export const projectImages: Record<string, string> = {
  "harnessing-the-sun-a-solar-revolution": aceNaturalImage,
  "historic-film-studio-powers-productions-with-rooftop-solar": kaufmanStudiosImage,
  "6mw-grid-scale-energy-storage-development": nineDotBatteryImage,
};

export function getProjectImage(slug: string, fallbackUrl: string): string {
  return projectImages[slug] || fallbackUrl;
}