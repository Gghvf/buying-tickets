import { ref } from 'vue'

export interface Movie {
  id: number
  title: string
  rating: string
  year: number
  genres: string
  country: string
  duration: string
  age: string
  poster: string
  hero?: string
  trailer?: string
  premiere?: string
  cast?: string
  description?: string
}

export interface Seat {
  row: number
  num: number
  type: 'place' | 'comfort'
  price: number
  tariff: string
}

export interface Order {
  movieId: number
  date: string
  time: string
  seats: Seat[]
  email: string
  phone: string
}

export interface Ticket extends Order {
  id: number
  total: number
  hall?: string
  refunded?: boolean
}

export interface Account {
  name: string
  phone: string
  password: string
}

export interface Filters {
  genres: string[]
  ages: string[]
  durations: string[]
  countries: string[]
  ratings: string[]
}

export const emptyFilters: Filters = { genres: [], ages: [], durations: [], countries: [], ratings: [] }

export const defaultUser: Account = { name: 'User123', phone: '+7 900 123-45-67', password: '123456' }

export const accounts = ref<Account[]>(JSON.parse(sessionStorage.getItem('accounts') || 'null') ?? [defaultUser])
export const user = ref<string | null>(sessionStorage.getItem('userName'))

export function findAccount(phone: string) {
  const digits = phone.replace(/\D/g, '')
  return accounts.value.find((a: Account) => a.phone.replace(/\D/g, '') === digits)
}

export function signIn(account: Account) {
  user.value = account.name
  sessionStorage.setItem('userName', account.name)
}

export function saveAccounts() {
  sessionStorage.setItem('accounts', JSON.stringify(accounts.value))
}

export const cinemaAddress = 'Владимир, просп. Ленина, 29'
export const seatPrices = { place: 400, comfort: 470 }

// схема зала снята с макета: p — Место, c — Комфорт
export const hallRows = [
  'pppppppppppppp',
  'pppppppppppppp',
  'pppppppppppppp',
  'ppccccccccccpp',
  'ppccccccccccpp',
  'ppccccccccccpp',
  'ppccccccccccpppp',
  'ppccccccccccpppp',
  'ppppccccccccccppppppp',
]
export const takenSeats = ['6-7', '6-8', '7-15', '7-16', '9-9', '9-10']

export const sessions = [
  { start: '12:40', end: '15:04' },
  { start: '15:30', end: '17:54' },
  { start: '18:20', end: '20:44' },
  { start: '21:10', end: '23:34' },
]

export function saveTicket(order: Order) {
  const tickets: Ticket[] = JSON.parse(sessionStorage.getItem('tickets') || '[]')
  tickets.push({ ...order, id: Date.now(), total: order.seats.reduce((sum, s) => sum + s.price, 0), hall: 'Зал 4' })
  sessionStorage.setItem('tickets', JSON.stringify(tickets))
  sessionStorage.removeItem('order')
}

export const pastTickets: Ticket[] = [
  {
    id: 1, movieId: 2, date: '20 октября 2026', time: '15:50', hall: 'Зал 7',
    seats: [{ row: 5, num: 6, type: 'comfort', price: 470, tariff: 'Взрослый' }],
    email: 'user@mail.ru', phone: '+7 900 123-45-67', total: 470,
  },
  {
    id: 2, movieId: 3, date: '12 октября 2026', time: '18:20', hall: 'Зал 2',
    seats: [{ row: 3, num: 8, type: 'place', price: 400, tariff: 'Взрослый' }],
    email: 'user@mail.ru', phone: '+7 900 123-45-67', total: 400,
  },
  {
    id: 3, movieId: 4, date: '05 октября 2026', time: '12:40', hall: 'Зал 4',
    seats: [
      { row: 4, num: 11, type: 'comfort', price: 470, tariff: 'Взрослый' },
      { row: 4, num: 12, type: 'comfort', price: 470, tariff: 'Взрослый' },
    ],
    email: 'user@mail.ru', phone: '+7 900 123-45-67', total: 940,
  },
]

