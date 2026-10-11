export type Staff = {
  id: number
  name: string
  role: string
  age: number
  initials: string
}

export const staff: Staff[] = [
  { id: 1, name: 'Виктор Шторм', role: 'Главный тренер', age: 52, initials: 'ВШ' },
  { id: 2, name: 'Андрей Крылов', role: 'Старший тренер', age: 47, initials: 'АК' },
  { id: 3, name: 'Олег Щербаков', role: 'Тренер вратарей', age: 43, initials: 'ОЩ' },
  { id: 4, name: 'Павел Дементьев', role: 'Тренер по физподготовке', age: 38, initials: 'ПД' },
]