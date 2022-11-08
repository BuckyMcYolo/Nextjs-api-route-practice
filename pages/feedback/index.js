import { extractFeedback, buildFeedbackPath } from "../api/feedback/feedback"
import { useState } from "react"
const FeedBackPage = (props) => {
  const [feedbackData, setFeedbackData] = useState()

  function loadFeedbackHandler(id) {
    fetch(`/api/feedback/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedbackData(data.feedback)
      })
  }
  return (
    <div>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}></button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FeedBackPage

export async function getStaticProps() {
  const filePath = buildFeedbackPath()
  const data = extractFeedback(buildFeedbackPath())
  return {
    props: {
      feedbackItems: data,
    },
    revalidate: 1,
  }
}
