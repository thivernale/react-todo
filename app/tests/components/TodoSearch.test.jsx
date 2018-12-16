var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var TodoSearch = require('TodoSearch');

describe('TodoSearch', () => {
    it('should exist', () => {
        expect(TodoSearch).toExist();
    });

    // for presentational components we want to test their interaction with their parent component
    it('should call onSearch with entered input text', () => {
        // 1. create the spy (a function that is passed to the component as a property)
        var spy = expect.createSpy();
        // 2. render the component
        var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />);
        // set the text field value
        var searchText = 'ttt';
        // the DOM element of the text field
        todoSearch.refs.searchText.value = searchText;
        // simulate field value change event:
        // at this point the spy function should have been called
        TestUtils.Simulate.change(todoSearch.refs.searchText);
        // 3. verify that user interaction works properly 
        // (that when text gets changed, the prop gets called)
        expect(spy).toHaveBeenCalledWith(false, searchText);
    });

    it('should call onSearch with proper checked value', () => {
        var spy = expect.createSpy();
        var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />);

        todoSearch.refs.showCompleted.checked = true;
        TestUtils.Simulate.change(todoSearch.refs.showCompleted);

        expect(spy).toHaveBeenCalledWith(true, '');
    });
});