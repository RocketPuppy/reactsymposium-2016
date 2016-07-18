import { todoReducer, deleteTodo, DELETE_TODO } from '../src';
import { assert } from 'chai';
import jsv from 'jsverify';
import deepEqual from 'deep-equal';

const todoGenerator = jsv.record({
  text: jsv.asciinestring
});

const initialStateGenerator = jsv.array(todoGenerator);

const initialStateWithTodo = jsv.pair(
  todoGenerator,
  initialStateGenerator
).smap(
  ([todo, initialState]) => [todo, initialState.concat(todo)],
  ([todo, initialState]) => [todo, initialState.slice(0, -1)]
);

const initialStateWithoutTodo = jsv.pair(
  todoGenerator,
  initialStateGenerator
).smap(
  ([todo, initialState]) => [todo, initialState.filter((t) => t.text === todo.text)],
  ([todo, initialState]) => [todo, initialState.concat(todo)]
);

describe('when deleting a todo that exists', () => {
  jsv.property('it removes the todo', initialStateWithTodo,
    ([todo, initialState]) => {
      const newState = todoReducer(initialState, deleteTodo(todo.text));

      return !newState.includes(todo);
    }
  );

  it('it only removes a single todo', () => {
    jsv.assert(jsv.forall(initialStateWithTodo,
      ([todo, initialState]) => {
        const newState = todoReducer(initialState, deleteTodo(todo.text));

        return newState.length === initialState.length - 1;
      }
    ), { tests: 1000 })}
  );
});

describe('when deleting a todo that does not exist', () => {
  jsv.property('it does not modify the state', initialStateWithoutTodo,
    ([todo, initialState]) => {
      const newState = todoReducer(initialState, deleteTodo(todo.text));

      return deepEqual(initialState, newState);
    }
  );
});
