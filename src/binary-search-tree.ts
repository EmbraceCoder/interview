export interface ITreeNode {
  value: number
  left: ITreeNode | null
  right: ITreeNode | null
}


export const bst: ITreeNode = {
  value: 5,
  left: {
    value: 3,
    left: {
      value: 2,
      left: null,
      right: null
    },
    right: {
      value: 4,
      left: null,
      right: null
    }
  },
  right: {
    value: 7,
    left: {
      value: 6,
      left: null,
      right: null
    },
    right: {
      value: 8,
      left: null,
      right: null
    }
  }
}

const arr: number[] = []


// 二叉树 前序遍历 root -> left -> right
export function preOrderTraverse(node: ITreeNode | null) {
  if (node === null) return
  arr.push(node.value)
  preOrderTraverse(node.left)
  preOrderTraverse(node.right)
}

// 二叉树 中序遍历 left -> root -> right
export function inOrderTraverse(node: ITreeNode | null) {
  if (node === null) return
  inOrderTraverse(node.left)
  arr.push(node.value)
  inOrderTraverse(node.right)
}

// 二叉树 后续遍历 left -> right -> root
export function postOrderTraverse(node: ITreeNode | null) {
  if (node === null) return
  postOrderTraverse(node.left)
  postOrderTraverse(node.right)
  arr.push(node.value)
}


/**
 * 寻找 BST 第 K 小值
 * @param node tree node
 * @param k 第几个值
 * */
export function getKthValue(node: ITreeNode, k: number):number | null {
  inOrderTraverse(node)
  return arr[k - 1] || null
}







