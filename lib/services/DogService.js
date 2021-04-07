const Dog = require('../models/Dog');
const { sendSms } = require('../utils/twilio');

module.exports = class DogService {
    static async create({ ownerName, dogName, foodAllergies }) {
        await sendSms(
            process.env.ORDER_HANDLER_NUMBER, `Hello ${ownerName}! We are excited to welcome you and ${dogName} to Happy Paws doggy daycare. Our records indicate ${dogName} has the following food allergies: ${foodAllergies}. We look forward to see you both soon.`
        )

        const dog = await Dog.insert({ ownerName, dogName, foodAllergies })

        return dog;
    }
}