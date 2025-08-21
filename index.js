console.log('Index.js');

import {Node, BalancedBst} from './script.js'


// function to create an array of random numbers between 0 and 100
function getRandomNum (count){
    // array to store numbers
    const randomNums = [];

    // loop to generate random numbers
    for(let i = 0; i < count; i++){
        const randomNum = Math.floor(Math.random() * 101);
        
        // push random number to randomNumbers array
        randomNums.push(randomNum);
    }

    return randomNums
}

// create an array of 5 numbers
let nums = getRandomNum(5);
console.log(nums);

// unbalance the tree
nums.push(101, 120);

const nums2 = [2, 3,4 ,5, 6, 7]


// create a balance Binary search tree
const balancedSearch = new BalancedBst(nums2);

console.log(balancedSearch.isBalanced());

console.log('-----------inorder-------');
// traverse inorder
console.log(balancedSearch.inOrderForEach(node => console.log(node)));

console.log('-----preorder-----');
//traverse preorder
console.log(balancedSearch.preOrderForEach(node => console.log(node)));

console.log('----------postorder-----------');
// traverse postorder
console.log(balancedSearch.postOrderForEach(node => console.log(node)));

// check imbalance
console.log(balancedSearch.isBalanced());

balancedSearch.rebalance();

console.log(balancedSearch.isBalanced());