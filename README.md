

### Welcome aboard ! ###
Orizon is an informative website for kids and teenagers aged between 10 and 17 years old, about the upcoming space race. Starting with the Moon, you can browse through all the missions already scheduled. 

Spoutnik, our cat mascot, will be your fellow traveler for this space journey. He will guide you through the website, from missions to quizzes, stopping by the news section and your profile.

This is a school project and a team effort. An online version will soon be avalaible when we have fixed a few things (a better responsive design, stronger authentication features, possibility to add your own quiz, unit tests, etc). In the mean time, the project is fully functional. You can either watch the demonstration [here](https://www.youtube.com/watch?v=yRnSeJcDcPs&feature=youtu.be&t=5041) and/or you can access the website here: https://o-rizon.herokuapp.com/#/ 

If you want to run the code locally: 

- Cloning the repository
- Creating a local database with your favorite database management system (we used PostgreSQL) thanks to the two files
  ` api/import_table.sql` and `api/import_data.sql`
- Creating a .env file following the `api/.env.example` 
- Running yarn install both in the api and the client folders to install dependencies
- Running `node index.js` in the `api` folder
- Running `yarn start` in the client folder

```/!\ You will need a Node.js working environment and a database management system /!\```
  
#### And voilà ! ####

---

## Development workflow

This repository (`orizon-prod`) is the **production deployment target**. It contains the Express backend and a pre-built `dist/` folder served as the frontend. You never edit frontend code here directly.

All frontend development happens in the companion repository [`orizon`](https://github.com/livprojects/orizon), which holds the React source under `client/` and the API source under `api/`.

### Making changes

**Step 1 — Edit the source in `orizon`**

```bash
cd orizon
```

- Backend changes go in `api/` — mirror them manually in `orizon-prod/` once ready.
- Frontend changes go in `client/src/`.

Run the dev server locally to test:

```bash
# Terminal 1 — API (port 5001)
cd orizon/api
npm run dev

# Terminal 2 — Frontend (port 8080)
cd orizon/client
npm start
```

Make sure `orizon/api/.env` has `FRONTEND_URL=http://localhost:8080` and `PORT=5001`.

**Step 2 — Build the frontend**

Once your changes are ready:

```bash
cd orizon/client
npm run build
```

This generates a fresh `dist/` folder inside `orizon/client/`.

**Step 3 — Copy the build to `orizon-prod`**

```bash
cp -r orizon/client/dist/* orizon-prod/dist/
```

Or from inside `orizon/client/`:

```bash
cp -r dist/* ../../orizon-prod/dist/
```

**Step 4 — Commit and deploy**

```bash
cd orizon-prod
git add dist/ app/ index.js  # include any backend changes too
git commit -m "your message"
git push heroku main          # deploys to https://o-rizon.herokuapp.com
git push origin main          # keeps GitHub in sync
```

### Heroku config vars

Set these once in the Heroku dashboard (Settings → Config Vars) or via CLI:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Set automatically by Heroku Postgres |
| `SESSION_SECRET` | A long random string |
| `FRONTEND_URL` | `https://o-rizon.herokuapp.com` |
| `NODE_ENV` | `production` |

### Populating the database

If the Heroku database is empty (e.g. after reprovisioning):

```bash
heroku pg:psql --app o-rizon -f db/import_table.sql
heroku pg:psql --app o-rizon -f db/import_data.sql
```

---

__Tech stack__
- HTML/CSS
- React/Redux
- Three.js
- Node.js
- Express.js
- PostgreSQL
- Sequelize

__Team__
- Liv Audigane (product owner, full stack developer)
- Narciso Beaujard (artistic director, front-end developer)
- Simon Jacquemin (back-end lead developer, full stack developer)
- Gwendolyne Stelmaszyk (front-end lead developer)
- Quentin Savigny (front-end developer)

