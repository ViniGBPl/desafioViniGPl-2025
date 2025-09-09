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

    const ordem = ordemAnimais ? ordemAnimais.split(',') : [];
    const brinquedos1 = brinquedosPessoa1 ? brinquedosPessoa1.split(',') : [];
    const brinquedos2 = brinquedosPessoa2 ? brinquedosPessoa2.split(',') : [];

    // --- VALIDAÇÕES DE ENTRADA ---
    const animaisDaOrdem = new Set(ordem);
    if (animaisDaOrdem.size !== ordem.length || ordem.length === 0) {
      return { erro: 'Animal inválido' };
    }
    for (const nomeAnimal of ordem) {
      if (!animais[nomeAnimal]) {
        return { erro: 'Animal inválido' };
      }
    }

    const todosOsBrinquedosValidos = new Set(Object.values(animais).flatMap(a => a.brinquedos));
    const validaListaDeBrinquedos = (lista) => {
      if (lista.length === 1 && lista[0] === '') return true;
      const set = new Set(lista);
      if (set.size < lista.length) return false;
      for (const brinquedo of lista) {
        if (brinquedo && !todosOsBrinquedosValidos.has(brinquedo)) return false;
      }
      return true;
    };

    if (!validaListaDeBrinquedos(brinquedos1) || !validaListaDeBrinquedos(brinquedos2)) {
      return { erro: 'Brinquedo inválido' };
    }

    // --- LÓGICA DE ADOÇÃO ---
    const resultado = [];
    const adotadosPorPessoa = { 1: 0, 2: 0 };

    for (const nomeAnimal of ordem) {
      const animal = animais[nomeAnimal];
      let pessoa1PodeAdotar = this.podeAdotar(animal, brinquedos1, ordem);
      let pessoa2PodeAdotar = this.podeAdotar(animal, brinquedos2, ordem);
      
      const adotadoPor1 = pessoa1PodeAdotar && adotadosPorPessoa[1] < 3;
      const adotadoPor2 = pessoa2PodeAdotar && adotadosPorPessoa[2] < 3;

      if (adotadoPor1 && adotadoPor2) {
        resultado.push(`${nomeAnimal} - abrigo`);
      } else if (adotadoPor1) {
        resultado.push(`${nomeAnimal} - pessoa 1`);
        adotadosPorPessoa[1]++;
      } else if (adotadoPor2) {
        resultado.push(`${nomeAnimal} - pessoa 2`);
        adotadosPorPessoa[2]++;
      } else {
        resultado.push(`${nomeAnimal} - abrigo`);
      }
    }
    
    return { lista: resultado.sort(), erro: null };
  }
  
  podeAdotar(animal, brinquedosPessoa, ordemAnimais) {
    const { tipo, brinquedos: favs } = animal;

    if (tipo === 'jabuti') {
      if (ordemAnimais.length <= 1) return false;
      const pessoaSet = new Set(brinquedosPessoa);
      return favs.every(b => pessoaSet.has(b));
    }

    let favIndex = 0;
    // Encontra o índice na lista da pessoa onde o último brinquedo favorito foi achado
    let lastMatchIndex = -1;
    for(let i = 0; i < brinquedosPessoa.length; i++) {
        if(favIndex < favs.length && brinquedosPessoa[i] === favs[favIndex]) {
            favIndex++;
            lastMatchIndex = i;
        }
    }

    // Se a sequência completa não foi encontrada, não pode adotar
    if (favIndex < favs.length) {
        return false;
    }

    // Se for um gato, não pode haver brinquedos extras após o final da sequência
    if (tipo === 'gato') {
        if (brinquedosPessoa.length > lastMatchIndex + 1) {
            return false;
        }
    }
    
    return true;
  }
}

export { AbrigoAnimais as AbrigoAnimais };