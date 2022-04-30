import {useState, useEffect} from "react";

import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "../Meals/MealItem/MealItem"




const AvailableMeals = props => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

    const getMeals = async () =>{

        const response = await fetch("https://react-http-c7348-default-rtdb.firebaseio.com/meals.json")

        if (!response.ok){
          throw new Error("Something went wrong");
        }

        console.log(response)
        const data = await response.json();

        const mealInfo = [];


        for (const key in data){
          mealInfo.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(mealInfo)
        setIsLoading(false);

    }

    useEffect(()=>{
    
      getMeals().catch((error)=>{
        setIsLoading(false);
        setHttpError(error.message);
      });
      
    }, []);

    if(isLoading){
      return(
        <section className = {styles.MealsLoading}>
          <p>Loading...</p>
        </section>
      )
    }

    if(httpError){
      return(
        <section className = {styles.MealsError}>
          <p>http error</p>
        </section>
      )
    }

    const mealsList = meals.map(meal => {
       return  <MealItem 
       key={meal.id}
       id={meal.id}
       name={meal.name}
       description = {meal.description}
       price = {meal.price}
       >{meal.name}</MealItem>
    });
    
    return(
        <section className={styles.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals;