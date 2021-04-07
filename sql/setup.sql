DROP TABLE IF EXISTS dogs;

CREATE TABLE dogs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    dog_name TEXT NOT NULL,
    age INT CHECK (age > 0) NOT NULL,
    food_allergies TEXT NOT NULL,
    breed TEXT NOT NULL,
    owner_name TEXT NOT NULL
)