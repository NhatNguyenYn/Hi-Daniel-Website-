import type { Metadata } from "next";
import Landing from "@/components/Landing";
import en from "@/content/en";

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
};

export default function HomeEn() {
  return <Landing locale="en" />;
}
