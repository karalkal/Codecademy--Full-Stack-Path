import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import ROUTES from "../app/routes";
import { selectTopics } from '../features/topics/topicsSlice';
import { thunkActionCreator } from "../features/quizzes/quizzesSlice";
import { addCard } from "../features/cards/cardsSlice";


export default function NewQuizForm() {
  const dispatch = useDispatch()

  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");

  const navigate = useNavigate();

  const topics = useSelector(selectTopics);

  const handleSubmit = (e) => {
    e.preventDefault();
    // No blank quizz entries allowed and topic must be selecetd
    if (name.length === 0) {
      alert("A quizz must have a title.")
      return;
    }
    // No topics created at all
    if (Object.keys(topics).length === 0) {
      alert("Quizz must be associated with a topic but no topics have been created yet.");
      return;
    }
    // No topicID or topicID not in predefined IDs
    const allTopicIds = (Object.values(topics)).map(t => t.id)
    if (topicId === "" || !allTopicIds.includes(topicId)) {
      alert("No valid topic selected.");
      return;
    } const cardIds = [];

    // create the new cards here and add each card's id to cardIds
    // iterate through the cards in that form’s local state 
    cards.forEach(element => {
      // 1. create unique id for each card
      const cardId = uuidv4()
      // 2. for each card dispatch addCard 
      dispatch(addCard({
        id: cardId,
        front: element.front,
        back: element.back,
      }));
      // 3. add each card's id to cardIds
      cardIds.push(cardId);
    });


    console.log(cards, cardIds)

    // create the new quiz
    dispatch(
      thunkActionCreator({
        id: uuidv4(),
        name,
        topicId,
        cardIds,
      })
    );
    setName("");
    navigate(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  }

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section>
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Quiz Title"
        />
        <select
          id="quiz-topic"
          onChange={(e) => setTopicId(e.currentTarget.value)}
          placeholder="Topic"
        >
          <option value="">Topic</option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              placeholder="Back"
            />

            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button onClick={addCardInputs}>Add a Card</button>
          <button>Create Quiz</button>
        </div>
      </form>
    </section>
  );
}
