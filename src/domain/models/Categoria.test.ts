import { describe, expect, it } from 'vitest'
import { Categoria } from './Categoria'

describe('Categoria', () => {

  it('deve instanciar uma categoria com os parametros corretos', () => {
    const nome = 'nome'
    const id = 'id'

    const categoria = new Categoria(id, nome)

    expect(categoria.id).toBe(id)
    expect(categoria.nome).toBe(nome)
  })

  it('deve permitir alterar o nome da categoria', () => {
    const categoria = new Categoria('1', 'Inicial')

    categoria.nome = 'Novo Nome'

    expect(categoria.nome).toBe('Novo Nome')
  })

  it('deve refletir a alteração do nome após usar o setter', () => {
    const categoria = new Categoria('1', 'Categoria Antiga')

    categoria.nome = 'Categoria Nova'

    expect(categoria.nome).not.toBe('Categoria Antiga')
    expect(categoria.nome).toBe('Categoria Nova')
  })

  it('deve permitir alterar o nome mais de uma vez', () => {
    const categoria = new Categoria('1', 'A')

    categoria.nome = 'B'
    expect(categoria.nome).toBe('B')

    categoria.nome = 'C'
    expect(categoria.nome).toBe('C')
  })
})