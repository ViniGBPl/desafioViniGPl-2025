import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });
  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,OSSO', 'RATO', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  test('Deve rejeitar brinquedos duplicados para uma pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,BOLA', 'RATO', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  test('Deve rejeitar animais duplicados na ordem', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,RATO', 'LASER', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
  });

  test('Deve impedir adoção do Loco se não houver companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO', '', 'Loco');
    expect(resultado.lista[0]).toBe('Loco - abrigo');
  });
  
  test('Deve permitir adoção do Loco se houver companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO', '', 'Loco,Rex');
    expect(resultado.lista).toContain('Loco - pessoa 1');
  });

  test('Gato não deve ser adotado se a pessoa tiver brinquedos a mais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER,RATO', '', 'Mimi');
    expect(resultado.lista[0]).toBe('Mimi - abrigo');
  });


});
