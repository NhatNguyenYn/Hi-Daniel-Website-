import type { Metadata } from "next";
import LmsPage from "@/components/LmsPage";
import vi from "@/content/vi";

export const metadata: Metadata = {
  title: vi.lmsPage.meta.title,
  description: vi.lmsPage.meta.description,
};

export default function LmsVi() {
  return <LmsPage locale="vi" />;
}
