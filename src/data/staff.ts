export type Staff = {
  id: number
  name: string
  role: string
  age: number
  initials: string
}

export const staff: Staff[] = [
  { id: 1, name: 'Диментий Диментьев', role: 'Главный тренер', age: 52, initials: 'ДД' },
  { id: 2, name: 'Рига Дмитрович', role: 'Старший тренер', age: 47, initials: 'РД' },
  { id: 3, name: 'Олег Щербаков', role: 'Тренер вратарей', age: 43, initials: 'ОЩ' },
  { id: 4, name: 'Павел Дементьев', role: 'Тренер по физподготовке', age: 38, initials: 'ПД' },
]