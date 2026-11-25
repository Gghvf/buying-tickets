export function validateEmail(value: string): string | null {
  if (!value) return 'Введите email'
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return 'Некорректный email'
  return null
}

export function validatePassword(value: string): string | null {
  if (!value) return 'Введите пароль'
  if (value.length < 8) return 'Пароль должен быть не короче 8 символов'
  if (!/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(value)) return 'Пароль должен содержать только латиницу и цифры'
  return null
}

export function validateFio(value: string): string | null {
  if (!value) return 'Введите ФИО'
  if (/\d/.test(value)) return 'ФИО не должно содержать цифр'
  if (!/^[А-ЯЁа-яё\s-]+$/.test(value)) return 'ФИО только на кириллице'
  const words = value.trim().split(/\s+/)
  if (words.length < 2 || words.length > 4) return 'Введите от 2 до 4 слов'
  return null
}

export function validatePhone(value: string): string | null {
  if (!value) return 'Введите номер телефона'
  const digits = value.replace(/\D/g, '')
  if (digits.length !== 11) return 'Номер должен состоять из 11 цифр'
  if (!digits.startsWith('7') && !digits.startsWith('8')) return 'Номер должен начинаться с 7 или 8'
  return null
}

export function validateCardNumber(value: string): string | null {
  if (!value) return 'Введите номер карты'
  const digits = value.replace(/\s/g, '')
  if (!/^\d+$/.test(digits)) return 'Только цифры'
  if (digits.length !== 16) return 'Номер карты должен содержать 16 цифр'
  return null
}

export function validateCvc(value: string): string | null {
  if (!value) return 'Введите CVC'
  if (!/^\d{3}$/.test(value)) return 'CVC должен содержать ровно 3 цифры'
  return null
}

export function validateHolder(value: string): string | null {
  if (!value) return 'Введите держателя карты'
  if (!/^[A-Z\s]+$/.test(value)) return 'Только заглавная латиница (IVAN IVANOV)'
  return null
}

export function validateReview(value: string): string | null {
  if (!value.trim()) return 'Введите текст отзыва'
  if (value.length < 20) return `Минимум 20 символов (сейчас ${value.length})`
  if (value.length > 300) return `Максимум 300 символов (сейчас ${value.length})`
  return null
}

export function validateConfirm(password: string, confirm: string): string | null {
  if (!confirm) return 'Подтвердите пароль'
  if (password !== confirm) return 'Пароли не совпадают'
  return null
}

export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (!digits) return ''
  const head = digits[0]
  let out = head
  if (digits.length > 1) out += '(' + digits.slice(1, 4)
  if (digits.length >= 4) out += ')'
  if (digits.length > 4) out += digits.slice(4, 7)
  if (digits.length > 7) out += '-' + digits.slice(7, 9)
  if (digits.length > 9) out += '-' + digits.slice(9, 11)
  return out
}

export function formatCard(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 16)
  return digits.match(/.{1,4}/g)?.join(' ') ?? digits
}