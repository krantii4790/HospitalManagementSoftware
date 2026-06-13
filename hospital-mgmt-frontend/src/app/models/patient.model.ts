export interface Patient {
  patientId?: number;
  patientName: string;
  patientAddress: string;
  patientAge: number;
  issue: string;        // capital I to match Java field
  doctorName?: string;
  doctorSpec?: string;
  doctorExp?: number;
}