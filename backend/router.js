const express = require('express');
const db = require('./db/db');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/', async (req, res) => {
    try {
        const cars = await db.select().from('cars');
        if (cars) {
            res.json(cars);
        } else {
            res.status(500).json('Internal Server Error.');
        }
    } catch (err) {
        console.log('ERROR - GET CARS: '+ err);
        res.status(500).json(err.message);
    }
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const cars = await db.select().from('cars').where({id});
        if (cars) {
            res.json(cars[0]);
        } else {
            res.status(500).json('Internal Server Error.');
        }
    } catch (err) {
        console.log('ERROR - GET CAR: '+ err, 'id-'+id);
        res.status(500).json(err.message)
    }
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/', async (req, res) => {
    const car = req.body;
    try {
        const dbRes = await db.insert(car).into('cars').returning('id');
        if (dbRes) {
            res.json({msg:'Success', id: dbRes[0].id});
        } else {
            res.status(500).json('Internal Server Error.');
        }
    } catch (err) {
        console.log('ERROR - POST CAR: '+ err, 'car-'+car);
        res.status(500).json(err.message);
    }
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const car = req.body;
    try {
        const dbRes = await db('cars').update(car).where({ id });
        if (dbRes) {
            res.json('Success');
        } else {
            res.status(500).json('Internal Server Error.')
        }
    } catch (err) {
        console.log('ERROR - PUT CAR: '+ err, 'id-'+id);
        res.status(500).json(err);
    }
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const dbRes = await db('cars').where({id}).del();
        if (dbRes) {
            res.json('Success');
        } else {
            res.status(500).json('Internal Server Error.');
        }
    } catch (err) {
        console.log('ERROR - DEL CAR: '+ err, 'id-'+id);
        res.status(500).json(err)
    }
})


module.exports = router;