import 'dotenv/config'

/**
 * Sending a POST-request to the AI in the app, generating a quiz
 * based on the notes on the page when the user presses the "Quiz!"-button in the UI.
 * 
 */
export const aiService = {
  generateQuiz: async (noteBody) => {
  try {
    console.log('Sending prompt to AI-service')
    const response = await fetch(process.env.API_URL, {
      method: 'POST',
      headers: {
        'Authorization':  `Bearer ${process.env.APIKEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      // The model that is asked to generate the quiz
        "model": "llama-3.1-8b-instant",
        "messages": [{
      // First adress the models system and instruct it
        "role": "system",
        "content": "Du är en quiz-generator som svarar med JSON. Returnera en array av objekt som heter 'tasks'. Varje objekt i arrayen ska ha question, falseAnswer, trueAnswer. Håll språket formellt och pedagogiskt"
        },
      // Then adress as a user that gives the text from users notes, which is the base of the quiz 
      {
        "role": "user",
        "content": `Skapa frågor baserat på denna text:, ${noteBody}`
        }],
      "response_format": { "type": "json_object" },
      "temperature": 0.5 
    })
  })

  // Gets and reformats the answer so it can be unpacked and sent to the UI.
  const rawData = await response.json()

  const content = rawData.choices[0].message.content
  const quizData = JSON.parse(content)

  // Gets the question, true and false answer from each object.
  const formattedQuiz = quizData.tasks.map(item => {
    return {
      question: item.question,
      true: item.trueAnswer,
      false: item.falseAnswer
    }
  })

  console.log('Quiz successfully generated and formatted!')
  return formattedQuiz
  } catch (error) {
    console.error("Error in contacting the ai-service", error)
    throw error
  }
  }
}
