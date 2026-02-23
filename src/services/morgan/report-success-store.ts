import type { ReportIssuePayload } from "@/views/lecturer/ReportIssueModal";

const STORAGE_KEY = "morgan:lastReportSuccess:v1";

export type ReportSuccessIssue = {
  assetId: string;
  assetName: string;
  issueType: string;
  detail: string;
  fileName?: string;
};

export type ReportSuccessData = {
  ticketId: string;
  statusLabel: string;
  createdAt: string; // ISO
  reporterName: string;
  reporterRoleLabel: string;
  roomId: string;
  roomName: string;
  buildingName: string;
  issues: Array<ReportSuccessIssue>;
};

export type SubmitReportIssueResponse = {
  ticketId: string;
  statusLabel?: string;
  createdAt?: string;
};

export function makeReportSuccessData(args: {
  payload: ReportIssuePayload;
  response: SubmitReportIssueResponse;
  assetNameById: Record<string, string>;
  roomId: string;
}): ReportSuccessData {
  const createdAt = args.response.createdAt ?? new Date().toISOString();
  const ticketId = args.response.ticketId;

  return {
    ticketId,
    statusLabel: args.response.statusLabel ?? "Selesai",
    createdAt,
    reporterName: "Meredita Susanty",
    reporterRoleLabel: "Dosen",
    roomId: args.roomId,
    roomName: `Ruang ${args.roomId}`,
    buildingName: "Gedung Griya Legita",
    issues: args.payload.issues.map((i) => ({
      assetId: i.assetId,
      assetName: args.assetNameById[i.assetId] ?? i.assetId,
      issueType: i.issueType,
      detail: i.detail,
      fileName: i.fileName,
    })),
  };
}

export function saveLastReportSuccess(data: ReportSuccessData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore storage failures
  }
}

export function readLastReportSuccess(): ReportSuccessData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ReportSuccessData;
  } catch {
    return null;
  }
}
