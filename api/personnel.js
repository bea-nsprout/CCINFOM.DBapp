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
            query("name").isString().notEmpty().optional()
        ],
        assertDefined("name"),
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { name } = matchedData(req);
            console.log(name);
            const [results] = await connection.execute(
                `SELECT first_name, last_name, position
 	FROM personnel
	WHERE first_name LIKE ? OR last_name LIKE ?
	ORDER BY personnel_id;`,
                [`%${name}%`, `%${name}%`]
            )
            res.status(200).json(results);
        }
    )

    router.get('/view',
        async (req, res) => {
            const [results] = await connection.execute(
                `SELECT personnel_id, first_name, last_name, position
	FROM personnel
	ORDER BY personnel_id`
            )
            res.status(200).json(results);
        }
    )

    router.post('/delete',
        [body("id").isNumeric().notEmpty()],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            const { id } = matchedData(req);
            const [[{ personnel_in_requests }]] = await connection.execute(`SELECT EXISTS (
    		SELECT 1 
    		FROM requests r 
    		WHERE r.personnel_id = ?
	) AS personnel_in_requests;`, [id])

            if (personnel_in_requests) {
                res.status(400).json({ success: false, error: "personnel cannot be deleted." });
                return;
            }

            await connection.execute(`DELETE p
	FROM personnel p
	LEFT JOIN requests r ON p.personnel_id = r.personnel_id
    	LEFT JOIN transfers t ON p.personnel_id = t.personnel_id
	WHERE p.personnel_id = ? AND r.personnel_id IS NULL AND t.personnel_id IS NULL;`, [id]);
            res.status(200).json({ success: true, message: "successfully deleted personel" });
        }
    )

    router.post('/modify',
        [
            body("personnel_id").isNumeric().notEmpty(),
            body("position").isString().notEmpty(),
            body("first_name").isString().notEmpty(),
            body("last_name").isString().notEmpty(),
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            console.log("YOW");
            const { personnel_id, first_name, last_name, position } = matchedData(req);
            await connection.execute(`	UPDATE personnel
    SET position = ?, first_name = ?, last_name = ?
    	WHERE personnel_id = ?;`, [position, first_name, last_name, personnel_id]);

            res.status(200).json({ success: true, message: "successfully modified personnel." });
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

            res.status(200).json({ success: true, message: "successfully modified status." });
        }
    )

    router.post('/new',
        [
            body("first_name").isString().notEmpty(),
            body("last_name").isString().notEmpty(),
            body("position").isString().notEmpty()
        ],
        validationStrictRoutine(400, ""),
        async (req, res) => {
            console.log("HI");
            const { first_name, last_name, position } = matchedData(req);

            await connection.execute(`INSERT INTO personnel (first_name, last_name, position) VALUES
		(?, ?, ?);`,
                [first_name, last_name, position]
            )

            res.status(200).json({ success: true, message: "successfully created new personnel." });
        }


    )
    return router;
}

export default personnelRouter;