const connection = require('../database/connection');

module.exports = {
  // Metódo para fazer listagem dos Incidents
  async index(request, response) {
    // Paginação para não puxar todas as informações de uma só, puxando de (ex: de 5 em 5)
    const { page = 1 } = request.query; // Se não tiver informado o valor de page, ele vai ser por padrão ''1''

    const [count] = await connection('incidents').count(); // query para saber quantos casos tem em aberto no sistema

    console.log(count);



    // ('*') Usado para selecionar todas os dados de uma determinada (incident)
    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5) // Limite de itens por paginas
      .offset((page - 1) * 5)
      .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

    response.header('X-Total-Count', count['count(*)']);

    // Retorna os incidents que foram selecionados
    return response.json(incidents);

  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization; // Aqui ele puxa a informação do id de quem ta logado.

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id });

  },
  async delete(request, response) {
    // Colocando o ID que ta vindo do parametro da rota
    const { id } = request.params;
    // Seleciona o ID da ONG, que está fazendo a requisição.
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)     // . filtrar dentro da pasta um determinado item 'ID' Coluna , ID valores
      .select('ong_id')
      .first();  // apenas 1 resultado

    // Se os valores que estiverem no nosso banco de dados estiver diferente do que está logado irá aparecer um erro.
    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operation not permitted.' }); // Uma ong não pode deletar um incident de outra ong que não esteja logada. 
    }
    // Vai puxar os valores informados dentro do (incidents) utilizando o route params 'ID' , ID.
    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  }

};