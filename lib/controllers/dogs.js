const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()
.post('/', async (req, res, next) => {

    try{
        const newDog = await Dog.insert(req.body)
        res.send(newDog)
    } catch (err) {
        next(err);
    }
})


.get('/', async (req, res, next) => {

    const allDogs = await Dog.select()

    res.send(allDogs);
})

.get('/:id', async (req, res, next) => {

    const aDog = await Dog.selectId(req.params.id)

    res.send(aDog);
})

.put('/:id', async (req, res, next) => {
    try{
        const updateDog = await Dog.update(req.params.id, req.body);
        res.send(updateDog)
    } catch (err) {
        next(err);
    }
})

.delete('/:id', async (req, res, next) => {
    try{
        const deleteDog = await Dog.delete(req.params.id)
        res.send(deleteDog)
    } catch (err) {
        next(err);
        }
});