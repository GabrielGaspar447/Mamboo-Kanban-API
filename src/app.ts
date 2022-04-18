import 'dotenv/config'
import express, { Express } from 'express'
import 'express-async-errors' // This is a lib that will automatically catch all async errors and send them to the error handler
import swaggerUi from 'swagger-ui-express'
import swaggerDocumentPt from './swagger_pt.json'
import swaggerDocumentEn from './swagger_en.json'
import { errorHandler } from './middlewares'
import { routersFactory } from './Factory'

const app: Express = express() // Initialize express app

app.use(express.json()) // Parse all JSON in incoming requests so they can be used as JS objects

app.get('/healthcheck', (_req, res) => res.status(200).send('API HEALTHY')) // API Healthcheck endpoint

app.use('/tasks', routersFactory.createTasksRouter()) // Mount the tasks router

const swaggerUiOptions = { customSiteTitle: 'Mamboo Kanban API Docs' }
app.use('/docs/pt', swaggerUi.serve, swaggerUi.setup(swaggerDocumentPt, swaggerUiOptions)) // Apply swagger to route /docs/pt for interactive documentation.
app.use('/docs/en', swaggerUi.serve, swaggerUi.setup(swaggerDocumentEn, swaggerUiOptions)) // Apply swagger to route /docs/en for interactive documentation.

app.get('/', (_req, res) => res.redirect('/docs')) // Redirect from "/" to "/tasks"

app.use(errorHandler) // Receive errors when next(error) is called

export { app } // Export the app so it can be used in tests and the in the server.ts file
