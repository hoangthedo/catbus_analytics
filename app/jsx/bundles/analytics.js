import TabListComponent from '../components/TabListComponent'
import React from 'react'
import ReactDOM from 'react-dom'


document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <TabListComponent/>,
        document.getElementById('analytics_body')
    )
});