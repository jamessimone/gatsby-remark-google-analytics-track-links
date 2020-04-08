const innerText = function(node) {
  return (
    (node &&
      (node.value ||
        ("children" in node &&
          node.children.map(
            innerText
          ).join("")
        )
      )
    ) || ""
  )
};

module.exports = innerText;