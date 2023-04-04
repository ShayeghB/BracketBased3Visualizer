function createTreeElement(data) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = data;
    li.appendChild(a);
  
    return li;
  }
  
  function buildTree(treeData, parent) {
    const ul = document.createElement('ul');
  
    treeData.forEach(node => {
      const li = createTreeElement(node.label);
      if (node.leaf) {
        li.className = "leaf"
      }
      ul.appendChild(li);
  
      if (node.children) {
        buildTree(node.children, li);
      }
    });
    parent.appendChild(ul);
  }

function parseInput(input) {
    const stack = [];
    let current = { children: []};
    stack.push(current);
  
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
  
      if (char === '(') {
        const newNode = { children: []};
        current.children.push(newNode);
        stack.push(newNode);
        current = newNode;
      } else if (char === ')') {
        node = stack.pop();
        current = stack[stack.length - 1];
      } else if (char.match(/[^\(\) ]+/)) {
        let label = '';
        while (i < input.length && input[i].match(/[^\(\)]+/)) {
          if (input[i]==' ' & input[i+1]!='(') {
            label += '#'
          } else {
            label += input[i];
          }
          i++;
        }
        i--;
        if (label.includes('#')) {
            POS_word = label.split('#')
            current.children.push({label: POS_word[1], leaf: true})
            label = POS_word[0]
        }
        current.label = label;
      }
    }
  
    return [current.children[0]];
  }
    
  
  function generateTree() {
    const input = document.getElementById('tree-input').value;
    const treeData = parseInput(input);
    const treeContainer = document.getElementById('tree-container');
    treeContainer.innerHTML = '';
  
    const treeRoot = document.createElement('div');
    treeRoot.classList.add('tree');
    buildTree(treeData, treeRoot);
    treeContainer.appendChild(treeRoot);
  }
  
//   function generateTree() {
//     const input = document.getElementById('tree-input').value;
//     const treeData = JSON.parse(input);
//     const treeContainer = document.getElementById('tree-container');
//     treeContainer.innerHTML = '';
  
//     const treeRoot = document.createElement('div');
//     treeRoot.classList.add('tree');
//     buildTree(treeData, treeRoot);
//     treeContainer.appendChild(treeRoot);
//   }
  