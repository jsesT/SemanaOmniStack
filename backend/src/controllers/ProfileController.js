// Responsável pelo perfil de uma ONG (PROFILE CARALHO)

const connection = require('../database/connection');

module.exports = {
  // Este vai listar somente os incidents da ONG que estiver logada.
  async index(request, response) {
    const ong_id = request.headers.authorization; // Aqui ele puxa a informação do id de quem ta logado.

    const incidents = await connection('incidents')
      .where('ong_id', ong_id)
      .select('*');

    return response.json(incidents);

  }
}





