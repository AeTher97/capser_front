import React from 'react';
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect';
import {Map} from 'immutable';
import {cleanup, render} from '@testing-library/react'
import IntentListComponentView from "./IntentListComponentView";

afterEach(cleanup);

test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<IntentListComponentView/>, div);
    ReactDOM.unmountComponentAtNode(div)
});

test('renders error message correctly', () => {
    const {getByTestId} = render(<IntentListComponentView error={{message: "Error message"}}/>);
    const errorAlert = getByTestId("alert-text");
    expect(errorAlert).toHaveTextContent("Error message");
});

test('renders loading circle', () => {
    const {getByTestId} = render(<IntentListComponentView isLoading={true}/>);
    const loadingAnimation = getByTestId("loading-circle");
    expect(loadingAnimation).toBeTruthy()
});


test('renders all intents', () => {

    const intents = {
        '1': {
            name: '1',
        },
        '2': {
            name: '2',
        },
        '3': {
            name: '3',
        }
    };

    const intentMap = new Map(intents);


    const {getAllByTestId} = render(<IntentListComponentView intents={intentMap}/>);
    const intentList = getAllByTestId("intent-list-item");
    expect(intentList.length).toEqual(3)
});