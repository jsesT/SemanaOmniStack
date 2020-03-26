// Quando você faz o login você cria uma sessão ( SessionController)

const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    console.log(id);

    const ong = await connection('ongs')
      .where('id', id) // ele procura 'ID' Coluna, ID valores.
      .select('name') // Seleciona apenas a coluna name.
      .first();

    // Se a ONG não existir ele irá retornar com o status 400.

    if (!ong) {
      return response.status(400).json({ error: 'No ONG found with this ID' });
    }

    return response.json(ong);


  }
}
