# MyReads React Project

Project 6 - Submission for Front End Nanodegree. This project is developed using React

## Features Implemented
```bash
    1. Move single book into 'Currently Reading', 'Want to Read' or 'Read' shelf

    2. Search and add new books to shelves.

    3. Move multiple selected books with single click. Supported only in main page.

    4. Rate books - User can click to assign rating to book
       
    
```

## Functionalities
    MyReads App
![MyReads App](/doc-assets/images/MyReadsApp.png)

## Move single book
    Click on drop down control and select the shelf to move the book
![MyReads App](/doc-assets/images/MoveToShelf.png)

## Search and add new books to shelves
    Click on plus icon on bottom right of screen and start typing keyword to search for
    Now click on drop down control and select the shelf to assign one.
![MyReads App](/doc-assets/images/SearchAndAdd.png)

## Move multiple selected books
    Select books by clicking and system will highlight the selection with colored border
    Once selection is complete, click on arrow down icon on bottom right of screen and
    select the shelf to move the books
    ** Available only on main page

![MyReads App](/doc-assets/images/MoveMultipleSelected.png)

## Book rating
    Click on star to rate the book
     TODO: Server side update is not implemented and out of scope.
        window.localStorage along with book id can be used to serializing/deserializing ratings
    * Functionality working can be confirmed with console.log messages logged inside changeBookRating (App.js)
    ** Available only on main page

![MyReads App](/doc-assets/images/RateBooks.png)

## How to run the project?

1. Clone the git repository inside local folder

    git clone https://github.com/sachin-udacity/react-myreads.git

2. With active directory as 'react-myreads', run following command to install the dependencies

    npm install

3. Finally execute 'npm start' to launch the site.

    npm start

4. Site will be hosted at http://localhost:3000/ (check command window to confirm the url)

