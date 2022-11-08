import { useRef, useState } from "react"

export default function Home() {
  const [feeedBackItems, setFeedbackItems] = useState([])

  const emailInputRef = useRef()
  const feebackInputRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    const enteredEmail = emailInputRef.current.value
    const enteredFeedback = feebackInputRef.current.value

    const reqBody = { email: enteredEmail, text: enteredFeedback }

    fetch("/api/feedback/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  function loadFeedbackHandler() {
    fetch("/api/feedback/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbackItems(data.feedback))
  }

  return (
    <div>
      {" "}
      <h1>Home Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea rows="5" id="feedback" ref={feebackInputRef} />
        </div>
        <button>Submit</button>
      </form>
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      {feeedBackItems.length > 0 && (
        <ul>
          {feeedBackItems.map((item) => {
            return <li>{item.text}</li>
          })}
        </ul>
      )}
    </div>
  )
}
