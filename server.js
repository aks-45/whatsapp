import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import axios from 'axios'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Serve static files from dist folder
app.use(express.static(path.join(__dirname, 'dist')))

async function sendMessage(message, phoneNumber) {
    try {
        const response = await axios({
            url: 'https://graph.facebook.com/v22.0/946399428557747/messages',
            method: 'post',
            headers: {
                'Authorization': 'Bearer EAAWsrWBHhYEBQdsgmSmN9hfJeyLiNsdiBu3ZCSvGylCKmqlo9fdLefGBE04vw28ZCxMlodY8p9mc5ToEM1QHIq6CFTW6ximWdw5ulqIy8rW2oCeW3M1RJHfkJyOYVwZCLcPVSYwTibYnS8kpBNbEpszfgAFZBXCIeBU8bxZBHwLqcd80lspd3ZBZAvQ1YZCDqAZDZD',
                'Content-Type': 'application/json'
            },
            data: {
                messaging_product: 'whatsapp',
                to: phoneNumber,
                type: 'text',
                text: {
                    body: message
                }
            }
        })
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, error: error.response?.data || error.message }
    }
}

app.post('/api/send-whatsapp', async (req, res) => {
    const { message, phoneNumbers } = req.body
    
    if (!message || !phoneNumbers || !Array.isArray(phoneNumbers)) {
        return res.status(400).json({ error: 'Message and phoneNumbers array are required' })
    }
    
    const results = []
    
    for (const phoneNumber of phoneNumbers) {
        const result = await sendMessage(message, phoneNumber)
        results.push({ phoneNumber, ...result })
    }
    
    res.json({ results })
})

// Serve React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})