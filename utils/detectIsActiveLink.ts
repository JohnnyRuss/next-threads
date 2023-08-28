interface IsActiveLinkT {
  pathname: string;
  url: string;
}

const isActiveLink = ({ pathname, url }: IsActiveLinkT): boolean =>
  (pathname.includes(url) && url.length > 1) || pathname === url;

export default isActiveLink;
