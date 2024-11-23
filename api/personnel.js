import express from "express";
import { matchedData, query, body } from "express-validator";
import { assertDefined, validationStrictRoutine } from "./helper.js";

const personnelRouter = (connection) => {
    const router = express.Router();

    router.get('/view',
        [query("status").isBoolean().optional()],
        assertDefined("status"),
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { status } = matchedData(req);
            const [results] = await connection.execute(
                `SELECT first_name, last_name, position
	FROM personnel
	WHERE archived = ?
	ORDER BY personnel_id`,
                [status == 'true']
            )
            res.status(200).json(results);
        }
    )

    router.get('/view',
        [query("position").isString().notEmpty().optional()],
        assertDefined("position"),
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { position } = matchedData(req);
            const [results] = await connection.execute(
                `SELECT first_name, last_name, position
	FROM personnel
	WHERE position = ? 
	ORDER BY personnel_id`,
                [position]
            )
            res.status(200).json(results);
        }
    )

    router.get('/view',
        [
            query("firstname").isString().notEmpty().optional(),
            query("lastname").isString().notEmpty().optional()
        ],
        assertDefined("firstname"),
        assertDefined("lastname"),
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { firstname, lastname } = matchedData(req);
            const [results] = await connection.execute(
                `SELECT first_name, last_name, position
 	FROM personnel
	WHERE first_name = ? OR last_name = ?
	ORDER BY personnel_id;`,
                [firstname, lastname]
            )
            res.status(200).json(results);
        }
    )

    router.get('/view',
        async (req, res) => {
            const [results] = await connection.execute(
                `SELECT first_name, last_name, position
	FROM personnel
	ORDER BY personnel_id`
            )
            res.status(200).json(results);
        }
    )

    router.delete('/delete',
        [body("id").isString().notEmpty().optional()],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { id } = matchedData(req);
            const [[{ personnel_in_requests }]] = await connection.execute(`SELECT EXISTS (
    		SELECT 1 
    		FROM requests r 
    		WHERE r.personnel_id = ?
	) AS personnel_in_requests;`, [id])

            if (personnel_in_requests) {
                res.status(400).json({ success: false, error: "warehouse has items in it." });
                return;
            }

            await connection.execute(`DELETE p
	FROM personnels p
	LEFT JOIN requests r ON p.personnel_id = r.personnel_id
    	LEFT JOIN transfers t ON p.personnel_id = t.personnel_id
	WHERE p.personnel_id = ? AND r.personnel_id IS NULL AND t.personnel_id IS NULL;`, [id]);
            res.status(200).json({ success: true });
        }
    )

    router.post('/modify/position',
        [body("id").isNumeric().notEmpty(),
        body("position").isString().notEmpty(),
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { id, position } = matchedData(req);
            await connection.execute(`	UPDATE personnel
    	SET position = ?
    	WHERE personnel_id = ?;`, [position, id]);

            res.status(200).json({ success: true });
        }
    )

    router.post('/modify/status',
        [body("id").isNumeric().notEmpty(),
        body("status").isBoolean(),
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { id, status } = matchedData(req);
            await connection.execute(`	UPDATE personnel
    	SET archived = ?
    	WHERE personnel_id = ?;`, [status, id]);

            res.status(200).json({ success: true });
        }
    )

    router.post('/new',
        [
            body("firstname").isString().notEmpty().optional(),
            body("lastname").isString().notEmpty().optional(),
            body("position").isString().notEmpty().optional()
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { firstname, lastname, position } = matchedData(req);

            await connection.execute(`INSERT INTO personnel (first_name, last_name, position) VALUES
		(?, ?, ?);`,
                [firstname, lastname, position]
            )

            res.status(200).json({ success: true });
        }


    )
    return router;
}

export default personnelRouter;