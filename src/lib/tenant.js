// Resuelve a qué "tenant" (local) corresponde la visita actual a partir del
// subdominio, y arma URLs entre locales. Todo basado en window.location, sin backend.

const PLATFORM_HOSTS = ['.netlify.app', '.vercel.app']

export function slugify(text) {
  return (text || '')
    .toString()
    .normalize('NFD')
    .replace(/[^\x00-\x7F]/g, '') // saca acentos/diacríticos (ej: "é" -> "e") tras la normalización NFD
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function isLocalOrIp(host) {
  return host === 'localhost' || /^\d{1,3}(\.\d{1,3}){3}$/.test(host)
}

function isPlatformHost(host) {
  return PLATFORM_HOSTS.some((suffix) => host.endsWith(suffix))
}

// Slug forzado por query string, útil para probar subdominios sin tener el DNS
// wildcard configurado todavía (ej: https://tusitio.netlify.app/?tienda=centro).
function getDevOverrideSlug() {
  const params = new URLSearchParams(window.location.search)
  const override = params.get('tienda')
  return override ? slugify(override) : null
}

export function resolveTenantSlug() {
  const override = getDevOverrideSlug()
  if (override) return override

  const host = window.location.hostname
  if (isLocalOrIp(host) || isPlatformHost(host)) return null

  const parts = host.split('.')
  if (parts.length <= 2) return null // dominio raíz, ej: reparacionestore.com
  const sub = parts[0]
  if (sub === 'www') return null
  return sub
}

export function isRootDomainNow() {
  return resolveTenantSlug() === null
}

// Dominio "base" sobre el que se arman las URLs de cada local.
// Devuelve null cuando no hay un dominio propio configurado todavía
// (localhost o el dominio por defecto de Netlify/Vercel).
function getBaseDomain() {
  const host = window.location.hostname
  if (isLocalOrIp(host) || isPlatformHost(host)) return null
  const parts = host.split('.')
  return parts.length <= 2 ? host : parts.slice(1).join('.')
}

// Arma la URL de entrada de un local. Si todavía no hay dominio propio
// configurado, usa el mismo host actual con ?tienda= para poder probarlo.
export function buildTenantUrl(slug) {
  const { protocol, host } = window.location
  const base = getBaseDomain()
  if (!base) {
    return `${protocol}//${host}/?tienda=${encodeURIComponent(slug)}`
  }
  return `${protocol}//${slug}.${base}/`
}

export function hasCustomDomain() {
  return getBaseDomain() !== null
}

// Texto legible para mostrar en el panel de Super Admin: por dónde va a
// entrar cada local (URL real si ya hay dominio propio, o el atajo de prueba).
export function describeTenantUrl(slug) {
  if (!slug) return ''
  const base = getBaseDomain()
  if (!base) return `${window.location.host}/?tienda=${slug}`
  return `${slug}.${base}`
}
