export type MeasurementUnit = "cm" | "in";

export interface BodyMeasurement {
  id: string;
  name: string;
  valueCm: number;
  recordedAt: number;
}

export interface BodyProfile {
  heightCm: number;
  measurements: BodyMeasurement[];
}
