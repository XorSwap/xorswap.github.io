// 
function Adventure() // Constructor
{
	this.outputs = {};
	this.nodes = {};
	this.nodeCodes = {};
	this.inventory = [];
	this.currentNode = "";
	this.items = {};
	this.recipies = {};
}
// Display functions
Adventure.prototype.load = function() // Called on body load
{
	for(var key in this.outputs)
		this.outputs[key] = document.getElementById(this.outputs[key]);
	this.reset();
};
Adventure.prototype.reset = function() // Resets game
{
	this.currentNode = "start";
	this.update();
};
Adventure.prototype.update = function() // Updates display
{
	if(this.currentNode in this.nodeCodes)
		this.outputs.text.innerHTML = this.makeHTML(this.nodeCodes[this.currentNode].call(this,this.nodes[this.currentNode]));
	else
		this.outputs.text.innerHTML = this.makeHTML(this.nodes[this.currentNode]);
	this.outputs.inventory.innerHTML = this.invHTML();
};
// Internal functions
Adventure.prototype.invHTML = function() // Returns HTML for inventory
{
	return "<ul>" + this.inventory.map(function(item)
	{
		return "<li>" + item + "</li>";
	}).join("") + "</ul>";
};
Adventure.prototype.makeHTML = function(raw) // Turns my Markdown-style notation into legit HTML
{
	return raw
		.replace(/</g,"&lt;")
		.replace(/>/g,"&gt;")
		.replace(/"/g,"&quot;")
		.replace(/\n/g,"<br/>")
		.replace(/\[(.*)\]\((.*)\)/g,"<a OnClick=\"go('$2');\">$1</a>");
};
// Node functions
Adventure.prototype.go = function(node) // Goes to the specified node
{
	this.currentNode = node;
	this.update();
};
Adventure.prototype.add = function(name,text) // Adds a node
{
	if(typeof name !== "string" || typeof text !== "string")
		throw "add: Input is not string";
	if(name in this.nodes)
		throw "add: Node already exists";
	this.nodes[name]=text;
};
Adventure.prototype.addCode = function(name,code) // Adds code to a node
{
	if(typeof name !== "string")
		throw "addCode: Input is not string";
	if(typeof code !== "function")
		throw "addCode: Input is not function";
	if(name in this.nodeCodes)
		throw "addCode: Code already exists";
	this.nodeCodes[name]=code;
};
// Inventory functions
Adventure.prototype.give = function(item) // Gives an item
{
	this.inventory.push(item);
};
Adventure.prototype.take = function(item) // Takes an item
{
	if(this.holding(item))
	{
		done = false;
		this.inventory = this.inventory.filter(function(invitem)
		{
			if(!done && invitem === item)
			{
				done = true;
				return false;
			}
			return true;
		});
		return true;
	}
	return false;
};
Adventure.prototype.holding = function(item) // Checks if player is holding an item
{
	return this.inventory.indexOf(item) !== -1;
};
// Item functions
Adventure.prototype.addItem = function(name,displayName,description)
{
	if(typeof name !== "string" || typeof displayName !== "string" || typeof description !== "string")
		throw "add: Input is not string";
	if(name in this.items)
		throw "add: Item already exists";
	this.items[name] = {displayName:displayName,description:description};
};
Adventure.prototype.addRecipie = function(recipie,result)
{
	if(!(recipie instanceof Array))
		throw "addRecipie: Input is not array";
	if(typeof result !== "string")
		throw "addRecipie: Input is not string";
	this.recipies[recipie] = result;
}
Adventure.prototype.craft = function(items)
{
	if(items in this.recipies)
	{
		for(item in items)
			if(!this.holding(item))
				return;
		for(item in items)
			this.take()
	}
	return false;
}