export const movies: Movie[] = [
  {
    id: 1,
    title: 'Битва моторов',
    rating: '8.0',
    year: 2026,
    genres: 'приключения, драма',
    country: 'Россия',
    duration: '2 ч 24 мин',
    age: '12+',
    poster: '/img/bitva-poster.png',
    hero: '/img/bitva-hero.png',
    trailer: '/img/bitva-trailer.png',
    premiere: '08 октября 2026',
    cast: 'Иван Янковский, Юра Борисов, Паулина Андреева, Алексей Гуськов',
    description: 'Они мечтали создать первый российский серийный автомобиль. Чтобы спасти «Руссо-Балт», его создатели решаются на отчаянный шаг — покорить легендарное Ралли Монако.',
  },
  {
    id: 2,
    title: 'Проект «Конец света»',
    rating: '8.4',
    year: 2026,
    genres: 'фантастика, драма, комедия, приключения',
    country: 'США',
    duration: '2 ч 36 мин',
    age: '16+',
    poster: '/img/konec-poster.png',
    description: 'Астронавт Райленд Грейс просыпается на корабле в другой звёздной системе без памяти о миссии. Чтобы спасти Землю от угасания Солнца, ему предстоит восстановить события и найти союзника в самых неожиданных обстоятельствах.',
  },
  {
    id: 3,
    title: 'Однажды на ближнем востоке',
    rating: '8.1',
    year: 2026,
    genres: 'комедия, драма',
    country: 'США',
    duration: '2 ч 10 мин',
    age: '16+',
    poster: '/img/film3-poster.png',
    description: 'Двое незадачливых друзей волею судеб оказываются посреди чужой страны и пытаются вернуться домой, попадая из одной нелепой ситуации в другую.',
  },
  {
    id: 4,
    title: 'Холоп 3',
    rating: '7.8',
    year: 2026,
    genres: 'комедия',
    country: 'Россия',
    duration: '2 ч 00 мин',
    age: '12+',
    poster: '/img/comedy-1.png',
    premiere: '22 октября 2026',
    cast: 'Милош Бикович, Аглая Тарасова, Иван Охлобыстин',
    description: 'Избалованный мажор Гриша снова проваливается в «прошлое»: на этот раз перевоспитание забрасывает его в эпоху Петра I, где ни деньги, ни связи не спасают от тяжёлой работы и настоящей дружбы.',
  },
  {
    id: 5,
    title: 'Очень страшное кино',
    rating: '7.0',
    year: 2026,
    genres: 'комедия',
    country: 'США',
    duration: '1 ч 35 мин',
    age: '18+',
    poster: '/img/comedy-2.png',
    premiere: '12 июня 2026',
    cast: 'Марлон Уайанс, Шон Уайанс, Анна Фэрис, Реджина Холл',
    description: 'Синди и компания возвращаются: новая волна пародий на главные хиты кино и сериалов — от слэшеров до супергероики, с фирменным абсурдом и чёрным юмором.',
  },
  {
    id: 6,
    title: 'Человек-паук: Новый день',
    rating: '8.2',
    year: 2026,
    genres: 'фантастика, боевик, приключения',
    country: 'США',
    duration: '2 ч 15 мин',
    age: '12+',
    poster: '/img/fant-2.png',
    premiere: '31 июля 2026',
    cast: 'Том Холланд, Зендея, Сэди Синк, Джон Бернтал',
    description: 'Питер Паркер начинает жизнь с чистого листа: мир забыл, кто скрывается под маской, но Нью-Йорк снова нуждается в герое — и у Человека-паука появляются неожиданные союзники.',
  },
  {
    id: 7,
    title: 'Бэтмен 2',
    rating: '8.5',
    year: 2026,
    genres: 'фантастика, боевик, криминал, детектив',
    country: 'США',
    duration: '2 ч 30 мин',
    age: '16+',
    poster: '/img/novinki.png',
    hero: '/img/novinki.png',
    premiere: '02 октября 2026',
    cast: 'Роберт Паттинсон, Зои Кравиц, Джеффри Райт, Колин Фаррелл',
    description: 'Брюс Уэйн продолжает очищать Готэм от коррупции, но город погружается в хаос: после потопа на улицы выходит новый враг, который знает тайну семьи Уэйнов.',
  }
]

// главная страница: постер и фильм, который он открывает, связаны в одном месте
export const mainBanner = { img: '/img/bitva-poster.png', movieId: 1 }
export const mainRows = [
  {
    title: 'Комедии',
    items: [
      { img: '/img/comedy-1.png', movieId: 4 }, // Холоп 3
      { img: '/img/comedy-2.png', movieId: 5 }, // Очень страшное кино
    ],
  },
  {
    title: 'Фантастика',
    items: [
      { img: '/img/fant-1.png', movieId: 7 }, // бэтмен 2
      { img: '/img/fant-2.png', movieId: 6 }, // Человек-паук: Новый день
      { img: '/img/konec-poster.png', movieId: 2 }, // Проект «Конец света»
    ],
  },
]