import Link from "next/link";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

/**
 * Internal paths go through next/link (which adds the deploy basePath);
 * absolute URLs (the LMS) and "#anchors" stay plain links.
 */
export default function SmartLink({ href, ...rest }: Props) {
  if (href.startsWith("/")) return <Link href={href} {...rest} />;
  return <a href={href} {...rest} />;
}
