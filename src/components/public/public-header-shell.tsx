import { getSiteSettings } from "@/lib/site-settings";
import { PublicHeader, type PublicHeaderProps } from "@/components/public/public-header";

export async function PublicHeaderShell(
  props: Omit<PublicHeaderProps, "settings">
) {
  const settings = await getSiteSettings();
  return <PublicHeader {...props} settings={settings} />;
}
