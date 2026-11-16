export const SUGGESTION_STATIONS = ['Avoriaz', 'Val Thorens–Orelle', 'Les Carroz', 'Val Cenis', 'Flaine'];

// Only property or store pages on known providers. Drop tracking, sessions,
// URL fragments and dates supplied by the sender, then use the trip dates.
const providers = [
  ['www.booking.com', /^\/hotel\/fr\/([a-z0-9-]+)(?:\.[a-z]{2})?\.html$/i, 'lodging', ([, slug]) => `/hotel/fr/${slug}.html`],
  ['www.airbnb.com', /^\/rooms\/(\d{6,22})$/, 'lodging', match => match[0]],
  ['www.esquiades.com', /^\/hoteles\/\d{3,12}_[a-z0-9-]+$/i, 'lodging', match => match[0]],
  ['www.intersport-rent.fr', /^\/fr\/(?:stations-ski\/(?:[a-z0-9-]+\/){2,4}[a-z0-9-]+|booking\/2026-12-12\/2026-12-13\/\d{2,8})$/i, 'equipment', match => match[0]],
  ['location-ski.sport2000.fr', /^\/magasins\/\d{1,8}-[a-z0-9-]+$/i, 'equipment', match => match[0]],
  ['www.ski-plus.fr', /^\/location\/[a-z0-9-]+$/i, 'equipment', match => match[0]],
  ['www.skimium.fr', /^\/station\/[a-z0-9-]+(?:\/[a-z0-9-]+)?$/i, 'equipment', match => match[0]],
];

export function suggestionSource(raw) {
  if (typeof raw !== 'string' || raw.length > 500 || /[\s%\\]/u.test(raw.split(/[?#]/u)[0])) return null;
  let url;
  try { url = new URL(raw); } catch { return null; }
  if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
  const bare = url.hostname.replace(/^www\./, '');
  const host = /^(?:airbnb\.(?:com|fr|es|ch|co\.uk))$/.test(bare)
    ? 'www.airbnb.com' : bare === 'location-ski.sport2000.fr' ? bare : `www.${bare}`;
  for (const [provider, pattern, kind, path] of providers) {
    if (host !== provider) continue;
    const part = pattern.exec(url.pathname.toLowerCase().replace(/\/$/, ''));
    if (!part) return null;
    return {kind, url:`https://${provider}${path(part)}`};
  }
  return null;
}

export function suggestionBookingLink(source) {
  const url = new URL(source.url);
  if (url.hostname === 'www.booking.com') {
    url.search = new URLSearchParams({checkin:'2026-12-12', checkout:'2026-12-13', group_adults:'7', no_rooms:'1', group_children:'0', selected_currency:'EUR'});
  } else if (url.hostname === 'www.airbnb.com') {
    url.search = new URLSearchParams({check_in:'2026-12-12', check_out:'2026-12-13', adults:'7', currency:'EUR'});
  }
  return url.href;
}

export function validSuggestion(item) {
  const source = suggestionSource(item?.url);
  return !!source && source.url === item.url && source.kind === item.kind
    && /^suggestion-[a-f0-9]{20}$/.test(item.id)
    && typeof item.title === 'string' && /^[0-9A-Za-zÀ-ÿ][0-9A-Za-zÀ-ÿ .,’'()&-]{2,84}$/u.test(item.title)
    && SUGGESTION_STATIONS.includes(item.station)
    && Number.isInteger(item.priceCents) && item.priceCents >= 500 && item.priceCents <= 350000
    && /^2026-(?:11|12)-[0-3][0-9]$/.test(item.checkedOn);
}
