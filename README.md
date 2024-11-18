# ECO-HHB Project Structure

This document outlines the structure of the project and provides an overview of the different directories and files.

## Directory Structure

The project follows a standard directory structure, as shown below:

```
├── public
│   ├── icons
│   └── images
├── src
│   ├── apis
│   ├── app
│   ├── components
│   ├── configs
│   ├── models
│   ├── styles
│   └── utils
├── package.json
├── .gitignore
└── ...
```

## Description

- `src`: This directory contains all the source code for the project.
    - `apis`: contains fetch api resources.
    - `app`: only contains pages of application (use app routes)
    - `components`: contains reusable components used throughout the application.
    - `configs`: contains additional configs for web app.
    - `models`: contains the entity model which mapping with back-end response data.
    - `styles`: contains reusable styles (use css, scss) used throughout the application.
    - `utils`: contains utility functions and helper files.

- `public`: This directory contains static assets and the HTML file for the application.
    - `icons`: contains custom icons of designer in case heroicons framework was not support.
    - `images`: contains images asset of the application.

## Usage

To start the project, follow these steps:

1. Clone the repository.
2. Install the dependencies by running `npm install`.
2. Build optimized production by running `npm run build`.
3. Start the application by running `npm start`.

## Conclusion

This document provides an overview of the project structure and how to get started with the project. For more detailed information, please refer to the individual files and directories.
