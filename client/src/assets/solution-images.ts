import batteryStorageImage from "@assets/shutterstock_2440503749 2_1756075221055.jpeg";
import energyProcurementImage from "@assets/CatalystPower_Limitless LOGO.pdf (1)_1756075406732.png";
import solarBatteryImage from "@assets/solar-battery-solution.jpg";
import energyConsultingImage from "@assets/energy-consulting-analytics.jpg";

export const solutionImages: Record<string, string> = {
  "battery-storage": batteryStorageImage,
  "energy-procurement": energyProcurementImage,
  "commercial-solar-battery": solarBatteryImage,
  "energy-consulting": energyConsultingImage,
};

export function getSolutionImage(slug: string, fallbackUrl: string): string {
  return solutionImages[slug] || fallbackUrl;
}