/* eslint-disable */

export const init = (val: any) => ((window as any).goatcounter = val);

export const count = (args: any) => {
  const gc = (window as any).goatcounter;
  if (gc && gc.count) {
    gc.count(args);
  } else {
    setTimeout(() => count(args), 1000);
  }
};

const kebabCase = (s: string): string =>
  s
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/([-]{2,})/g, '-');

const trackEvent = (title: string, path: string): void => {
  count({
    title,
    path,
    event: true,
  });
};

export const trackInternalNav = (page: string): void =>
  trackEvent(page, `internal-nav:${kebabCase(page)}`);

export const trackError = (message: string): void =>
  trackEvent(message, `error:${kebabCase(message)}`);

export const trackAction = (action: string) =>
  trackEvent(action, `action:${kebabCase(action)}`);

export const trackExternalLinkClick = (name: string): void =>
  trackEvent(name, `ext:${kebabCase(name)}`);

export const trackSocialsHeaderClick = (name: string): void =>
  trackEvent(name, `header-socials:${name}`);

export const trackSocialsBioClick = (name: string): void =>
  trackEvent(name, `bio-socials:${name}`);

export const trackSocialsLinkClick = (name: string): void =>
  trackEvent(name, `links-socials:${name}`);

export const trackSocialsMusicClick = (name: string): void =>
  trackEvent(name, `music-socials:${name}`);

export const trackCta = (name: string): void => trackEvent(name, `cta:${name}`);
