# Word Frequency

- Counts the frequency of words obtained from this link - [http://terriblytinytales.com/test.txt](http://terriblytinytales.com/test.txt)
- The options on the left allows you to specify the sorting algorithm to sort the higher count words. This is due to mozilla using mergesort on arrays and Chrome v8 using insertionsort or quicksort for small arrays and mergesort for larger ones.
- Here unchecking the option to implement quicksort will actually kinda sorts within the same range of time because of the amount of data.
- You need to specify the top number of result that you need back from the sorted words.

# Modules

Backend:
> Express, Request, Body Parser

Frontend:
> Angularjs [modules: $http, $timeout, $log]

UI:
> Angularjs Material [modules: $mdToast, $mdSideNav]

Testing:
> Mocha, Chai, Chai-Http

_Seperate README.md is present inside test/ folder for showcasing test results_

# Running
`npm install && npm start`
