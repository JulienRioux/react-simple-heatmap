# react-simple-heatmap

> A simple React component to create responsive heatmap.

[![NPM](https://img.shields.io/npm/v/react-simple-heatmap.svg)](https://www.npmjs.com/package/react-simple-heatmap) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install react-simple-heatmap
yarn add react-simple-heatmap
```

## Usage

```jsx
import React, { Component } from "react"

import Heatmap from "react-simple-heatmap"

export default class App extends Component {

  render() {

    return (
			<div
				style={{ height: "500px", width: "500px" }}>
				<Heatmap
					showLabels={ true }  // boolean
					color={ "rgb(255, 17, 17)" }  // rgb color
					data={ data }  // matrix (array of array of number)
					onClick={ (data) => console.log(data) }  // function
				/>
			</div>
    );
  }
}
```

## License

MIT © [JulienRioux](https://github.com/JulienRioux)
