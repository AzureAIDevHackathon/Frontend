![An autonomous team of specialized AI agents](https://github.com/user-attachments/assets/9d09cc0c-19b9-4fd9-8fd7-17acf97f798f)

# Check out our DevPost:

https://devpost.com/software/buck-it-gasvbn

## Inspiration

Traditional Financial apps often lack personalization to the user’s behavior. We were inspired to build a practical solution leveraging semantic kernel and Azure AI Agents to help users make impactful yet incremental improvements in their spending and saving habits. 

## What it does and Features

We’ve built an intelligent financial ecosystem that can host multiple AI agents at scale to provide personalized financial budgeting and guidance. Our AI agents are orchestrated by an upper management level, AI manager, that also has full access to the database controllers.

Some features include:

1. Savings buckets to personalize and manage your financial goals
2. An AI manager utilizing semantic kernel to make function choice behaviors/actions
3. 2 legged OAuth 2.0 for user verification and security (PKCE)
4. A financial summary and transaction history to track your finances
5. A sleek and modern UI with light/dark mode and the ability to adapt to various screen sizes
6. Ability to easily scale with new functions and AI Agents for the AI manager to consume

## How we built it

#### Frontend: 

**Team:** Carl Feng, Yuyou Liu

**Tech Stack:** Next.js, JavaScript, TypeScript, Tailwind CSS, shadCN/UI

#### Backend:

**Team:** Brandon

**Tech Stack:** Python, FastAPI, SQL Alchemy, Azure AI, Semantic Kernel, Redis

Leveraged Copilot for debugging/refactoring/efficiency for redundant tasks

## Challenges we ran into

Frontend: 
We intended to utilize certain libraries, but libraries come with their own structure and dependencies, which we had to take some time to figure out. After we figured it out, production went smoothly.

Backend: Learning about proper docker setup to help expedite development, defining the SQL model for the app, creating a WebSocket and testing semantic kernel's ability to control the database.

## Accomplishments that we're proud of

#### Frontend: 

1. Being able to fully connect and utilize a fully structured API and Database made our project feel polished.
2. Forming new web dev techniques in relation to page interaction logic 

#### Backend:

1. Configured the Semantic Kernel expose database controllers to leverage function choice behavior.
2. Setting up an easy to spin up SQL server within docker so that teammates don't have to worry about setting up a SQL server
3. creating a proof of concept of chain prompting multiple ai agents that are consumed as functions by semantic kernel
4. Understanding and being able to setup up a full PKCE OAuth 2.0 flow

## What we learned

#### Frontend: 

In order to create the chat, we learned more about web sockets and their full-duplex nature. In terms of visuals, we learned about how to properly develop when taking light/dark mode into consideration. We also learned how to work with vector elements in order to create the logo for the project. We learned ways to reduce API calls while also maintaining real time updates to the page.

#### Backend: 

I learned about the power of docker and why it's important in a team environment. Learned how to implement a semantic kernel in python as well as construct a python backend for the first time. Understanding how to use SQL alchemy and alembic to manage database tables was extremely time efficient. Learned more about PKCE OAuth 2.0 workflow and how the frontend and backend work together to execute PKCE workflow.

## What's next for Buck.it

The beauty of a semantic kernel is that it is a dependency injection container. It is incredibly simple to strengthen the manager with additional kernel plugins/functions and AI Agents. We will be adding two ai agents in our next core MVP:

- sentiment analysis (understand the user's behavior and adapt)
- financial analysis (provide advisements for the manager to suggest improvements and strategies)

After the completion of the next core MVP, we will set our sights on deploying our app for mobile support. The alpha will be first released on Android then for IOS. We are looking forward to any users interested in signing up for the alpha test. If you are interested don't hesitate to sign up in the google forms under our project URL links
