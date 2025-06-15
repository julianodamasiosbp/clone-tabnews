import database from "infra/database.js";
import { ValidationError } from "infra/errors.js";

async function create(userInputValues) {
  await validateUniqueUsernameAndEmail(
    userInputValues.username,
    userInputValues.email,
  );
  // await validateUniqueEmail(userInputValues.email);
  // await validateUniqueUsername(userInputValues.username);
  const newUser = await runInsertQuery(userInputValues);

  return newUser;

  async function validateUniqueUsernameAndEmail(username, email) {
    const results = await database.query({
      text: "SELECT * FROM users WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($2)",
      values: [username, email],
    });

    if (results.rowCount > 0) {
      throw new ValidationError({
        message: "Usuário ou email informado já está sendo utilizado.",
        action: "Utilize outro usuário ou email para realizar o cadastro.",
      });
    }
  }

  // async function validateUniqueEmail(email) {
  //   const results = await database.query({
  //     text: "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
  //     values: [email],
  //   });

  //   if (results.rowCount > 0) {
  //     throw new ValidationError({
  //       message: "O email informado já está sendo utilizado.",
  //       action: "Utilize outro email para realizar o cadastro.",
  //     });
  //   }
  // }

  // async function validateUniqueUsername(username) {
  //   const results = await database.query({
  //     text: "SELECT * FROM users WHERE LOWER(username) = LOWER($1)",
  //     values: [username],
  //   });

  //   if (results.rowCount > 0) {
  //     throw new ValidationError({
  //       message: "O usuário informado já está sendo utilizado.",
  //       action: "Utilize outro usuário para realizar o cadastro.",
  //     });
  //   }
  // }

  async function runInsertQuery(userInputValues) {
    const results = await database.query({
      text: "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      values: [
        userInputValues.username,
        userInputValues.email,
        userInputValues.password,
      ],
    });

    return results.rows[0];
  }
}

const user = {
  create,
};

export default user;
