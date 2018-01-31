describe("About Higher Order Functions pt 2", function () {

  it("should use filter to select array elements that meet a criteria", function () {
    // return a filer people over 40
    var people = [{name: "name", age: 41}, {name: "name", age: 22},{name: "name", age: 47},{name: "name", age: 35}];
    var peopleOverFourty = people.filter(function (x) {
      if (x.age > 40){
        return x;
      }
    });

    expect(peopleOverFourty).toEqual([{name: "name", age: 41}, {name: "name", age: 47}]);
  });

  it("should use map to transform elements in an array into a new array", function () {
    // return a list of everyone's name
    var people = [{name: "name", age: 41}, {name: "name", age: 22},{name: "name", age: 47}];
    var names = people.map(function(x) {
      return x.age;
    });

    expect(names).toEqual([41, 22, 47]);
  });

  it("should use 'reduce' to combine elements in an array into a new value", function () {
    // sum these numbers
    var numbers = [1, 2, 3];
    var reduction = numbers.reduce(function(acc, n) {
      return acc += n;
    }, 0);

    expect(reduction).toBe(6);
  });

  it("should make the band", function() {
    var bandMembers = [{name: "Donnie", dancing: 3, performing: 5}, {name: "Paschan" ,dancing: 1, performing: 9},  {name: "Celeste", dancing: 3, performing: 4},
      {name: "DeAngelo", dancing: 7, performing: 7, otherObligations: 'soloAspirations'}, {name: "Leslie" ,dancing: 6, performing: 8, otherObligations: 'is a student'},
      {name: "Brian", dancing: 6, performing: 5, otherObligations: null}, {name: "Kristen" ,dancing: 7, performing: 4},  {name: "Bethany", dancing: 6, performing: 5},
      {name: "Aundrea", dancing: 8, performing: 5}, {name: "Aubrey", dancing: 8, performing: 6, otherObligations: ''},  {name: "Robert", dancing: 7, performing: 9} ];

    // filter out band members who have dancing skill 3 or less
    var afterRoundOne = bandMembers.filter(function(member){
      return member.dancing > 3;
    });

    console.log(afterRoundOne.length);
    expect(afterRoundOne.length).toEqual(8);

    // Remove band members who have otherObligations (only filter members who have the 'otherObligations' property AND have some value in that property, not an empty string)
    var afterRoundTwo = afterRoundOne.filter(function(x){
      var newArr = [];
      if (x.hasOwnProperty('otherObligations') === false || x.otherObligations === null || x.otherObligations === ""){
          return x;
      }
    });
    expect(afterRoundTwo.length).toEqual(6);
  });

  it("should make the band 2", function() {
    var bandMembers = [{name: "Brian", dancing: 6, performing: 5, otherObligations: null}, {name: "Kristen" ,dancing: 7, performing: 4},  {name: "Bethany", dancing: 6, performing: 5},
                       {name: "Aundrea", dancing: 8, performing: 5, otherObligations: "Something"}, {name: "Aubrey", dancing: 8, performing: 6, otherObligations: ''},  {name: "Robert", dancing: 7, performing: 9}];

    // Transform bandMembers into list containing the length of each band member's name
    var namesList = [];

    var nameLengths = bandMembers.map(function(x){
        namesList.push(x.name.length);
    });

    return namesList;

    expect(nameLengths.length).toEqual(6);
    expect(nameLengths).toEqual([5, 7, 7, 7, 6, 6]);

    // Transform bandMembers into a list of names and each members strength
    // for example "Brian: dancer" or "Aubrey: performer"
    var names = bandMembers.map(function(x){
      if (x.dancing > x.performing){
        return x.name + ": dancer";
      }
      else {
        return x.name + ": performer";
      }
    });
    console.log(names);
    expect(names).toEqual(["Brian: dancer", "Kristen: dancer", "Bethany: dancer", "Aundrea: dancer", "Aubrey: dancer", "Robert: performer"]);
    expect(names.length).toEqual(6);

    // Map over all of the band members and return a html string that contains each person's names, dancing skill, performing skill
    // The first element should be a string equal to this: "<div>Name: Donnie <br> Dancing: 3 <br> Performing: 5 </div>"
    var profiles = bandMembers.map(function(x){
      return $(`<div>Name: ${x.name} <br>Dancing: ${x.dancing} <br>Performing: ${x.performing} </div>`);
      console.log(x);
    });
    expect(profiles.length).toEqual(6);
    expect(profiles[0]).toEqual(`<div>Name: ${bandMembers[0].name} <br> Dancing: ${bandMembers[0].dancing} <br> Performing: ${bandMembers[0].performing}</div>`);
  });

  it("should make the band 3", function() {
    var bandMembers = [{name: "Brian", dancing: 6, performing: 5, otherObligations: null}, {name: "Kristen" ,dancing: 7, performing: 4},  {name: "Bethany", dancing: 6, performing: 5},
                       {name: "Aundrea", dancing: 8, performing: 5, otherObligations: "Something"}, {name: "Aubrey", dancing: 8, performing: 6, otherObligations: ''},  {name: "Robert", dancing: 7, performing: 9}];

    // reduce bandMembers to get the sum of all dancing properties
    var totalDancingSkillLeft = bandMembers.reduce(function(accum, x){
      return accum += x.dancing;
    },0);
    expect(totalDancingSkillLeft).toEqual(42);

    // reduce bandMembers to get the sum of all performing properties
    var totalPerformingSkillLeft = bandMembers.reduce(function(accum, x){
      return accum += x.performing;
    },0);
    expect(totalPerformingSkillLeft).toEqual(34);

    // What was the highest performer and highest dancer score?
    // use reduce to create an object with two properties 'maxPerform' and 'maxDance'
    // 'maxPerform' should contain the highest perform score and 'maxDance' the highest dance score out of all the members
    // Hint: the initial value passed to reduce will be an object
    var bestPerformAndDance = bandMembers.reduce( (best, m) => {
      if (m.dancing > best.maxDance){
        best.maxDance = m.dancing;
      }
      if (m.performing > best.maxPerform){
        best.maxPerform = m.performing;
      }
      return best;
    },{maxPerform: 0, maxDance: 0});
    expect(bestPerformAndDance).toEqual({maxPerform: 9, maxDance: 8});
  });

  it("should write a function that turns an array of numbers into an array with just two numbers. The first will be the count of all the negative numbers, the second the sum of all positive numbers", function(){
    //For Example: countOfPositveAndSumOfNegatives([-1,-2,3,4]) === [2,7]
    //There are two negative numbres and 3+4 =7

    var countOfPositveAndSumOfNegatives = function(arr) {
      var negCount = 0;
      var negative = arr.filter(function(x){
        if (x < 0){
          negCount++;
        }
      });

      var positive = arr.filter(x => x > 0);
      var posSum = positive.reduce((acc, x) => acc + x);

      return [negCount, posSum];
    };

    var numbers = [-1,-2,-3,-4,0,3,5,2,5];
    expect(countOfPositveAndSumOfNegatives(numbers)).toEqual([4, 15]);
  });

  it("should write a function that finds the difference between two arrays", function () {
    // implement a difference function for lists, which subtracts one list from another.
    // It should remove all values from list a, which are present in list b.
    // arrayDiff([1,2],[1]) == [2]
    // arrayDiff([1,2,2,2,3],[2]) == [1,3]

    var arrayDiff = function(array1, array2) {
      var filtered = array1.filter(function(x){
        return !array2.includes(x);
      });
      return filtered;
    };

    expect(arrayDiff([1,2,3], [1,2])).toEqual([3]);
    expect(arrayDiff([1,2,2,2,3], [2])).toEqual([1,3]);
  });

  it("should write a function to capitalize every word in a string", function(){
    // Jaden Smith, the son of Will Smith, is the star of films such as The Karate Kid (2010) and After Earth (2013). Jaden is also known for some of his philosophy that he delivers via Twitter. When writing on Twitter, he is known for almost always capitalizing every word.

    // Your task is to convert strings to how they would be written by Jaden Smith. The strings are actual quotes from Jaden Smith, but they are not capitalized in the same way he originally typed them.

    // Example:
    // Not Jaden-Cased: "How can mirrors be real if our eyes aren't real"
    // Jaden-Cased:     "How Can Mirrors Be Real If Our Eyes Aren't Real"

    // Hint:
    // First split the string into a list of words
    // Map over each word
    // turn the array back into a string

    var jadenCase = function(string){
      var final = [];
      var splitStr = string.split(" ");
      splitStr.map(function(x){
        var cool = (x.charAt(0).toUpperCase() + x.slice(1));
        final.push(cool);
      });
      var finale = final.join(" ");
      return finale;
    };

    expect(jadenCase("How can mirrors be real if our eyes aren't real")).toEqual("How Can Mirrors Be Real If Our Eyes Aren't Real");
  });

  it("should use reduce to sum all odd numbers in an array", function(){
    var numbers = [1,2,3,4,5,6,7,8,9];
    var result = [];
    var sumOfOdds = numbers.reduce(function(acc, n){
      if (!(n % 2 === 0)) {
        result.push(n);
        }
    }, 0);

    for (var i = 0; i<result.length-1; i++){
      var final = result[i] + "+";
      return final;
    }
    expect(sumOfOdds).toEqual(1+3+5+7+9);
  });

  // These last 5 questions are for extra fun but not part of the required assignment
  it("use reduce to convert a binary representation of a number (array of 0s and 1s) into that number in base 10", function() {
    // Given an array of one's and zero's convert the equivalent binary value to an integer.
    // Eg: [0, 0, 0, 1] is treated as 0001 which is the binary representation of 1

    // Examples:
    // Testing: [0, 0, 1] ==> 1
    // Testing: [0, 0, 0, 1, 0] ==> 2
    // Testing: [0, 1, 0, 1] ==> 5
    // Testing: [0, 1, 1, 0] ==> 6
    // Testing: [0, 0, 1, 1, 1, 1] ==> 15
    // Testing: [1, 0, 1, 1] ==> 11


    // hint: the callback for reduce will have an optional argument for the index of the current item

    var binaryToNumber = function(array) {
      var findMyNum = array.reverse()
        .reduce(function(acc,num,index){  //reverse array to go left to right (largest index to smallest) and reduce
          acc += num * Math.pow(2,index); //add accumulator and number x 2^index
          return acc; //return acc
        },0);
      return findMyNum;
    };

    expect(binaryToNumber([0,0,1])).toEqual(1);
    expect(binaryToNumber([0,0,0,1,0])).toEqual(2);
    expect(binaryToNumber([0,1,0,1])).toEqual(5);
    expect(binaryToNumber([0,1,1,0])).toEqual(6);
    expect(binaryToNumber([0,0,1,1,1,1])).toEqual(15);
    expect(binaryToNumber([1,0,1,1])).toEqual(11);
  });

  it("can write your own filter function", function() {
    var myFilter = function(arr, func){

        var goodFilter = [];

        for (var i = 0; i < arr.length; i++){
          if (func(arr[i])===true){
            goodFilter.push(arr[i]);
          }
        }
        return goodFilter;
    }

    expect(myFilter([1,2,3], (i) => i > 2)).toEqual([3]);
  });

  it("can write your own map function", function() {
    var myMap = function(arr, func){

      var awesomeArr = [];

      for (var i = 0; i < arr.length; i++){
        var mapped = func(arr[i]); //create new var that contains results of func being performed on each index of array
        console.log(mapped);
        awesomeArr.push(mapped);
      }

      return awesomeArr;
    };

    expect(myMap([1,2,3], (i) => i + 2)).toEqual([3,4,5]);
  });

  it("can write your own reduce function", function() {
    var myReduce = function(arr, func, initial){

      for (var i=0; i<arr.length; i++){
        initial = func(initial, arr[i]); //perform function that adds previous and i and add to old initial for each iteration.
        console.log(initial);
      }
        return initial;
    };

    expect(myReduce([1,2,3], ((acc, i) => acc + i), 0)).toEqual(6);
  });

});

it("can add some html to the page", function () {
  /* create your own list of names and images it will be turned into html and displayed at the bottom of the page!*/
  var animals = [{name: "animal", img: "http://lorempixel.com/400/200/animals/" }, {name: "animal", img: "http://lorempixel.com/400/200/animals/"}];

  var html = animals.map(function(p){
    html = `<li>${p.name}<img src="${p.img}" height="200" width="400"></img></li>`;
    console.log(html);
    return html;
  });

  var outerList = document.createElement("ul");
  html.forEach(function(person){
    let el = document.createElement("li");
    el.innerHTML = person;
    outerList.append(el);
  });
  document.body.getElementsByClassName("banner")[0].append( outerList);
});
