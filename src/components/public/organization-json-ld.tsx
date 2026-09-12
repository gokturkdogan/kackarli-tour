import { organizationJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/public/json-ld";

export function OrganizationJsonLd() {
  return <JsonLd data={organizationJsonLd()} />;
}
