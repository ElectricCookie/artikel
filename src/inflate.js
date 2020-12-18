export default function inflate(items) {
  var tree = {
    type: "document",
    indentLevel: 0,
    classes: [""],
    parameters: {},
    children: [],
    text: "",
  };

  function push(item, level, tree, currentLevel) {
    if (currentLevel >= level) {
      tree.children.push(item);
    } else {
      if (tree.children.length === 0) {
        tree.children.push({
          item: null,
          children: [],
        });
      }
      push(
        item,
        level,
        tree.children[tree.children.length - 1],
        currentLevel + 1
      );
    }
  }

  for (let i = 0; i < items.length; i++) {
    push(items[i], items[i].indentLevel, tree, 0);
  }

  return tree;
}
