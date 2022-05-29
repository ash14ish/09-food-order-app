import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import LoadingSpinner from "../UI/Spinner";
import ErrorMessage from "../UI/ErrorMessage";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        let response = await fetch(
          "https://foodifite-default-rtdb.firebaseio.com/meals.json"
        );

        if (!response.ok) {
          throw new Error(
            `Something went wrong. \n \nError Code : ${response.status}`
          );
        }

        let data = await response.json();

        let loadedMeals = [];

        for (const [id, mealObj] of Object.entries(data)) {
          loadedMeals.push({
            id,
            name: mealObj.name,
            description: mealObj.description,
            price: mealObj.price,
          });
        }

        setMeals(loadedMeals);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        setIsLoading(false);
        setError(err.message);
      }
    };

    fetchMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.meals}>
        <Card>
          <LoadingSpinner />
        </Card>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.meals}>
        <Card>
          <ErrorMessage message={error} />
        </Card>
      </section>
    );
  }

  const mealsList = meals.map(meal => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
