console.log("Balanced BST");

class Node {
    constructor (value){
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class Bbst {
    constructor (array){
        this.root = this.buildTree(array);
    }

    // method
    buildTree (array){
        // remove duplicates and sort the array
        const uniqueSortedArray = Array.from(new Set(array)).sorted((a, b) => a - b);

        // build balanced binary search tree
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

}