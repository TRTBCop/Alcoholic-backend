import { connection } from '../../dbConfig'

const alcoholsCtrl = {
    async getAlcohols (req: any, res: any) {
        connection.query('SELECT * FROM alcohol', (error: any, rows: any) => {
            if(error) throw error;
            res.send(rows)
        })
    },
    async insertAlcohol(req: any, res: any) {        
        const { alcohol_id, alcohol_name, alcohol_volume } = req.body;        
        const sql = `INSERT INTO alcohol(alcohol_id, alcohol_name, alcohol_volume) VALUES(${alcohol_id}, '${alcohol_name}', ${alcohol_volume})`

        connection.query(sql, (error: any, rows: any) => {
            if(error) throw error;
            res.send(rows)
        })
    },
    async deleteAlcohol(req: any, res: any) {
        console.log('delete')
    }

}

export { alcoholsCtrl }