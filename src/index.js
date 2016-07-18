import 'babel-polyfill'
export const DELETE_TODO = 'DELETE_TODO';

export function deleteTodo(text) {
  return {
    type: DELETE_TODO,
    text: text
  };
}

const initialState = [];

export function todoReducer(todos = initialState, action) {
  switch(action.type) {
  case(DELETE_TODO):
    return todos.filter((todo) => todo.text !== action.text);
  }
}
