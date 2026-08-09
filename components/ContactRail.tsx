import { EnvelopeSimple, MessengerLogo, Phone } from "@phosphor-icons/react/dist/ssr";
import { getManagedSiteSettings } from "../lib/sanity";
import { site } from "../lib/site";
import { ScrollTop } from "./LandingMotion";

export async function ContactRail() {
  const settings = await getManagedSiteSettings();
  const phone = settings?.phone || site.contact.phone;
  const email = settings?.email || site.contact.email;
  const zaloUrl = settings?.zaloUrl || site.contact.zaloUrl;
  const messengerUrl = settings?.messengerUrl || site.contact.messengerUrl;

  return <aside className="contact-rail" aria-label="Liên hệ nhanh"><a className="has-tooltip cta-call" href={`tel:${phone}`} aria-label="Gọi tư vấn" data-tooltip="Gọi tư vấn"><Phone size={22} weight="fill" /></a><a className="has-tooltip cta-zalo" href={zaloUrl} target="_blank" rel="noreferrer" aria-label="Liên hệ qua Zalo" data-tooltip="Liên hệ Zalo"><span className="zalo-icon" aria-hidden="true">Zalo</span></a><a className="has-tooltip cta-messenger" href={messengerUrl} target="_blank" rel="noreferrer" aria-label="Liên hệ qua Messenger" data-tooltip="Liên hệ Messenger"><MessengerLogo size={22} weight="fill" /></a><a className="has-tooltip cta-email" href={`mailto:${email}`} aria-label="Gửi email báo giá" data-tooltip="Gửi email báo giá"><EnvelopeSimple size={22} weight="fill" /></a><ScrollTop /></aside>;
}
