// import pool from "../config/postgresql.js";
async function sendCoordinates(req, res) {

    // try{
    //     const {user_id, longitude, latitude} = req.body;
    //     console.log(req.body);
    //     const query = `
    //                     INSERT INTO coordinates (user_id, location)
    //                     VALUES ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326))
    //                   `;
    //     const values = [user_id, longitude, latitude];
    //     await pool.query(query, values);
    //     return res.status(200).send({ message: "Coordenadas guardadas" });

    // }catch (error){
    //     console.log(error)
    //     res.status(500).send({ error: "Error de servidor" })
    // }
}

async function getCoordinates(req, res) {
    // try{
    //     const response = await pool.query('SELECT * FROM coordinates');
    //     return res.json(response.rows);

    // }catch (error){
    //     console.log(error)
    //     res.status(500).send({ error: error.message })
    // }
}
export const GeolocationController = {
    sendCoordinates,
    getCoordinates
};
