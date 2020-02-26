import React from 'react';
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect';

import {cleanup, render} from '@testing-library/react'
import Alert from "./Alert";

afterEach(cleanup);

test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Alert/>, div);
    ReactDOM.unmountComponentAtNode(div)
});


test('renders error message correctly', () => {
    const {getByTestId} = render(<Alert message={"Error message"}/>);
    const alertTypography = getByTestId("alert-text");
    expect(alertTypography).toHaveTextContent("Error message");
});
