function buildUrl(lat, long) {
  return `https://www.alpineconditions.com/location/${lat}/${long}/wx-forecast`
}

export { buildUrl };