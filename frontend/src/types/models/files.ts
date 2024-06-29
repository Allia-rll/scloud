export interface FileSchema {
  codfile: number;
  filename: string;
  url: Record<"webViewLink" | "thumbnailLink" | "webContentLink", string>;
  type: string;
  created_at: string;
  description: string;
  codfproyecto: number;
}
