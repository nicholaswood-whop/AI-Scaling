import { redirect } from "next/navigation";

/**
 * /ebook/v2 now redirects to /ebook (the PDF-style page is now the main page).
 * This ensures old ad links still work.
 */
export default function EbookV2Redirect() {
  redirect("/ebook");
}
