console.log("Balanced BST");

// node class
class Node {
    constructor (value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// binary search class
class BalancedBst {
    constructor (array){
        this.root = this.buildTree(array);
    }

    // method to build tree using content of array
    buildTree (array){
        // remove duplicates and sort the array
        const uniqueSortedArray = Array.from(new Set(array)).sort((a, b) => a - b);

        // function to build balanced binary search tree
        const buildBst = (start, end) => {
            if(start > end) return null;

            // find middle index
            const mid = Math.floor((start + end) / 2);
            const node = new Node(uniqueSortedArray[mid]);

            //recursively build the left and right subtrees

            node.left = buildBst(start, mid -1);
            node.right = buildBst(mid +1, end);

            return node;
        }
        return buildBst(0, uniqueSortedArray.length -1);

    }

    // creates a new node 
    insert (value){
        const newNode = new Node(value);
        if(!this.root){
            this.root = newNode;
            return;
        }
        this.insertNode(this.root, newNode);
    }

    // find the best location for node based on value
    insertNode (root, newNode){
        if(newNode.value < root.value){
            if(!root.left){
                root.left = newNode;
            } else{
                this.insertNode(root.left, newNode);
            }
        } else{
            if(!root.right){
                root.right = newNode;
            } else{
                this.insertNode(root.right, newNode);
            }
        }
    }

    // delete node method
    deleteItem (value){
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode (root, value){
        if(!root) return root;

        if(value < root.value){
            root.left = this.deleteNode(root.left, value);
        } else if(value > root.value){
            root.right = this.deleteNode(root.right, value);
        } else{
            // node with only one child or no child
            if(!root.left){
                return root.right;
            } else if(!root.right){
                return root.left;
            }

            //node with two children
            const successor = this.minValueNode(root.right);

            root.value = successor.value;

            // delete the inorder successor
            root.right = this.deleteNode(root.right, successor.value);

            return root;
        }
    }

    minValueNode (node){
        let current = node;

        while(current && current.left){
            current = current.left;
        }

        return current;
    }

    find (value){
        return this.findNode(this.root, value);
    }

    findNode (root, value){
        // base case
        if(!root) return null;

        // if value equals to root
        if(value === root.value) return root; // value found

        // recursively find the value if its less or great than root
        if(value < root){
            return this.findNode(root.left, value);
        } else {
            return this.findNode(root.right, value);
        }
    }

    // traverse the binary tree
    levelOrderForEach(callback){
        // verify callback is a function
        if(typeof callback !== 'function'){
            throw new Error('A callback function is required.');
        }

        // if root is empty
        if(!this.root) return;

        // declare a queue for node breadth first search
        const queue = [this.root];

        // traverse throught the queue
        while(queue.length > 0){
            // Dequeue the front node
            const currentNode = queue.shift();

            // call the callback with the current node
            callback(currentNode);

            // Enqueue the children if they exist
            if(currentNode.left){
                queue.push(currentNode.left);
            }

            if(currentNode.right){
                queue.push(currentNode.right);
            }
        }
    }

    inOrderForEach(callback){
        // if callback is not a function
        if(typeof callback !== 'function'){
            throw new Error('A callback function is required.');
        }

        // traversal function
        function traverse (node){
            // base case
            if(!node) return;

            // recursion
            traverse(node.left);

            callback(node);

            traverse(node.right);
        }

        traverse(this.root);

    }

    preOrderForEach(callback){
        // if callback is not a function
        if(typeof callback !== 'function'){
            throw new Error('A callback function is required');
        }

        // traversal function
        function traverse (node){
            // base case
            if(!node) return;

            // recursion calls
            callback(node);

            traverse(node.left);

            traverse(node.right);
        }

        traverse(this.root);

    }

    postOrderForEach(callback){
        // if callback is not a function
        if(typeof callback !== 'function'){
            throw new Error('A callback function is required.');
        }

        // traversal function
        function traverse (node){
            // base case
            if(!node) return;

            // recursion calls
            traverse(node.left);

            traverse(node.right);

            callback(node);
        }

        traverse(this.root);

    }

    // height method 
    height (value){
        // locate the node
        const node = this.find(value);

        // if node is empty
        if(!node) return;

        // if node is not empty
        return this.calculateHeight(node);

    }

    // height helper function
    calculateHeight (node){
        // base case
        if(!node) return -1;

        // recursion case
        const leftHeight = this.calculateHeight(node.left);
        const rightHeight = this.calculateHeight(node.right);

        // the height of current node is max of its children plus one
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // depth method
    depth (value){
        // find if value exists
        const node = this.find(value);

        // return null if not found
        if(!node) return null;

        // if found
        return this.calculateDepth(node);
    }

    // depth method function helper
    calculateDepth (node){
        // initialize depth countere
        let depth = 0;
        // start from the root
        let current = this.root;

        // traverse
        while(current){
            if(node.value === current){
                return depth;
            } else if(node.value < current){
                current = current.left;
            } else {
                current = current.right;
            }

            depth++;
        }

        // if not found return null
        return null;
    }
    
    // tree balance check
    isBalanced (){
        return this.checkBalance(this.root) !== -1;
    }

    // is balanced method helper
    checkBalance (node){
        // base case
        if(!node) return 0;

        // recursive case
        // check height of left subtree
        const leftHeight = this.checkBalance(node.left);
        if(leftHeight === -1) return -1;

        // check height of right subtree
        const rightHeight = this.checkBalance(node.right);
        if(rightHeight === -1) return -1;

        // check the height difference of both subtrees
        if(Math.abs(leftHeight - rightHeight) > 1){
            return -1;
        }

        // height of the current node
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // rebalance method
    rebalance(){
        // create an array to store nodes
        const sortedValues = [];
        // call inorder function to receive each node and push it to sortedValues
        this.inOrderForEach(node => sortedValues.push(node.value));
        // rebuild tree with the new values
        this.root = this.buildTree(sortedValues);
    }
}