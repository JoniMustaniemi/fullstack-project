# fullstack-project
A fullstack project with React, Typescript, Node and PostgreSQL.

## Table of Contents

- [Prerequisites](#prerequisite)
- [Installation](#installation)
- [Usage](#usage)

## Prerequisites
This project expects you to have a postgres database set up as follows:
```bash
a database with table called 'locations' with title and description fields:

| Column      | Type                   | Collation | Nullable | Default                                    |
|-------------|------------------------|-----------|----------|--------------------------------------------|
| `id`        | integer                |           | not null | nextval('location_id_seq'::regclass)       |
| `title`     | character varying(100) |           | not null |                                            |
| `description`| text                  |           | yes      |                                            |


```
### Here is a SQL statement to create such a table:
```sql
CREATE SEQUENCE location_id_seq;

CREATE TABLE locations (
    id integer NOT NULL DEFAULT nextval('location_id_seq'::regclass),
    title character varying(100) NOT NULL,
    description text,
    CONSTRAINT location_pkey PRIMARY KEY (id)
);
```
### Database configuration
Before running the application, you need to update the database-specific information. This is done in the dbConfig.js file located in the Database folder.
Create and open the dbConfig.js file and update it with your database information:
```bash
module.exports = {
  user: "username",
  host: "host",
  database: "databasename",
  password: "password",
  port: 1234,
};
```
## Installation

Step-by-step instructions on how to get the development environment set up.

```bash
# Clone the repository
git clone https://github.com/JoniMustaniemi/fullstack-project.git

# Navigate to the project directory
cd fullstack-project

# Install dependencies
npm install
```
## Usage
Start the frontend.
```bash
npm run frontend
```
Start the backend.

```bash
npm run backend
```

and then navigate to http://localhost:5173/ with the chosen browser.
