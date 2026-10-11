export type Position = 'Вратарь' | 'Защитник' | 'Полузащитник' | 'Нападающий'

export type Player = {
  id: number
  number: number
  name: string
  position: Position
  age: number
  height: number
  weight: number
  foot: 'Правый' | 'Левый'
  birthplace: string
  joinedAt: string
  isCaptain?: boolean
  bio: string
  stats: {
    season: string
    matches: number
    goals: number
    assists: number
    yellowCards: number
    redCards: number
  }
}

export const players: Player[] = [
  // ─── ВРАТАРИ ──────────────────────────────────────────
  {
    id: 1, number: 1, name: 'Артём Белов', position: 'Вратарь', age: 28, height: 190, weight: 84,
    foot: 'Правый', birthplace: 'Санкт-Петербург', joinedAt: '2021',
    bio: 'Воспитанник петербургской школы футбола. Пришёл в клуб в 2021 году и с тех пор стал основным вратарём команды. Отличается уверенной игрой на выходах и умением руководить обороной.',
    stats: { season: '2025/26', matches: 11, goals: 0, assists: 0, yellowCards: 1, redCards: 0 },
  },
  {
    id: 2, number: 12, name: 'Никита Крайнов', position: 'Вратарь', age: 22, height: 187, weight: 80,
    foot: 'Правый', birthplace: 'Великий Новгород', joinedAt: '2023',
    bio: 'Молодой голкипер, пришедший из академии «Зенита». Считается одним из самых перспективных вратарей дивизиона. Отлично играет на линии и уверенно действует при пенальти.',
    stats: { season: '2025/26', matches: 2, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
  },
  {
    id: 3, number: 35, name: 'Максим Ветров', position: 'Вратарь', age: 19, height: 185, weight: 76,
    foot: 'Правый', birthplace: 'Колпино', joinedAt: '2025',
    bio: 'Воспитанник академии СКА-Невы. Самый молодой вратарь в составе. Дебютировал за основной состав в кубковом матче в возрасте 18 лет.',
    stats: { season: '2025/26', matches: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
  },

  // ─── ЗАЩИТНИКИ ────────────────────────────────────────
  {
    id: 4, number: 4, name: 'Матвей Лукальдини', position: 'Защитник', age: 20, height: 188, weight: 80,
    foot: 'Правый', birthplace: 'Санкт-Петербург', joinedAt: '2024', isCaptain: true,
    bio: 'Самый молодой капитан в истории клуба. Центральный защитник с отличным чтением игры и лидерскими качествами. Несмотря на возраст, уже стал голосом обороны и настоящим вожаком команды.',
    stats: { season: '2025/26', matches: 11, goals: 1, assists: 1, yellowCards: 3, redCards: 0 },
  },
  {
    id: 5, number: 2, name: 'Даниил Творогов', position: 'Защитник', age: 26, height: 182, weight: 77,
    foot: 'Правый', birthplace: 'Мурманск', joinedAt: '2022',
    bio: 'Правый защитник, известный своей выносливостью и подключениями в атаку. За сезон пробегает больше всех в команде. Отличный исполнитель стандартов.',
    stats: { season: '2025/26', matches: 11, goals: 0, assists: 3, yellowCards: 2, redCards: 0 },
  },
  {
    id: 6, number: 3, name: 'Игорь Невский', position: 'Защитник', age: 24, height: 185, weight: 79,
    foot: 'Левый', birthplace: 'Выборг', joinedAt: '2023',
    bio: 'Левый защитник с прекрасной левой ногой. Умеет как обороняться, так и обострять игру в атаке. Его подачи с фланга — одна из визитных карточек команды.',
    stats: { season: '2025/26', matches: 10, goals: 1, assists: 2, yellowCards: 4, redCards: 0 },
  },
  {
    id: 7, number: 5, name: 'Роман Волков', position: 'Защитник', age: 27, height: 186, weight: 82,
    foot: 'Правый', birthplace: 'Калининград', joinedAt: '2021',
    bio: 'Опытный центральный защитник. Надёжен в единоборствах, хорош на втором этаже. Автор важных голов после угловых.',
    stats: { season: '2025/26', matches: 11, goals: 2, assists: 0, yellowCards: 3, redCards: 0 },
  },
  {
    id: 8, number: 6, name: 'Сергей Березуцкий', position: 'Защитник', age: 23, height: 180, weight: 75,
    foot: 'Правый', birthplace: 'Тверь', joinedAt: '2024',
    bio: 'Универсальный защитник, способный закрыть любую позицию в обороне. Его самоотдача и готовность играть на любой позиции ценятся тренерским штабом.',
    stats: { season: '2025/26', matches: 8, goals: 0, assists: 1, yellowCards: 2, redCards: 0 },
  },
  {
    id: 9, number: 13, name: 'Кирилл Зайцев', position: 'Защитник', age: 25, height: 184, weight: 78,
    foot: 'Правый', birthplace: 'Санкт-Петербург', joinedAt: '2022',
    bio: 'Быстрый защитник с хорошим стартовым рывком. Успешно противостоит скоростным нападающим соперника. Воспитанник петербургского футбола.',
    stats: { season: '2025/26', matches: 7, goals: 0, assists: 0, yellowCards: 1, redCards: 0 },
  },
  {
    id: 10, number: 22, name: 'Владислав Орлов', position: 'Защитник', age: 21, height: 179, weight: 73,
    foot: 'Левый', birthplace: 'Колпино', joinedAt: '2025',
    bio: 'Молодой воспитанник академии клуба. Получил шанс в основе в этом сезоне и успешно им воспользовался. Прогрессирует от матча к матчу.',
    stats: { season: '2025/26', matches: 5, goals: 0, assists: 0, yellowCards: 1, redCards: 0 },
  },
  {
    id: 11, number: 44, name: 'Степан Давиташвили', position: 'Защитник', age: 20, height: 183, weight: 77,
    foot: 'Правый', birthplace: 'Сочи', joinedAt: '2025',
    bio: 'Перспективный защитник, приехавший из южной школы футбола. Отлично играет в подкатах, отличается неуступчивым характером.',
    stats: { season: '2025/26', matches: 3, goals: 0, assists: 0, yellowCards: 0, redCards: 0 },
  },

  // ─── ПОЛУЗАЩИТНИКИ ────────────────────────────────────
  {
    id: 12, number: 8, name: 'Никита Иванов', position: 'Полузащитник', age: 25, height: 178, weight: 72,
    foot: 'Правый', birthplace: 'Тверь', joinedAt: '2022',
    bio: 'Центральный полузащитник с отличным видением поля. Автор победного гола в матче с «Волгой-Тверью». Считается одним из самых перспективных игроков команды.',
    stats: { season: '2025/26', matches: 11, goals: 3, assists: 4, yellowCards: 2, redCards: 0 },
  },
  {
    id: 13, number: 10, name: 'Максим Кузнецов', position: 'Полузащитник', age: 28, height: 176, weight: 70,
    foot: 'Левый', birthplace: 'Москва', joinedAt: '2023',
    bio: 'Плеймейкер команды с левым рабочим футом. Мастер стандартов и последнего паса. В прошлом сезоне стал лучшим ассистентом клуба.',
    stats: { season: '2025/26', matches: 10, goals: 4, assists: 6, yellowCards: 1, redCards: 0 },
  },
  {
    id: 14, number: 7, name: 'Антон Смирнов', position: 'Полузащитник', age: 23, height: 180, weight: 74,
    foot: 'Правый', birthplace: 'Вологда', joinedAt: '2023',
    bio: 'Атакующий полузащитник с хорошей техникой и дриблингом. Может сыграть как в центре, так и на фланге. Отличается нестандартными решениями на поле.',
    stats: { season: '2025/26', matches: 9, goals: 2, assists: 3, yellowCards: 0, redCards: 0 },
  },
  {
    id: 15, number: 14, name: 'Дмитрий Бут', position: 'Полузащитник', age: 26, height: 175, weight: 71,
    foot: 'Правый', birthplace: 'Псков', joinedAt: '2022',
    bio: 'Опорный полузащитник, отвечающий за разрушение атак соперника. Отличается высокой работоспособностью и цепкостью в отборе.',
    stats: { season: '2025/26', matches: 11, goals: 1, assists: 2, yellowCards: 4, redCards: 1 },
  },
  {
    id: 16, number: 17, name: 'Александр Соловьёв', position: 'Полузащитник', age: 22, height: 177, weight: 72,
    foot: 'Правый', birthplace: 'Санкт-Петербург', joinedAt: '2024',
    bio: 'Молодой центральный полузащитник. Воспитанник петербургской школы. Быстро прогрессирует и всё чаще появляется в стартовом составе.',
    stats: { season: '2025/26', matches: 7, goals: 1, assists: 1, yellowCards: 1, redCards: 0 },
  },
  {
    id: 17, number: 20, name: 'Павел Фомин', position: 'Полузащитник', age: 24, height: 179, weight: 73,
    foot: 'Левый', birthplace: 'Выборг', joinedAt: '2024',
    bio: 'Левый полузащитник, умеющий обострить игру с фланга. Хорошо видит поле и своевременно отдаёт передачи в свободные зоны.',
    stats: { season: '2025/26', matches: 8, goals: 1, assists: 2, yellowCards: 0, redCards: 0 },
  },

  // ─── НАПАДАЮЩИЕ ───────────────────────────────────────
  {
    id: 18, number: 9, name: 'Алексей Соколов', position: 'Нападающий', age: 27, height: 185, weight: 80,
    foot: 'Правый', birthplace: 'Калининград', joinedAt: '2025',
    bio: 'Новичок сезона, перешедший из «Балтики-2». Быстрый, техничный форвард, отлично играет на грани офсайда. Уже успел отметиться дублем в дебютном матче.',
    stats: { season: '2025/26', matches: 9, goals: 5, assists: 2, yellowCards: 0, redCards: 0 },
  },
  {
    id: 19, number: 11, name: 'Иван Петров', position: 'Нападающий', age: 24, height: 182, weight: 78,
    foot: 'Правый', birthplace: 'Выборг', joinedAt: '2020',
    bio: 'Воспитанник академии клуба. С детства в структуре СКА-Невы, прошёл путь от юношеской команды до основного состава. Автор гола в ворота «Волги-Тверь».',
    stats: { season: '2025/26', matches: 11, goals: 4, assists: 3, yellowCards: 1, redCards: 0 },
  },
  {
    id: 20, number: 19, name: 'Сергей Лебедев', position: 'Нападающий', age: 29, height: 187, weight: 83,
    foot: 'Правый', birthplace: 'Петрозаводск', joinedAt: '2023',
    bio: 'Опытный форвард-таргетмен. Отлично играет на втором этаже и в штрафной. Один из немногих игроков команды с опытом игры в ФНЛ-2.',
    stats: { season: '2025/26', matches: 10, goals: 3, assists: 1, yellowCards: 2, redCards: 0 },
  },
  {
    id: 21, number: 77, name: 'Василий Баронов', position: 'Нападающий', age: 21, height: 181, weight: 76,
    foot: 'Левый', birthplace: 'Колпино', joinedAt: '2024',
    bio: 'Скоростной молодой нападающий. Воспитанник академии клуба. Отлично действует на контратаках, любит уходить от защитников по флангу.',
    stats: { season: '2025/26', matches: 6, goals: 1, assists: 1, yellowCards: 0, redCards: 0 },
  },
  {
    id: 22, number: 99, name: 'Дмитрий Снегов', position: 'Нападающий', age: 20, height: 184, weight: 78,
    foot: 'Правый', birthplace: 'Санкт-Петербург', joinedAt: '2025',
    bio: 'Самый молодой нападающий команды. Пришёл из молодёжной системы «Зенита». Обладает отличным голевым чутьём и хорошим ударом с обеих ног.',
    stats: { season: '2025/26', matches: 4, goals: 2, assists: 0, yellowCards: 0, redCards: 0 },
  },
]

export function getPlayerById(id: number): Player | undefined {
  return players.find((p) => p.id === id)
}