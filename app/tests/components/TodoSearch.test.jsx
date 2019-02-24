var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

import { TodoSearch } from 'TodoSearch';

describe('TodoSearch', () => {
    it('should exist', () => {
        expect(TodoSearch).toExist();
    });

    // for presentational components we want to test their interaction with their parent component
    it('should dispatch SET_SEARCH_TEXT on input changed', () => {
        var searchText = 'ttt';
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText
        };
        // 1. create the spy (a function that is passed to the component as a property)
        var spy = expect.createSpy();
        // 2. render the component
        var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />);
        // set the text field value
        // the DOM element of the text field
        todoSearch.refs.searchText.value = searchText;
        // simulate field value change event:
        // at this point the spy function should have been called
        TestUtils.Simulate.change(todoSearch.refs.searchText);
        // 3. verify that user interaction works properly 
        // (that when text gets changed, the prop gets called)
        expect(spy).toHaveBeenCalledWith(action);
    });

    it('should dispatch TOGGLE_SHOW_COMPLETED when checkbox checked', () => {
        var action = {
            type: 'TOGGLE_SHOW_COMPLETED'
        };
        var spy = expect.createSpy();
        var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />);

        todoSearch.refs.showCompleted.checked = true;
        TestUtils.Simulate.change(todoSearch.refs.showCompleted);

        expect(spy).toHaveBeenCalledWith(action);
    });
});