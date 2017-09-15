jQuery.fn.highlight = function(pat,rumortext,rumornum,teiseinum,correction,yuusendo) {
	function innerHighlight(node, pat) {
	var skip = 0;
	if(node.nodeType == 3) {
		var pos = node.data.toUpperCase().indexOf(pat);
		pos -= (node.data.substr(0, pos).toUpperCase().length - node.data.substr(0, pos).length);
		if (pos >= 0) {
		var spannode = document.createElement('rumorinfo');
		spannode.className = 'rumorhighlight';
		spannode.setAttribute('data-teiseinum', teiseinum);
		spannode.setAttribute('data-rumortext', rumortext);
		spannode.setAttribute('data-rumornum', rumornum);
		spannode.setAttribute('data-correction', correction);
		spannode.setAttribute('data-yuusendo', yuusendo);
		var middlebit = node.splitText(pos);
		var endbit = middlebit.splitText(pat.length);
		var middleclone = middlebit.cloneNode(true);
		spannode.appendChild(middleclone);
		middlebit.parentNode.replaceChild(spannode, middlebit);
		skip = 1;
	}
}
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
    i += innerHighlight(node.childNodes[i], pat);
   }
  }
  return skip;
 }
 return this.length && pat && pat.length ? this.each(function() {
  innerHighlight(this, pat.toUpperCase());
 }) : this;
};

jQuery.fn.removeHighlight = function() {
 return this.find("span.rumorhighlight").each(function() {
  this.parentNode.firstChild.nodeName;
  with (this.parentNode) {
   replaceChild(this.firstChild, this);
   normalize();
  }
 }).end();
};
