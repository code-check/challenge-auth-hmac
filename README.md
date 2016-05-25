## HMAC - Hash-based Message Authentication Code
The goal of this challenge is make a [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) API which connects to a SQLite database .

## Challenge Description

The database only contains one table called `challenges`, which consists of following columns.
 - Id (int, auto increment)
 - Name (string)
 - Description (string)
 - Date (timestamp)

Endpoint to implement [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) api is `/api/challenges/:itemId`.
 - **GET:** Get challenge with Id: itemId
 - **PUT:** Updates a challenge with Id: itemId
 - **POST:** Creates a new challenge and returns its Id
 - **DELETE:** Deletes challenge with Id: itemId
 
*To protect against any unauthorized access, all endpoints will be protected with `HMAC authorization` with secret key as `challenge-database-api`.*

### HMAC - Hash-based Message Authentication Code
- [HMAC](https://en.wikipedia.org/wiki/Hash-based_message_authentication_code)
- [HMAC (rfc2104)](https://tools.ietf.org/html/rfc2104)
- The hash that should be used for the HMAC authentication is SHA256.
- In the case of an invalid HMAC digests return `401`(Unauthorized returned).
- If it's a valid HMAC digest perform the operation and return `200`.
- The *HMAC message* should be the *endpoint combined with the HTTP verb (GET/POST/PUT/DELETE) seperated by a semicolon(;)*.
 - `/api/challenges/;GET`
 - `/api/challenges/;PUT`
 - `/api/challenges/;POST`
 - `/api/challenges/;DELETE`

### Specifications
- You can refer [config.json](spec/config.json) for configuration used in [tests](spec/challenge.spec.js).
- The database used should be SQLite, the file should be [database.db](./sql/database.db).
- Any data in the body, either request or response, should be `JSON`.

### Test Results *before* solving the challenge  
```
codecheck: Finish with code 10
codecheck: tests  : 81
codecheck: success: 71
codecheck: failure: 10
```

### Test Results *after* solving the challenge
```
codecheck: Finish with code 0
codecheck: tests  : 81
codecheck: success: 81
codecheck: failure: 0
```
--- --- ---
## Run Tests
To run tests locally install `codecheck` by running the following command in terminal.
```
$ npm install codecheck -g
```
To run tests in web editor please click in `RUN` button on left side of web editor.

## Explain your code
In [answer.md](answer.md) write a brief explanation 
- About how your code works
- Problems faced while solving the challenge
- How you solved those problems
- Improvements/Feedbacks are also welcomed

## Extra
- In [answer.md](./answer.md) explain how you could improve the current authorization to make it more secure (assuming the key is shared in a secure manner, disregarding its length).
- If you suggest an alternative method (non HMAC), please also answer the above question.
