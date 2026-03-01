const WA_NUMBER = '917222918898'

export function openWhatsApp(message = "Hi Valframe! I'd like to get in touch.") {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
  window.location.href = url
}
