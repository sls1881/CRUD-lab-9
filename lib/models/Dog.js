const pool = require('../utils/pool');

module.exports = class Dog {
    id;
    dogName;
    age;
    foodAllergies;
    breed;
    ownerName;

    constructor(row) {
        this.id = row.id,
        this.dogName = row.dog_name,
        this.age = row.age,
        this.foodAllergies = row.food_allergies,
        this.breed = row.breed,
        this.ownerName = row.owner_name
    }

    static async insert({ dogName, 
        age, 
        foodAllergies, 
        breed, 
        ownerName }) {
     const { rows } = await pool.query(`INSERT INTO dogs (dog_name, age, food_allergies, breed, owner_name) VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
     [dogName, 
        age, 
        foodAllergies, 
        breed, 
        ownerName]);
     
     return new Dog(rows[0]);
    }

    static async select() {
        const { rows } = await pool.query(`
        SELECT *
        FROM dogs`);

        return rows.map(row => new Dog(row));
    }

    static async selectId(id) {
        const { rows } = await pool.query(`
        SELECT *
        FROM dogs
        WHERE id = $1`, 
        [id]);

        return new Dog(rows[0])
    }

    static async update(id, { age }) {
        const { rows } = await pool.query(`
        UPDATE dogs
        SET age = $1
        WHERE id = $2
        RETURNING *`,
        [age, id]);

        return new Dog(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(`DELETE FROM dogs
        WHERE id = $1 RETURNING *`,
        [id]);

        return new Dog(rows[0])
    }
} 
