import "./styles.css";

import React, { useState, useEffect } from "react";

const App = () => {
  const [messagesState, setMessagesState] = useState([]);
  const [responsesState, setResponsesState] = useState(0);

  const messagesInitial = [
    {
      author: "loading",
      body: "...",
      timeout: 0
    },
    {
      author: "bot",
      body: "Hey there!",
      timeout: 800
    },
    {
      author: "bot",
      body: "Follow the white rabbit...",
      timeout: 1500
    },
    {
      author: "bot",
      body: "Ach i'm kidding, it's me, your self-made chatbot",
      timeout: 3000
    }
  ];

  const responses = [
    "This should come from the api response and be stored here",
    "No really, its a gimic, quickly made in my Codepen",
    [
      "Ok here is a joke...",
      "When Alexander Graham Bell invented the telephone he had three missed calls from Chuck Norris"
    ],
    [
      "Want another? Ok last one...",
      "Chuck Norris can win a game of Connect 4 with 3 moves"
    ],
    "I'm out, good bye."
  ];
  const addMessage = (item) => {
    console.log(item);
    setMessagesState((prevMessages) => [...prevMessages, item]);
  };

  const Message = ({ data }) => {
    const { author, body } = data;

    const finalBody = <div className="c-chat__message">{body}</div>;

    return (
      <li className={`c-chat__item c-chat__item--${author}`}>{finalBody}</li>
    );
  };
  function demo() {
    messagesInitial.forEach((item) => {
      setTimeout(() => {
        console.log("Adding message: ", item.body);
        addMessage(item);
      }, item.timeout);
    });

    setTimeout(() => {
      console.log("Removing first message");
      setMessagesState((prevMessages) => prevMessages.slice(1));
    }, 700);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.querySelector("input").value;
    addMessage({ author: "human", body: message });
    mockReply();
    e.target.reset();
  };

  const mockReply = () => {
    const response = responses[responsesState];

    if (response) {
      setResponsesState((prevResponses) => prevResponses + 1);

      const processResponse = (message, delay) =>
        setTimeout(() => addMessage({ author: "bot", body: message }), delay);

      if (Array.isArray(response)) {
        response.forEach((item, index) => {
          processResponse(item, 600 + 500 * index);
        });
      } else {
        processResponse(response, 600);
      }
    }
  };

  useEffect(() => {
    demo();
  }, []);

  return (
    <div className="b-chat">
      <div className="b-chat__container">
        <div
          className={`c-chat ${
            messagesState.length > 2 ? "c-chat--ready" : ""
          }`}
        >
          <ul className="c-chat__list">
            {messagesState.map((message, index) => (
              <Message key={index} data={message} />
            ))}
          </ul>
          <form className="c-chat__form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="input"
              placeholder="Type your message here..."
              autoFocus
              autoComplete="off"
              required
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
