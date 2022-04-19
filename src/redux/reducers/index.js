import { load } from "./loader";
import { role } from "./role";
import { login } from "./login";
import { tags } from "./tags";
import { users } from "./users";
const { combineReducers } = require("redux");

const reducers = combineReducers({
  loader: load,
  role: role,
  login: login,
  tags : tags,
  users : users
});
export default reducers;
