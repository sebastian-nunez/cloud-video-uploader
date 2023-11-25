export type Video = {
  id?: string;
  uid?: string;
  filename?: string;
  status?: "processing" | "processed" | "failed";
  title?: string;
  description?: string;
};
