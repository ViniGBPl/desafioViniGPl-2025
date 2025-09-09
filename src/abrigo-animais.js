class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const animais = {
      Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] },
    };

    const brinquedos1 = brinquedosPessoa1.split(',');
    const brinquedos2 = brinquedosPessoa2.split(',');
    const ordem = ordemAnimais.split(',');

    const resultado = [];
    const adotadosPorPessoa = { 1: 0, 2: 0 };

    for (const nomeAnimal of ordem) {
      if (!animais[nomeAnimal]) {
        return { erro: 'Animal inválido', lista: undefined };
      }

      const { tipo, brinquedos } = animais[nomeAnimal];
      const pessoa1Atende = this.verificaBrinquedos(brinquedos, brinquedos1, tipo === 'jabuti');
      const pessoa2Atende = this.verificaBrinquedos(brinquedos, brinquedos2, tipo === 'jabuti');

      if (pessoa1Atende && pessoa2Atende) {
        resultado.push(`${nomeAnimal} - abrigo`);
      } else if (pessoa1Atende && adotadosPorPessoa[1] < 3) {
        resultado.push(`${nomeAnimal} - pessoa 1`);
        adotadosPorPessoa[1]++;
      } else if (pessoa2Atende && adotadosPorPessoa[2] < 3) {
        resultado.push(`${nomeAnimal} - pessoa 2`);
        adotadosPorPessoa[2]++;
      } else {
        resultado.push(`${nomeAnimal} - abrigo`);
      }
    }

    return { lista: resultado.sort(), erro: null };
  }

  verificaBrinquedos(brinquedosFavoritos, brinquedosPessoa, ignorarOrdem) {
    if (ignorarOrdem) {
      return brinquedosFavoritos.every((brinquedo) => brinquedosPessoa.includes(brinquedo));
    }

    let index = 0;
    for (const brinquedo of brinquedosPessoa) {
      if (brinquedo === brinquedosFavoritos[index]) {
        index++;
      }
      if (index === brinquedosFavoritos.length) {
        return true;
      }
    }
    return false;
  }
}

export { AbrigoAnimais as AbrigoAnimais };