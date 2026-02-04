import type { ReportIssueResponse } from "@/services/morgan/report-issue";
import type {
  IssueType,
  ReportIssuePayload,
} from "@/views/lecturer/report-issue-modal";

export type ReportSuccessData = {
  reportNumber: string;
  roomName: string;
  buildingName: string;
  reporterName: string;
  reporterRoleLabel: string;
  createdAt: string;
  statusLabel: string;
  issues: Array<{
    assetId: string;
    assetName: string;
    issueType: IssueType;
    detail: string;
    fileName?: string;
  }>;
};

const STORAGE_KEY = "morgan:lastReportSuccess";

export function makeReportSuccessData({
  payload,
  response,
  assetNameById,
  roomId,
}: {
  payload: ReportIssuePayload;
  response: ReportIssueResponse;
  assetNameById: Record<string, string>;
  roomId?: string;
}): ReportSuccessData {
  return {
    reportNumber: response.reportNumber,
    roomName: roomId ? `Ruang ${roomId}` : "Ruang 2805",
    buildingName: "Gedung Griya Legita",
    reporterName: "Meredita Susanty",
    reporterRoleLabel: "Dosen",
    createdAt: response.createdAt,
    statusLabel: "Menunggu Petugas",
    issues: payload.issues.map((i) => ({
      assetId: i.assetId,
      assetName: assetNameById[i.assetId] ?? i.assetId,
      issueType: i.issueType,
      detail: i.detail,
      fileName: i.fileName,
    })),
  };
}

export function saveLastReportSuccess(data: ReportSuccessData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function readLastReportSuccess(): ReportSuccessData | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ReportSuccessData;
  } catch {
    return null;
  }
}
