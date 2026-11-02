import type { Metadata } from "next";
import LmsPage from "@/components/LmsPage";
import en from "@/content/en";

export const metadata: Metadata = {
  title: en.lmsPage.meta.title,
  description: en.lmsPage.meta.description,
};

export default function LmsEn() {
  return <LmsPage locale="en" />;
}
