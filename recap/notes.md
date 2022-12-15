https://blog.logrocket.com/how-to-use-react-hooks-firebase-firestore/
--> Show how to update page without reloading

# Deploy to GitHub Page
npm run deploy

## Problem with Goal and Review
--> books haven't finished retrieving from firebase, but the code attempt to filter books right away
which result in calling functions on "undefined" var.

# Lesson:

- Use try/catch to deal with situations when DB has not finished updating, and we try to parse it.
- setState is async, which might not update state on time for us to use.
- Use a global variable (single source of truth), and pass it into chidren components, that way React can update all relevant components when needed.

App.js
  Main.js
    
    Home.js
      SearchBar.js (currently not implemented)
      Header.js
      Goal.js
        Bar.js (progress bar)
      Review.js
        const: ReviewQuote
      Database
        const: Cards
        
    Editor.js
      Navbar.js
      Info.js
        TagBar.js
      Content.js
        TextEditor.js (currently not implemented)
      Emoji.js