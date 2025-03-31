const readline = require('readline')
const { TopicMessageSubmitTransaction } = require('@hashgraph/sdk')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/**
 * Prompts the user for input and returns their response
 * @param {string} question - The question to ask the user
 * @returns {Promise<string>} The user's response
 */
const getUserInput = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer)
        })
    })
}

/**
 * Submits a message to a Hedera topic
 * @param {Object} client - The Hedera client instance
 * @param {string} topicId - The ID of the topic to submit to
 * @param {string} message - The message to submit
 * @returns {Promise<void>}
 */
const submitMessage = async (client, topicId, message) => {
    const submitMessageTx = new TopicMessageSubmitTransaction()
        .setTopicId(topicId)
        .setMessage(message)

    const executeSubmitMessageTx = await submitMessageTx.execute(client)
    const submitMessageReceipt = await executeSubmitMessageTx.getReceipt(client)
    console.log(`Message "${message}" submitted successfully to topic`)
    console.log(`Transaction status: ${submitMessageReceipt.status}`)
}

/**
 * Closes the readline interface
 */
const closeReadline = () => {
    rl.close()
}

module.exports = {
    getUserInput,
    submitMessage,
    closeReadline
} 