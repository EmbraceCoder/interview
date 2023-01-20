/**
 * 访问节点
 * @param n node
 * */
function visitNode(n: Node) {
  if (n instanceof Comment) {
    // 注释
    console.log('Comment node', n.textContent)
  }
  if (n instanceof Text) {
    const t = n.textContent?.trim()
    if (t) {
      console.info('Text node', t)
    }
  }
  if (n instanceof HTMLElement) {
    console.log("Element node", `<${n.tagName.toLowerCase()}>`)
  }
}

/**
 * 深度优先
 * @param root dom node
 * */
function depthFirstTraverse(root: Node) {
  visitNode(root)
  const childNodes = root.childNodes // childNodes 和 children 不一样
  if(childNodes.length) {
    childNodes.forEach(child => {
      depthFirstTraverse(child)
    })
  }
}

/**
 * 深度优先 栈
 * @param root dom node
 * */
function depthFirstTraverse1(root: Node) {
  const stack: Node[] = []
  // 根节点压栈
  stack.push(root)

  while (stack.length > 0) {
    const curNode = stack.pop() as Node // 出栈
    if(curNode === null) break
    visitNode(curNode)

    // 子节点压栈
    const childNodes = curNode.childNodes
    if (childNodes.length > 0) {
      Array.from(childNodes).reverse().forEach(child => stack.push(child))
    }
  }
}

/**
 * 广度优先
 * */
function breadthFirstTraverse(root: Node) {
  const queue: Node[] = []
  // 根节点入队列
  queue.unshift(root)
  while (queue.length > 0) {
    const curNode: Node = queue.pop() as Node
    if (curNode === null) break
    visitNode(curNode)

    // 子节点入队
    const childNodes = curNode.childNodes
    if (childNodes.length) {
      childNodes.forEach(child => queue.unshift(child))
    }
  }
}



