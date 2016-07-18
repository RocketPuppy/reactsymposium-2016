import { todoReducer, deleteTodo } from '../src';
import { assert } from 'chai';

describe('when the todo exists alone', () => {
  const theTodo = { text: 'foo' };
  const state = [theTodo];

  it('removes the todo', () => {
    const newState = todoReducer(state, deleteTodo('foo'));

    assert(!newState.includes(theTodo), 'newState includes todo');
  });
});

describe('when there are no todos', () => {
  const state = [];

  it('returns the state unchanged', () => {
    assert.deepEqual(todoReducer(state, deleteTodo('foo')), state)
  });
});

describe('when the todo exists with other todos', () => {
  const firstTodo = { text: 'foo' };
  const secondTodo = { text: 'bar' };
  const state = [firstTodo, secondTodo];

  it('removes the target todo', () => {
    const newState = todoReducer(state, deleteTodo('foo'));

    assert(!newState.includes(firstTodo));
  });

  it('leaves the other todos', () => {
    const newState = todoReducer(state, deleteTodo('foo'));

    assert(newState.includes(secondTodo));
  });
});
