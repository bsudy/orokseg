export function generateQuerySelectorFor(el: Element): string {
  if (el.tagName.toLowerCase() === "html") return "HTML";
  var str = el.tagName;
  str += el.id !== "" ? "#" + el.id : "";
  const className = el?.attributes?.getNamedItem("class")?.value;
  if (className) {
    var classes = className.split(/\s/);
    for (var i = 0; i < classes.length; i++) {
      str += "." + classes[i];
    }
  }
  if (el.parentNode && el.parentNode.nodeType === 1) {
    return generateQuerySelectorFor(el.parentNode as Element) + " > " + str;
  } else {
    throw new Error("Element has no parent node");
  }
}
