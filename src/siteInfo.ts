export const PRACTITIONER_NAME = 'Rodica Maria Chiriches'
export const PRACTICE_NAME_RO = 'Cabinet de Psihologie'
export const PRACTICE_NAME_EN = 'Psychology Practice'

export const PHONE_RO_DISPLAY = '+40 756 262 594'
export const PHONE_RO_TEL = '+40756262594'
export const PHONE_RO_WHATSAPP = '40756262594'

export const PHONE_UK_DISPLAY = '+44 7470 433 212'
export const PHONE_UK_TEL = '+447470433212'

export const EMAIL_DISPLAY = 'mariachiriches@outlook.com'

/** Builds a mailto: link pre-filled with the contact form's name, email and message. */
export function buildContactMailtoLink(params: { name: string; email: string; message: string }) {
  const subject = `Mesaj nou de pe site — ${params.name}`
  const body = [
    `Nume: ${params.name}`,
    `Email: ${params.email}`,
    '',
    params.message,
  ].join('\n')
  return `mailto:${EMAIL_DISPLAY}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** Builds a wa.me link pre-filled with a booking brief, ready to send. */
export function buildWhatsAppBookingLink(params: {
  name: string
  phone: string
  language: string
  dateLabel: string
  time: string
  message: string
}) {
  const lines = [
    'Bună! Aș dori să programez o ședință.',
    `Nume: ${params.name}`,
    `Telefon: ${params.phone}`,
    `Limbă preferată: ${params.language}`,
    `Data dorită: ${params.dateLabel}`,
    `Ora dorită: ${params.time}`,
    `Mesaj: ${params.message || '-'}`,
  ]
  const text = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${PHONE_RO_WHATSAPP}?text=${text}`
}
